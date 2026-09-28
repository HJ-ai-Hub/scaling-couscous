#!/usr/bin/env bash
# Start Claude Code in this repo with the Telegram channel enabled (macOS / Linux).
# Leave this terminal open — Telegram messages only reach Claude while it runs.
set -euo pipefail
cd "$(dirname "$0")/.."

command -v claude >/dev/null || { echo "Claude Code not found. Install: https://code.claude.com/docs/en/quickstart"; exit 1; }
command -v bun >/dev/null    || { echo "Bun not found. Install: curl -fsSL https://bun.sh/install | bash"; exit 1; }

exec claude --channels plugin:telegram@claude-plugins-official "$@"
