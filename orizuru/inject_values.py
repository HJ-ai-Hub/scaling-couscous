"""Embed cached formula results into the workbook.

openpyxl writes formulas as strings with no cached value, so any viewer that
does not itself recalculate — phone preview, Google Drive, Excel Online,
Numbers — shows blank cells where the subtotals should be. Desktop Excel
recalculates on open, but that is not good enough if the file gets forwarded.

LibreOffice cannot run in this container, so we evaluate the model with the
`formulas` library instead and splice the results into the sheet XML as <v>
elements, which is exactly what Excel itself writes. Formulas are left intact,
and fullCalcOnLoad stays set, so opening in Excel still recalculates from the
inputs — the cached values are only there so the file reads correctly
everywhere else.
"""

import re
import shutil
import sys
import zipfile

from lxml import etree

SRC = sys.argv[1] if len(sys.argv) > 1 else "Orizuru_CAPEX_OPEX_Model.xlsx"

NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
RNS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
PKG_RNS = "http://schemas.openxmlformats.org/package/2006/relationships"


def qn(tag, ns=NS):
    return f"{{{ns}}}{tag}"


# ---------------------------------------------------------------- evaluate ---
import formulas  # noqa: E402

print("evaluating model ...")
xl = formulas.ExcelModel().loads(SRC).finish()
sol = xl.calculate()

BOOK = SRC.split("/")[-1]
values = {}          # (SHEET_UPPER, "O86") -> python value
key_re = re.compile(r"^'\[" + re.escape(BOOK) + r"\](.+?)'!([A-Z]{1,3}\d+)$")
for k, v in sol.items():
    m = key_re.match(k)
    if not m:
        continue
    sheet, coord = m.group(1), m.group(2)
    try:
        arr = v.value
    except AttributeError:
        continue
    try:
        val = arr[0][0]
    except (TypeError, IndexError):
        continue
    values[(sheet.upper(), coord)] = val
print(f"  {len(values)} cell values resolved")


def render(val):
    """-> (text, t_attr) or None to skip."""
    import numpy as np
    if val is None:
        return None
    if isinstance(val, np.generic):
        val = val.item()
    if isinstance(val, bool):
        return ("1" if val else "0", "b")
    if isinstance(val, (int, float)):
        if val != val or val in (float("inf"), float("-inf")):
            return None
        return (repr(float(val)) if not float(val).is_integer() else str(int(val)), None)
    s = str(val)
    if s.startswith("#"):          # error literal
        return (s, "e")
    if s in ("", "<Empty>"):
        return None
    return (s, "str")


# ------------------------------------------------------------ map sheet xml ---
zin = zipfile.ZipFile(SRC)
wb_xml = etree.fromstring(zin.read("xl/workbook.xml"))
rels = etree.fromstring(zin.read("xl/_rels/workbook.xml.rels"))
rid_to_target = {r.get("Id"): r.get("Target") for r in rels}

sheet_file = {}
for sh in wb_xml.find(qn("sheets")):
    tgt = rid_to_target[sh.get(qn("id", RNS))].lstrip("/")
    if not tgt.startswith("xl/"):
        tgt = "xl/" + tgt
    sheet_file[tgt] = sh.get("name")

# ------------------------------------------------------------------ rewrite ---
written = skipped = 0
out_name = SRC
buf = {}
for item in zin.infolist():
    data = zin.read(item.filename)
    if item.filename in sheet_file:
        name = sheet_file[item.filename].upper()
        root = etree.fromstring(data)
        for c in root.iter(qn("c")):
            f = c.find(qn("f"))
            if f is None:
                continue
            coord = c.get("r")
            if (name, coord) not in values:
                skipped += 1
                continue
            rendered = render(values[(name, coord)])
            if rendered is None:
                skipped += 1
                continue
            text, t = rendered
            for old in c.findall(qn("v")):
                c.remove(old)
            if t:
                c.set("t", t)
            elif c.get("t") in ("str", "b", "e"):
                del c.attrib["t"]
            v = etree.SubElement(c, qn("v"))
            v.text = text
            # <f> must precede <v>
            c.remove(f)
            c.insert(0, f)
            written += 1
        data = etree.tostring(root, xml_declaration=True,
                              encoding="UTF-8", standalone=True)
    buf[item.filename] = data
zin.close()

shutil.copy(SRC, SRC + ".bak")
with zipfile.ZipFile(out_name, "w", zipfile.ZIP_DEFLATED) as zout:
    for fn, data in buf.items():
        zout.writestr(fn, data)

print(f"  cached values written : {written}")
print(f"  skipped (no value)    : {skipped}")
print(f"  saved                 : {out_name}")
