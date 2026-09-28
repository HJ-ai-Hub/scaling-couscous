# Telegram → Claude Code

Send instructions to Claude from Telegram; Claude does the work on your computer against this repo and replies in the same chat.

Built on Claude Code **Channels** (research preview) with Anthropic's official Telegram plugin. Docs: https://code.claude.com/docs/en/channels

```
You (Telegram) ──► your bot ──► Claude Code running on your computer ──► files, git, web search, scripts
       ▲                                         │
       └──────────── reply / 🔐 approve buttons ◄┘
```

## What it can do

| Job | Example message |
|---|---|
| Research & analysis | "Scan Dubai off-plan launches this month, top 5 by developer, with price/sqft" |
| Market brief on demand | "Run the market brief now" (runs `market_brief.py`, emails it) |
| Drafting | "Draft a PSP management proposal for Amana Pharma, send it to me as a .md file" |
| Code / repo changes | "Add a 'Fleet' page to the JXRR site and push to a new branch" |

You can also send photos/documents. Claude can send files back (up to 50 MB).

## Prerequisites (one-time)

1. **Claude Code**, logged in with your claude.ai account (Pro/Max) — `claude` then `/login`.
2. **Bun** (the plugin runs on it):
   - macOS/Linux: `curl -fsSL https://bun.sh/install | bash`
   - Windows: `powershell -c "irm bun.sh/install.ps1 | iex"`
3. **This repo cloned** on the computer: `git clone https://github.com/HJ-ai-Hub/scaling-couscous.git`

## Setup (≈10 minutes)

**1. Create the bot.** In Telegram, open [@BotFather](https://t.me/BotFather) → `/newbot` → pick a name and a username ending in `bot`. Copy the token.

**2. Install the plugin.** In the repo folder run `claude`, then:

```
/plugin install telegram@claude-plugins-official
```

Choose **user scope**. If it says the marketplace isn't found, run `/plugin marketplace add anthropics/claude-plugins-official` and retry. If it says `Run /reload-plugins to activate.`, run `/reload-plugins`.

**3. Save the token.**

```
/telegram:configure <token-from-BotFather>
```

(Stored in `~/.claude/channels/telegram/.env` — outside this repo, never committed.)

**4. Restart with the channel on.** Exit Claude (`/exit`), then start it with the launcher:

- macOS/Linux: `./telegram-agent/start-telegram-agent.sh`
- Windows: `powershell -ExecutionPolicy Bypass -File telegram-agent\start-telegram-agent.ps1`

**5. Pair your Telegram account.** Message your bot anything → it replies with a pairing code. In the Claude terminal:

```
/telegram:access pair <code>
/telegram:access policy allowlist
```

The second command is important: it locks the bot to your account only. Strangers who find the bot are silently ignored.

**6. Test.** From Telegram: `what files are in this repo?`

## Day-to-day

- **Keep the terminal open.** Messages only arrive while the launcher is running. Closing the window or letting the computer sleep = bot goes quiet (messages sent meanwhile are not replayed).
- **Approvals come to Telegram.** When Claude wants to do something not pre-approved (edit a file, commit, push, run the market brief/send email), you get a 🔐 message with Allow/Deny buttons. You can also reply `yes abcde` / `no abcde` with the code shown.
- **Pre-approved (no prompt):** web search/fetch, reading files, `git status/diff/log/fetch/pull`, replying on Telegram. Configured in `.claude/settings.json`.
- **Blocked outright:** reading `.env`, force-push, `git reset --hard`, `rm -rf`.
- **Long sessions:** if replies get slow or confused, restart the launcher for a fresh session; add `--continue` to resume the previous one (e.g. `./telegram-agent/start-telegram-agent.sh --continue`).

### Keep it running 24/7 (optional)

- **Stop the computer sleeping:** macOS `caffeinate -dis ./telegram-agent/start-telegram-agent.sh`; Windows Settings → Power → Sleep: Never (when plugged in).
- **Survive reboots:** macOS/Linux — run the launcher inside `tmux new -s claude`; Windows — Task Scheduler → *At log on* → run the `.ps1` above.

## Troubleshooting

| Symptom | Fix |
|---|---|
| Bot doesn't reply at all | Claude isn't running with `--channels` — use the launcher. Check the startup screen shows the Telegram channel notice. |
| "plugin not on approved list" at startup | Update Claude Code (`claude update`); if you're in a Team/Enterprise org an Owner must enable Channels in admin settings. |
| Claude stalls mid-task | It's waiting on an approval — check Telegram for a 🔐 message (or the terminal). |
| `bun: command not found` | Install Bun, then open a new terminal. |

## Security notes

- Anyone on the allowlist can approve actions on your computer — keep it to your own account.
- Don't use `--dangerously-skip-permissions` with this; the Telegram approval buttons make it unnecessary.
- Secrets stay local: the bot token lives in `~/.claude/channels/telegram/.env`; project secrets in `.env` (gitignored, and Claude is denied from reading it).
