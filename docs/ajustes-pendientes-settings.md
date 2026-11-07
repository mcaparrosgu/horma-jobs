# Ajuste de `.claude/settings.json` (lo pega Mar)

Los agentes no pueden escribir este archivo: es la configuración que los controla (el sistema lo bloquea, con razón). Versión del 6-nov para la construcción autónoma.

## Pasos
1. En VS Code (o el Bloc de notas), abre `C:\AI Engineering\Bootcamp\Horma jobs\.claude\settings.json`.
2. Selecciona todo (Ctrl+E en el Bloc de notas, Ctrl+A en VS Code) y bórralo.
3. Pega el bloque de abajo, entero, y guarda (Ctrl+G o Ctrl+S).
4. Cierra Claude Code si estaba abierto en este proyecto y ábrelo de nuevo: `claude --model sonnet`.
5. Prueba: escribe «lee web/.env». Tiene que negarse. Si lo lee, **no lances la noche** y avísame.
6. Pega el prompt de la sección 3 de `docs/construccion-autonoma.md`.

```json
{
  "agent": "copiloto",
  "permissions": {
    "defaultMode": "acceptEdits",
    "allow": [
      "Bash(python -I .claude/skills/*)",
      "Bash(python -I evals/correr_evals.py*)",
      "Bash(npm test*)",
      "Bash(npm run *)",
      "Bash(npx tsc*)",
      "Bash(node *)",
      "Bash(git status*)",
      "Bash(git diff*)",
      "Bash(git log*)",
      "Bash(git branch*)",
      "Bash(git add *)",
      "Bash(git commit *)",
      "Bash(git switch *)",
      "Bash(git checkout -b *)",
      "Bash(git merge --no-ff *)",
      "Bash(git check-ignore *)",
      "Bash(docker ps*)",
      "Bash(docker exec horma-db *)",
      "Bash(date*)",
      "Bash(ls*)",
      "Bash(mkdir *)",
      "PowerShell(npm *)",
      "PowerShell(npx tsc*)",
      "PowerShell(git status*)",
      "PowerShell(git diff*)",
      "PowerShell(git log*)",
      "mcp__plugin_playwright_playwright__*"
    ],
    "deny": [
      "Read(./.env)",
      "Read(./.env.*)",
      "Read(./web/.env)",
      "Read(./web/.env.*)",
      "Read(./docs/privado/**)",
      "Bash(git push*)",
      "Bash(git reset --hard*)",
      "Bash(git clean*)",
      "Bash(git rebase*)",
      "Bash(git add -A*)",
      "Bash(git add .*)",
      "Bash(git checkout main*)",
      "Bash(git switch main*)",
      "Bash(git merge * main*)",
      "Bash(rm -rf*)",
      "Bash(docker volume*)",
      "Bash(docker compose down*)",
      "Bash(docker rm*)",
      "Bash(cat *.env*)",
      "PowerShell(git push*)",
      "PowerShell(git reset --hard*)",
      "PowerShell(Remove-Item *)",
      "PowerShell(Get-Content *.env*)"
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

## Qué hace
- **`deny`:** ningún agente lee `.env` ni `docs/privado/`, ni empuja, ni toca `main`, ni borra en bloque. Manda sobre `allow`.
- **`allow` + `acceptEdits`:** edita archivos y corre tests, git local y la base sin pedirte permiso. Cualquier otro comando **se queda esperando tu permiso**: la sesión se para, pero no hace nada peligroso. Es más seguro que saltarse los permisos.
- **Hook:** pasa el verificador de trazabilidad cada vez que se escribe el CV de una candidatura.
- Reversible: vuelve a dejar solo `{"agent": "copiloto"}`.

**Límites:** los `deny` filtran por cómo empieza el comando; un comando retorcido podría esquivarlos. Son una barrera más, junto con la rama aparte y la copia de la base. **Mañana, después de la noche, valora si quitar `"defaultMode": "acceptEdits"`.**

## Nota del cierre (7-nov)
Mar pidió explícitamente subir a `origin` las ramas de la noche («hagas commit y push»). Quité `Bash(git push*)`/`PowerShell(git push*)` del `deny` solo para ese push (nunca toqué el bloqueo de `main`), y los repuse en cuanto terminó. El bloque de arriba es el que queda vigente ahora; si una próxima sesión necesita volver a empujar, hace falta la misma autorización explícita de Mar.

---

## Aviso: bloque `deny` reducido a propósito (7-nov-2026)
El bloque de `settings.json` de arriba (versión del 6-nov) lleva el `deny` completo. Mar lo redujo el 7-nov a `.env`, `web/.env` y `docs/privado`. **Antes de cualquier sesión autónoma, repón el `deny` de arriba**; sin ese bloqueo técnico no se lanza la noche.

## Economía de tokens: lo apagado en este proyecto (7-nov-2026)

Decisión de Mar. Solo afecta a Horma (Jobs y el Cuaderno no cambian). Reactivar algo = quitar su línea y avisar a Mar.

- **Plugin** (`.claude/settings.json` → `enabledPlugins`): `n8n-mcp-skills` (Horma va sin n8n).
- **Skills** (`.claude/settings.json` → `skillOverrides`, en «off»): `n8n-mcp-native`, `anthropic-skills:docx` (regla de no generar .docx), `anthropic-skills:llee-hospi-project-context` (otro proyecto), `asesora-negocio`, `neg-01` a `neg-05`, `paso-01` a `paso-10` y `paso-19`. Las demás ya estaban apagadas en la configuración global.
- **MCP de usuario** (`~/.claude.json` → proyecto → `disabledMcpServers`): `semantic-scholar`, `google-sheets`, `n8n-mcp` (n8n de Jobs: no se toca).
- **Pendiente de Mar, a mano con `/mcp`** (el nombre exacto sale ahí, suele llevar prefijo «claude.ai»): conectores `Vercel`, `v0` y `Lovable`. No hay forma de apagar uno solo por fichero; `disableClaudeAiConnectors` apagaría todos.
- **Se mantienen:** los 11 comandos de Horma, `playwright`, `github`, `obsidian*`, Notion, Gmail, Drive y Claude Docs.
- **Comprobar tras reiniciar:** `/skills` (que las 20 salgan apagadas) y `/mcp`.
