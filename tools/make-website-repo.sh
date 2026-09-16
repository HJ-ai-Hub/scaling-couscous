#!/usr/bin/env bash
#
# Builds a clean, standalone repository for the EZ4U Mobile website, containing
# ONLY the website: no owner profile, no finance models, no other businesses'
# material, and no history that carries any of it.
#
# Why this exists: scaling-couscous is a general-purpose repo. Giving a
# contractor access to it would also hand over unrelated confidential material,
# and deleting files does not remove them from past commits -- so the website
# repo is built fresh rather than filtered.
#
# Usage:  bash tools/make-website-repo.sh [output-dir]
#         (default output: ../ez4u-website)
#
# Afterwards, to publish it:
#   gh repo create ez4u-website --private --source=<output-dir> --push
# or create an empty repo on GitHub and:
#   cd <output-dir>
#   git remote add origin git@github.com:<owner>/ez4u-website.git
#   git push -u origin main

set -euo pipefail

SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="${1:-$SRC/../ez4u-website}"
SITE="$SRC/sun-smart/website"

[ -d "$SITE" ] || { echo "error: cannot find $SITE" >&2; exit 1; }

if [ -e "$OUT" ]; then
  echo "error: $OUT already exists -- move or delete it first." >&2
  exit 1
fi

echo "==> building $OUT"
mkdir -p "$OUT/public" "$OUT/netlify/functions"

# Site files, minus the functions dir (it moves to the repo root).
tar cf - -C "$SITE" --exclude=./netlify . | tar xf - -C "$OUT/public"
cp "$SITE/netlify/functions/"*.js "$OUT/netlify/functions/"

# Handover doc lives at the repo root, deliberately OUTSIDE public/ so Netlify
# does not serve it at ez4u.co/HANDOVER.md.
cp "$SRC/sun-smart/HANDOVER.md" "$OUT/HANDOVER.md"

cat > "$OUT/netlify.toml" <<'TOML'
[build]
  publish = "public"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "20"

[functions]
  node_bundler = "esbuild"

# Deploy previews and branch builds must never touch the live HitPay account.
# Production keeps whatever HITPAY_ENV is set in the Netlify UI ("live").
[context.deploy-preview.environment]
  HITPAY_ENV = "sandbox"

[context.branch-deploy.environment]
  HITPAY_ENV = "sandbox"
TOML

cat > "$OUT/.gitignore" <<'IGNORE'
# Local env files — never commit real keys. HitPay/Netlify secrets live in
# the Netlify UI under Site configuration -> Environment variables.
.env
.env.*
!.env.example

# Netlify CLI
.netlify/

# Node
node_modules/

# OS noise
.DS_Store
Thumbs.db
IGNORE

cat > "$OUT/README.md" <<'README'
# ez4u-website

Source for **www.ez4u.co** — the EZ4U Mobile retail site (phones, accessories,
repair, trade-in) hosted on Netlify.

Static site, no build step. `public/` is served as-is; `netlify/functions/`
holds the one serverless function that creates HitPay payments.

Run it locally:

```bash
python3 -m http.server 8000 --directory public
# or, to also run the payment function:  netlify dev
```

**→ Read [HANDOVER.md](HANDOVER.md) before making changes.** It covers the
deployment setup, the secrets policy, the translation and cart systems, and
several ways this site breaks silently if you don't know about them.
README

# Fresh history: one commit, nothing inherited.
git -C "$OUT" init -q -b main
git -C "$OUT" add -A
git -C "$OUT" -c user.name="EZ4U Mobile" -c user.email="ez4umobile@gmail.com" \
  commit -q -m "EZ4U Mobile website

Static trilingual retail site for www.ez4u.co: 28 pages covering new and
pre-owned phones, tablets, accessories, repair services, trade-in and the
EZ4U Protect add-on, with a localStorage cart and HitPay online payment
through one Netlify function.

See HANDOVER.md for the deployment setup, secrets policy and the
constraints that are easy to break."

echo "==> done"
echo "    pages:  $(ls "$OUT"/public/*.html | wc -l | tr -d ' ')"
echo "    assets: $(find "$OUT/public/assets" -type f | wc -l | tr -d ' ')"
echo "    commit: $(git -C "$OUT" log --oneline -1)"
echo
echo "Sanity check before pushing -- this must print nothing:"
echo "    grep -ril 'amana\|jx.assist\|jxrr\|profile.md' $OUT || echo clean"
