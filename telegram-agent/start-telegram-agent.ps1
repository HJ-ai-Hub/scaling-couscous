# Start Claude Code in this repo with the Telegram channel enabled (Windows PowerShell).
# Leave this window open — Telegram messages only reach Claude while it runs.
Set-Location (Join-Path $PSScriptRoot "..")

if (-not (Get-Command claude -ErrorAction SilentlyContinue)) {
    Write-Host "Claude Code not found. Install: https://code.claude.com/docs/en/quickstart"; exit 1
}
if (-not (Get-Command bun -ErrorAction SilentlyContinue)) {
    Write-Host "Bun not found. Install: powershell -c `"irm bun.sh/install.ps1 | iex`""; exit 1
}

claude --channels plugin:telegram@claude-plugins-official @args
