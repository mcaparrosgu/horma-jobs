#!/usr/bin/env python3
"""Tests deterministas de seguridad de la descarga (ingestar.py). Sin red ni LLM.

Uso:  python -I evals/ingesta/test_ingestar.py
Cubre: IP públicas (M1), conexión a la IP comprobada y cableado real del opener, redirecciones
(B2), clave `FUENTE_*` y su valor (M2), tope de tamaño y de tiempo con reloj simulado (B3), nombre
de archivo con hash (B4), errores con código fijo sin traceback y `--salida`/`--endpoints`
limitados (B5), y que LinkedIn e Indeed no se cuelen con un punto final.
"""
import importlib.util
import itertools
import json
import os
import socket
import subprocess
import sys
import tempfile
import unittest
import urllib.error
import urllib.request
from pathlib import Path
from unittest import mock

RAIZ = Path(__file__).resolve().parents[2]
SCRIPT = RAIZ / ".claude" / "skills" / "fuentes-ofertas" / "scripts" / "ingestar.py"
spec = importlib.util.spec_from_file_location("ingestar", SCRIPT)
ing = importlib.util.module_from_spec(spec)
spec.loader.exec_module(ing)


def info(*ips):
    return [(socket.AF_INET, socket.SOCK_STREAM, 6, "", (ip, 443)) for ip in ips]


class TestIpYUrl(unittest.TestCase):
    def test_ip_publicas_si(self):
        for ip in ("8.8.8.8", "93.184.216.34", "2606:4700:4700::1111"):
            self.assertTrue(ing.es_publica(ip), ip)

    def test_ip_no_publicas_no(self):
        for ip in ("127.0.0.1", "10.0.0.1", "192.168.1.1", "172.16.0.1", "169.254.169.254",
                   "100.64.0.1", "0.0.0.0", "224.0.0.1", "::", "::1", "fe80::1", "::ffff:127.0.0.1",
                   "64:ff9b::7f00:1", "no-es-ip", ""):
            self.assertFalse(ing.es_publica(ip), ip)

    def test_url_rechazadas(self):
        for url in ("http://x.example.com/", "https://user@x.example.com/", "https://u:p@x.example.com/",
                    "https://x.example.com:8443/", "https://localhost/", "https://localhost./", "https://intranet/",
                    "https://[::1]/", "https://[abc/", "https://a..example.com/", "ftp://x.example.com/",
                    "https://x.example.com:abc/", ""):
            with self.assertRaises(ing.ErrorFuente, msg=url) as c:
                ing.validar_url(url)
            self.assertEqual(c.exception.codigo, "URL_NO_VALIDA")

    def test_url_validas(self):
        self.assertEqual(ing.validar_url("https://jobsearch.api.jobtechdev.se/search"), "jobsearch.api.jobtechdev.se")
        self.assertEqual(ing.validar_url("https://X.example.com:443/a?b=1"), "x.example.com")
        self.assertEqual(ing.validar_url("https://x.example.com./a"), "x.example.com")  # punto final normalizado


class TestConexion(unittest.TestCase):
    def conexion(self):
        return ing.ConexionSegura("fuente.example.com", 443, timeout=5, context=mock.MagicMock())

    def test_ip_privada_no_conecta(self):
        with mock.patch("socket.getaddrinfo", return_value=info("10.0.0.5")), \
             mock.patch("socket.create_connection", side_effect=AssertionError("no debe conectar")):
            with self.assertRaises(ing.ErrorFuente) as c:
                self.conexion().connect()
        self.assertEqual(c.exception.codigo, "DESTINO_NO_PUBLICO")

    def test_ipv6_privada_no_conecta(self):
        ipv6 = [(socket.AF_INET6, socket.SOCK_STREAM, 6, "", ("fd00::1", 443, 0, 0))]
        with mock.patch("socket.getaddrinfo", return_value=ipv6), \
             mock.patch("socket.create_connection", side_effect=AssertionError("no debe conectar")):
            with self.assertRaises(ing.ErrorFuente) as c:
                self.conexion().connect()
        self.assertEqual(c.exception.codigo, "DESTINO_NO_PUBLICO")

    def test_una_ip_privada_entre_publicas_tambien_se_rechaza(self):
        with mock.patch("socket.getaddrinfo", return_value=info("93.184.216.34", "127.0.0.1")), \
             mock.patch("socket.create_connection", side_effect=AssertionError("no debe conectar")):
            with self.assertRaises(ing.ErrorFuente) as c:
                self.conexion().connect()
        self.assertEqual(c.exception.codigo, "DESTINO_NO_PUBLICO")

    def test_conecta_a_la_ip_comprobada_y_no_al_nombre(self):
        con = self.conexion()
        with mock.patch("socket.getaddrinfo", return_value=info("93.184.216.34")) as gai, \
             mock.patch("socket.create_connection", return_value=object()) as cc:
            con.connect()
        gai.assert_called_once()  # una sola resolución: no hay segunda consulta que un DNS pueda cambiar
        cc.assert_called_once_with(("93.184.216.34", 443), 5)
        con._context.wrap_socket.assert_called_once()
        self.assertEqual(con._context.wrap_socket.call_args.kwargs["server_hostname"], "fuente.example.com")

    def test_dns_que_falla_es_red(self):
        for fallo in (socket.gaierror("secreto interno"), UnicodeError("etiqueta vacía")):
            with mock.patch("socket.getaddrinfo", side_effect=fallo):
                with self.assertRaises(ing.ErrorFuente) as c:
                    self.conexion().connect()
            self.assertEqual(str(c.exception), "RED")


class TestCableado(unittest.TestCase):
    """Que las piezas seguras estén de verdad puestas en el opener real, no solo existan."""

    def test_el_opener_real_lleva_las_tres_piezas(self):
        capturado = {}

        def falso_build(*manejadores):
            capturado["m"] = manejadores
            return FalsoOpener(lambda: b"")

        with mock.patch("urllib.request.build_opener", side_effect=falso_build):
            ing.abrir(urllib.request.Request("https://a.example.com/"), 10**12)
        m = capturado["m"]
        proxies = [x for x in m if isinstance(x, urllib.request.ProxyHandler)]
        self.assertEqual(len(proxies), 1)
        self.assertEqual(proxies[0].proxies, {})  # sin proxies del entorno
        self.assertIn(ing.ManejadorSeguro, m)
        self.assertIn(ing.SoloMismoHostYPuerto, m)

    def test_https_open_real_rechaza_ip_privada(self):
        req = urllib.request.Request("https://fuente.example.com/")
        req.timeout = 5  # lo pone el opener al abrir; aquí se llama al manejador directamente
        with mock.patch("socket.getaddrinfo", return_value=info("192.168.0.10")), \
             mock.patch("socket.create_connection", side_effect=AssertionError("no debe conectar")):
            with self.assertRaises(ing.ErrorFuente) as c:
                ing.ManejadorSeguro().https_open(req)
        self.assertEqual(c.exception.codigo, "DESTINO_NO_PUBLICO")


class TestRedireccion(unittest.TestCase):
    def ir(self, destino, origen="https://a.example.com/x"):
        return ing.SoloMismoHostYPuerto().redirect_request(
            urllib.request.Request(origen), None, 302, "Found", {}, destino)

    def test_rechazadas(self):
        for destino in ("http://a.example.com/y", "https://b.example.com/y", "https://a.example.com:8443/y",
                        "https://u@a.example.com/y", "https://127.0.0.1/y", "https://[abc/"):
            with self.assertRaises(ing.ErrorFuente, msg=destino) as c:
                self.ir(destino)
            self.assertEqual(c.exception.codigo, "REDIRECCION_RECHAZADA")

    def test_mismo_host_y_puerto_pasa(self):
        self.assertIsNotNone(self.ir("https://a.example.com/otra"))
        self.assertIsNotNone(self.ir("https://a.example.com:443/otra"))
        self.assertIsNotNone(self.ir("https://a.example.com./otra"))


class FalsoOpener:
    """Solo tiene read1, no read: si el código volviera a usar read(), estos tests fallarían."""

    def __init__(self, trozos=None, error=None):
        self.trozos, self.error = trozos, error

    def open(self, req, timeout=None):
        if self.error:
            raise self.error
        return self

    def __enter__(self):
        return self

    def __exit__(self, *a):
        return False

    def read1(self, n):
        return self.trozos() if callable(self.trozos) else b""


class TestDescarga(unittest.TestCase):
    def abrir(self, opener, plazo_extra=10):
        import time
        with mock.patch("urllib.request.build_opener", return_value=opener):
            return ing.abrir(urllib.request.Request("https://a.example.com/"), time.monotonic() + plazo_extra)

    def test_respuesta_normal(self):
        cola = [b"hola ", b"mundo"]
        self.assertEqual(self.abrir(FalsoOpener(lambda: cola.pop(0) if cola else b"")), b"hola mundo")

    def test_tope_de_tamano(self):
        with mock.patch.object(ing, "MAX_BYTES", 100):
            with self.assertRaises(ing.ErrorFuente) as c:
                self.abrir(FalsoOpener(lambda: b"x" * 60))
        self.assertEqual(c.exception.codigo, "TAMANO")

    def test_reloj_total_se_mira_entre_recepciones(self):
        """Un servidor que gotea 1 byte por recepción: el reloj (simulado, +50 s por mirada) lo corta."""
        lecturas = []
        reloj = itertools.count(0, 50)

        def goteo():
            lecturas.append(1)
            return b"x"

        with mock.patch.object(ing.time, "monotonic", side_effect=lambda: next(reloj)):
            with self.assertRaises(ing.ErrorFuente) as c:
                with mock.patch("urllib.request.build_opener", return_value=FalsoOpener(goteo)):
                    ing.abrir(urllib.request.Request("https://a.example.com/"), 100)
        self.assertEqual(c.exception.codigo, "TIEMPO")
        self.assertLess(len(lecturas), 10)  # se cortó pronto, no siguió leyendo

    def test_plazo_ya_vencido(self):
        with self.assertRaises(ing.ErrorFuente) as c:
            self.abrir(FalsoOpener(lambda: b"x"), plazo_extra=-1)
        self.assertEqual(c.exception.codigo, "TIEMPO")

    def test_timeout_de_socket_es_tiempo(self):
        with self.assertRaises(ing.ErrorFuente) as c:
            self.abrir(FalsoOpener(error=TimeoutError("lento")))
        self.assertEqual(c.exception.codigo, "TIEMPO")

    def test_errores_no_filtran_el_mensaje(self):
        for e in (urllib.error.URLError("fallo hacia http://10.0.0.1/?clave=SECRETA"),
                  ValueError("Invalid header value 'SECRETA\\n'"),
                  RuntimeError("clave SECRETA")):
            with self.assertRaises(ing.ErrorFuente, msg=repr(e)) as c:
                self.abrir(FalsoOpener(error=e))
            self.assertEqual(c.exception.codigo, "RED")
            self.assertNotIn("SECRETA", str(c.exception))

    def test_el_error_de_destino_no_publico_se_propaga_con_su_codigo(self):
        with self.assertRaises(ing.ErrorFuente) as c:
            self.abrir(FalsoOpener(error=ing.ErrorFuente("DESTINO_NO_PUBLICO")))
        self.assertEqual(c.exception.codigo, "DESTINO_NO_PUBLICO")


class TestSinContacto(unittest.TestCase):
    """Emails y teléfonos de terceros no se guardan (regla de datos de terceros)."""

    def test_quita_emails(self):
        t = ing.sin_contacto("Escribe a ana.lopez+rrhh@empresa.example.se o a b@c.io hoy")
        self.assertNotIn("@", t)
        self.assertIn("hoy", t)

    def test_quita_telefonos(self):
        for tel in ("+46 8 123 456 78", "08-123 45 67", "(+34) 600.123.456", "600123456", "+46701234567"):
            t = ing.sin_contacto(f"Llama al {tel} para más info")
            self.assertNotRegex(t, r"\d{3}", tel)
            self.assertIn("para más info", t)

    def test_no_toca_cifras_normales(self):
        for txt in ("5 años de experiencia", "Salario 45 000 EUR", "Publicado 2026-11-06", "Hasta el 06.11.2026", "100 % remoto", "Java 17 y Python 3.12"):
            self.assertEqual(ing.sin_contacto(txt), txt)

    def test_none_y_texto_vacio(self):
        self.assertEqual(ing.sin_contacto(None), "")
        self.assertEqual(ing.sin_contacto(""), "")


class TestNombres(unittest.TestCase):
    def test_ids_parecidos_no_chocan(self):
        self.assertNotEqual(ing.nombre_archivo("F", "a/b"), ing.nombre_archivo("F", "a_b"))

    def test_nombre_seguro(self):
        n = ing.nombre_archivo("Fuente (x)", "../../etc/passwd")
        self.assertRegex(n, r"^[A-Za-z0-9_.-]+\.md$")
        self.assertNotIn("/", n)
        self.assertFalse(n.startswith("."))

    def test_es_estable(self):
        self.assertEqual(ing.nombre_archivo("F", 123), ing.nombre_archivo("F", "123"))


class TestLineaDeComandos(unittest.TestCase):
    """Corre el script de verdad (con --dry-run no hay red)."""

    CLAVE = "valor-secreto-123"

    def correr(self, fuente_extra=None, *args, salida=None, env_extra=None, dry=True, endpoints=None):
        f = {"nombre": "Prueba", "url": "https://api.example.com/search", "metodo": "GET",
             "parametros": {}, "cabeceras": {}, "clave_env": None, "clave_en": None, "clave_nombre": None,
             "mapeo_campos": {"lista": "hits", "id": "id", "titulo": "t", "empresa": "e", "url": "u", "descripcion": "d"},
             "activa": True}
        f.update(fuente_extra or {})
        with tempfile.TemporaryDirectory() as d:
            ruta = endpoints or Path(d) / "endpoints.json"
            if endpoints is None:
                ruta.write_text(json.dumps({"fuentes": [f]}), encoding="utf-8")
            cmd = [sys.executable, "-I", str(SCRIPT), "Prueba", "--endpoints", str(ruta), *args]
            if dry:
                cmd.append("--dry-run")
            if salida:
                cmd += ["--salida", str(salida)]
            env = {**os.environ, "FUENTE_PRUEBA": self.CLAVE, **(env_extra or {})}
            # Desde otra carpeta que la raíz: los resultados no deben depender del directorio de trabajo.
            return subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", env=env, cwd=tempfile.gettempdir())

    def test_dry_run_valido(self):
        r = self.correr()
        self.assertEqual(r.returncode, 0, r.stderr)
        self.assertIn("[dry-run]", r.stdout)

    def test_clave_valida_no_se_imprime(self):
        r = self.correr({"clave_env": "FUENTE_PRUEBA", "clave_en": "parametro", "clave_nombre": "api_key"})
        self.assertEqual(r.returncode, 0, r.stderr)
        self.assertNotIn(self.CLAVE, r.stdout + r.stderr)
        self.assertIn("api_key", r.stdout)  # el nombre del parámetro sí; el valor no

    def test_clave_env_fuera_de_fuente_rechazada(self):
        for nombre in ("PATH", "HOME", "fuente_x", "FUENTE_", "FUENTE_A-B", "FUENTE_X;rm"):
            r = self.correr({"clave_env": nombre})
            self.assertEqual(r.returncode, 2, nombre)
            self.assertIn("`clave_env` debe llamarse FUENTE_", r.stderr)

    def test_clave_por_parametro_exige_nombre(self):
        r = self.correr({"clave_env": "FUENTE_PRUEBA", "clave_en": "parametro", "clave_nombre": None})
        self.assertEqual(r.returncode, 2)
        self.assertIn("`clave_nombre`", r.stderr)
        self.assertNotIn(self.CLAVE, r.stdout + r.stderr)

    def test_nombre_de_cabecera_con_salto_de_linea_rechazado(self):
        r = self.correr({"clave_env": "FUENTE_PRUEBA", "clave_en": "cabecera", "clave_nombre": "X-Key\r\nInjected: 1"})
        self.assertEqual(r.returncode, 2)
        self.assertIn("`clave_nombre`", r.stderr)

    def test_valor_de_clave_con_caracteres_raros_rechazado_sin_mostrarlo(self):
        for valor in ("abc def", "abc\r\nInjected: 1", "abc\tdef"):
            r = self.correr({"clave_env": "FUENTE_PRUEBA", "clave_en": "cabecera", "clave_nombre": "X-Api-Key"},
                            env_extra={"FUENTE_PRUEBA": valor})
            self.assertEqual(r.returncode, 2, repr(valor))
            self.assertIn("caracteres no válidos", r.stderr)
            self.assertNotIn("abc", r.stdout + r.stderr)
            self.assertNotIn("Traceback", r.stderr)

    def test_salto_de_linea_final_en_la_clave_se_limpia(self):
        r = self.correr({"clave_env": "FUENTE_PRUEBA", "clave_en": "cabecera", "clave_nombre": "X-Api-Key"},
                        env_extra={"FUENTE_PRUEBA": self.CLAVE + "\n"})
        self.assertEqual(r.returncode, 0, r.stderr)

    def test_url_no_https_o_con_puerto_rechazada(self):
        for url in ("http://api.example.com/s", "https://api.example.com:8443/s", "https://u@api.example.com/s", "https://intranet/s"):
            r = self.correr({"url": url})
            self.assertEqual(r.returncode, 2, url)
            self.assertIn("URL_NO_VALIDA", r.stderr)

    def test_linkedin_e_indeed_no_se_cuelan_ni_con_punto_final(self):
        for url in ("https://www.linkedin.com/jobs", "https://www.linkedin.com./jobs", "https://LinkedIn.com./jobs",
                    "https://es.indeed.com/jobs", "https://www.indeed.com./jobs"):
            r = self.correr({"url": url})
            self.assertEqual(r.returncode, 2, url)
            self.assertIn("LinkedIn e Indeed", r.stderr)

    def test_salida_fuera_de_datos_ofertas_rechazada(self):
        for s in (Path(tempfile.gettempdir()) / "fuera", RAIZ / "datos" / ".." / "web",
                  RAIZ / "datos" / "perfiles", RAIZ / "datos", RAIZ / "datos" / "ofertas2"):
            r = self.correr(None, salida=s)
            self.assertEqual(r.returncode, 2, str(s))
            self.assertIn("datos/ofertas/", r.stderr)

    def test_salida_dentro_de_datos_ofertas_vale(self):
        r = self.correr(None, salida=RAIZ / "datos" / "ofertas" / "raw")
        self.assertEqual(r.returncode, 0, r.stderr)
        r = self.correr(None)  # la de por defecto, desde cualquier carpeta
        self.assertEqual(r.returncode, 0, r.stderr)

    def test_endpoints_de_fuera_del_repo_solo_con_dry_run(self):
        r = self.correr(None, dry=False)  # el JSON temporal está fuera del repositorio
        self.assertEqual(r.returncode, 2)
        self.assertIn("`--endpoints` fuera del repositorio", r.stderr)

    def test_fallo_inesperado_sin_traceback(self):
        r = self.correr(None, endpoints=Path(tempfile.gettempdir()) / "no-existe-xyz.json")
        self.assertEqual(r.returncode, 2)
        self.assertIn("ERROR_INTERNO", r.stderr)
        self.assertNotIn("Traceback", r.stderr)


if __name__ == "__main__":
    unittest.main(verbosity=1)
