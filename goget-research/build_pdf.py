#!/usr/bin/env python3
"""Convert a research markdown file to a styled PDF via markdown + WeasyPrint.

Usage: python3 build_pdf.py [name]
  name defaults to "goget-research"; pass e.g. "malaysia-bnpl-research"
  to build that file. Reads <name>.md, writes <name>.pdf.
"""
import sys
import markdown
from weasyprint import HTML
from pathlib import Path

HERE = Path(__file__).parent
NAME = sys.argv[1] if len(sys.argv) > 1 else "goget-research"
FOOTER = sys.argv[2] if len(sys.argv) > 2 else "GoGet.my Deep Research"
md_text = (HERE / f"{NAME}.md").read_text(encoding="utf-8")

html_body = markdown.markdown(
    md_text,
    extensions=["tables", "fenced_code", "sane_lists", "attr_list"],
)

CSS = """
@page {
  size: A4;
  margin: 22mm 18mm 20mm 18mm;
  @bottom-center {
    content: "__FOOTER__ \\2014 page " counter(page) " of " counter(pages);
    font-size: 8pt; color: #888;
  }
}""".replace("__FOOTER__", FOOTER) + """
body { font-family: "DejaVu Sans", "Helvetica", sans-serif; font-size: 10.2pt;
       line-height: 1.5; color: #1f2328; }
h1 { font-size: 22pt; color: #c0392b; border-bottom: 3px solid #c0392b;
     padding-bottom: 6px; margin: 0 0 4px; }
h2 { font-size: 14pt; color: #b5341f; margin-top: 22px; border-bottom: 1px solid #e3b9b2;
     padding-bottom: 3px; }
h3 { font-size: 11.5pt; color: #333; margin-top: 14px; }
em { color: #555; }
table { border-collapse: collapse; width: 100%; margin: 10px 0; font-size: 9.3pt; }
th, td { border: 1px solid #d0d7de; padding: 5px 8px; text-align: left;
         vertical-align: top; }
th { background: #c0392b; color: #fff; font-weight: 600; }
tr:nth-child(even) td { background: #faf3f1; }
blockquote { background: #fff8e6; border-left: 4px solid #e0a800; margin: 10px 0;
             padding: 6px 12px; color: #5b4a00; font-size: 9.5pt; }
blockquote p { margin: 4px 0; }
hr { border: none; border-top: 1px solid #ddd; margin: 16px 0; }
code { background: #f3f3f3; padding: 1px 4px; border-radius: 3px;
       font-family: "DejaVu Sans Mono", monospace; font-size: 9pt; }
ul, ol { margin: 6px 0 6px 0; padding-left: 20px; }
li { margin: 2px 0; }
strong { color: #1f2328; }
a { color: #c0392b; text-decoration: none; }
"""

html_doc = f"""<!DOCTYPE html><html><head><meta charset="utf-8">
<style>{CSS}</style></head><body>{html_body}</body></html>"""

out = HERE / f"{NAME}.pdf"
HTML(string=html_doc).write_pdf(str(out))
print(f"Wrote {out} ({out.stat().st_size:,} bytes)")
