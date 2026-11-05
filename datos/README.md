# datos/

Estado de la fase 1 (lo que producen los agentes) y, después, el seed de la web. **No se versiona** salvo `fixtures/` (datos inventados). Contiene datos personales de usuarias: nunca va a git, a logs ni a ejemplos.

    fuentes/calificacion.json
    ofertas/raw/  ofertas/procesadas/  ofertas/ejecuciones/
    usuarias/<id>/cv-maestro.md  perfil.json  preferencias.json  fuentes/  cv-base/<sector>/{cv.md,traza.json}  cv-estetico.pdf
    matches/<usuaria>/<fecha>.json
    candidaturas/<usuaria>/<oferta>/cv.md carta.md traza.json traza-carta.json huecos.json ats.json estado.json

Borrar `usuarias/<id>/`, `matches/<id>/` y `candidaturas/<id>/` elimina todo lo de esa persona (privacidad por carpeta).
