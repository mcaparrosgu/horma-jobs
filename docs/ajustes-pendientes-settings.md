# Ajuste pendiente en `.claude/settings.json` (lo pega Mar)

El sistema me denegó escribir este archivo (es la configuración de Claude Code: hooks y permisos). Sustituye el contenido actual de `.claude/settings.json` por este, que conserva `"agent": "copiloto"`:

```json
{
  "agent": "copiloto",
  "permissions": {
    "allow": [
      "Bash(python -I .claude/skills/*)",
      "Bash(python -I evals/correr_evals.py*)"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./docs/privado/**)"
    ]
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          { "type": "command", "command": "python -I .claude/skills/verificar-trazabilidad/scripts/hook.py" }
        ]
      }
    ]
  }
}
```

**Qué hace:** (0) `deny` impide que ningún agente lea `.env` ni `docs/privado/`, aunque una oferta se lo pida (barrera real, no solo una instrucción); (1) el hook corre el verificador cada vez que se escribe el `cv.md` de una candidatura y devuelve el error al agente en el mismo turno; (2) los permisos dejan correr los scripts de las skills y los evals sin pedir confirmación cada vez. Es reversible: borrar el bloque lo desactiva.
**Riesgo:** el permiso `allow` es amplio sobre `.claude/skills/*`; los scripts son del repositorio, no de terceros. Revísalo si no te convence.
