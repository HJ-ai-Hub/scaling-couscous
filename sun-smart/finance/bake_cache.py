"""
Post-processes a generated .xlsx to inject cached <v> values into every
formula cell, using the `formulas` library to actually compute them.

openpyxl only ever writes the formula string (<f>) and leaves no cached
result (<v>), so any viewer that doesn't run its own recalculation engine
(mobile "quick look" style previews, some in-app file viewers) renders
formula cells as blank instead of showing the number. Excel/Google Sheets/
LibreOffice recalculate on open regardless, so baking in the cached value
is purely a compatibility fix for dumb/non-recalculating viewers.
"""
import os
import shutil
import warnings
import xml.etree.ElementTree as ET
import zipfile

import formulas

NS = "http://schemas.openxmlformats.org/spreadsheetml/2006/main"
R_NS = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
REL_NS = "http://schemas.openxmlformats.org/package/2006/relationships"
ET.register_namespace("", NS)


def bake(path):
    warnings.filterwarnings("ignore")
    xl = formulas.ExcelModel().loads(path).finish()
    sol = xl.calculate()
    fname = os.path.basename(path).upper()

    def get_value(sheet, cell):
        key = f"'[{fname}]{sheet.upper()}'!{cell}"
        for k in sol.keys():
            if k.upper() == key.upper():
                v = sol[k].value
                try:
                    v = v[0, 0]
                except Exception:
                    pass
                return v
        return None

    tmp_dir = path + "_bake_tmp"
    if os.path.exists(tmp_dir):
        shutil.rmtree(tmp_dir)
    with zipfile.ZipFile(path) as z:
        z.extractall(tmp_dir)

    wb_root = ET.parse(os.path.join(tmp_dir, "xl", "workbook.xml")).getroot()
    sheets_el = wb_root.find(f"{{{NS}}}sheets")
    name_to_rid = {sh.get("name"): sh.get(f"{{{R_NS}}}id") for sh in sheets_el.findall(f"{{{NS}}}sheet")}

    rels_root = ET.parse(os.path.join(tmp_dir, "xl", "_rels", "workbook.xml.rels")).getroot()
    rid_to_target = {rel.get("Id"): rel.get("Target") for rel in rels_root.findall(f"{{{REL_NS}}}Relationship")}

    name_to_file = {name: rid_to_target[rid] for name, rid in name_to_rid.items() if rid in rid_to_target}

    baked_count = 0
    for sheet_name, target in name_to_file.items():
        # openpyxl writes worksheet Targets as absolute package paths
        # (e.g. "/xl/worksheets/sheet1.xml"); normalize before joining.
        sheet_path = os.path.join(tmp_dir, target.lstrip("/"))
        tree = ET.parse(sheet_path)
        root = tree.getroot()
        changed = False
        for c in root.iter(f"{{{NS}}}c"):
            f_el = c.find(f"{{{NS}}}f")
            v_el = c.find(f"{{{NS}}}v")
            # openpyxl writes an empty <v /> placeholder for every formula
            # cell (no text) -- that's what renders as blank in viewers that
            # don't recalculate, so treat "present but empty" the same as
            # "missing" and fill in the real value either way.
            if f_el is not None and (v_el is None or not (v_el.text or "").strip()):
                cell_ref = c.get("r")
                val = get_value(sheet_name, cell_ref)
                if val is None:
                    continue
                if v_el is None:
                    v_el = ET.SubElement(c, f"{{{NS}}}v")
                if isinstance(val, bool):
                    c.set("t", "b")
                    v_el.text = "1" if val else "0"
                elif isinstance(val, str):
                    c.set("t", "str")
                    v_el.text = val
                else:
                    v_el.text = repr(float(val))
                changed = True
                baked_count += 1
        if changed:
            tree.write(sheet_path, xml_declaration=True, encoding="UTF-8")

    with zipfile.ZipFile(path, "w", zipfile.ZIP_DEFLATED) as zf:
        for folder, _, files in os.walk(tmp_dir):
            for file in files:
                full = os.path.join(folder, file)
                rel = os.path.relpath(full, tmp_dir)
                zf.write(full, rel)
    shutil.rmtree(tmp_dir)
    return baked_count


if __name__ == "__main__":
    import sys
    for p in sys.argv[1:]:
        n = bake(p)
        print(f"{p}: baked {n} formula cell(s)")
