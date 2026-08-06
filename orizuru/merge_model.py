"""Assemble the single combined workbook from the CAPEX and OPEX builders.

Produces build_model.py, which writes Orizuru_CAPEX_OPEX_Model.xlsx — one file
containing every CAPEX and OPEX tab, plus a combined README and a Funding
Summary that ties total CAPEX to the peak operating cash requirement.
"""

capex = open("build_capex.py").read()
opex = open("build_opex.py").read()

M_CAPEX_START = "# ========================================================== UNIT SETUP ======="
M_CAPEX_END = "wb.save(OUT)"
M_AI = "# ================================================== AI SUBSCRIPTIONS TAB ===="
M_OPEX_README = "# ============================================================ README ========"

capex_body = capex[capex.index(M_CAPEX_START):capex.index(M_CAPEX_END)]
opex_header = opex[:opex.index(M_AI)]
opex_body = opex[opex.index(M_AI):opex.index(M_OPEX_README)]

TAIL = r'''
# ================================================== COMBINED README =========
wsr = wb.create_sheet("README")
banner(wsr, "ORIZURU HOLIDAY HOMES LLC — CAPEX & OPEX FINANCIAL MODEL",
       "Dubai, UAE  |  Trade Licence 1634278  |  TRN 105507385000001  |  All figures in AED", 6)

r = 4
blocks = [
    ("SEC", "WHAT IS IN THIS WORKBOOK"),
    ("T", "Tab", "What it does"),
    ("R", "Funding Summary", "START HERE. Total CAPEX, Year-1 OPEX, and the peak cash the business actually needs "
                             "to fund — tied against the AED 200,000 shareholder capital."),
    ("R", "Assumptions", "Every OPEX input at Low / Base / High. Set SCENARIO in cell B4 and the whole model re-cuts. "
                         "Set cell B6 to choose which marketing option is adopted from Month 3."),
    ("R", "CAPEX Summary", "One-off setup spend rolled up by category."),
    ("R", "CAPEX Detail", "Every CAPEX line at Low / Base / High: formation & licensing, technology, brand, "
                          "equipment, deposits."),
    ("R", "Unit Setup (1 Unit)", "Cost to bring ONE unit live, plus a x1 to x80 portfolio scaling reference."),
    ("R", "OPEX Summary", "Year-1 OPEX by category, key metrics, and the notes you should read before circulating."),
    ("R", "OPEX Monthly", "The engine. 12 months across, every cost line down. Edit the yellow unit-ramp row to "
                          "change the growth path."),
    ("R", "Marketing Comparison", "Option 1 vs Option 2 head-to-head, break-even units, and what to measure before "
                                  "deciding in Month 3."),
    ("R", "AI Subscriptions", "AI stack broken out tool by tool. Feeds the AI line in the OPEX model."),
    ("", ""),
    ("SEC", "THE FOUR LEVERS THAT MOVE EVERYTHING"),
    ("B", "1.", "Assumptions!B4 — SCENARIO (Low / Base / High)."),
    ("B", "2.", "Assumptions!B6 — marketing option adopted from Month 3 (or 'Both' to keep running in parallel)."),
    ("B", "3.", "OPEX Monthly, yellow row — new units signed each month. Currently ramps to 80 units by Month 12, "
                "matching the Business Profile's 70–80 Year-1 target. Set every month to 0 except M1 = 1 for a "
                "single-unit view."),
    ("B", "4.", "Assumptions column F — the active value of any single line. Override any input in its Low/Base/High "
                "cells."),
    ("", ""),
    ("SEC", "MODEL BASIS — AS CONFIRMED"),
    ("B", "•", "PURE MANAGEMENT / COMMISSION-ONLY. Orizuru does not master-lease. There is NO unit rent, no unit "
                "DEWA and no unit internet anywhere in this model — those sit with the property owner."),
    ("B", "•", "Unit setup CAPEX is sized for ONE unit. The scaling table on 'Unit Setup (1 Unit)' shows portfolio "
                "cost but is not added to the CAPEX total."),
    ("B", "•", "Directors draw NO salary."),
    ("B", "•", "Operations & service staff: 1 person at AED 3,000/month."),
    ("B", "•", "Both marketing options run in parallel for Months 1–2, then one is adopted."),
    ("B", "•", "The 2% per signed unit is an ONGOING trailing commission on that unit's monthly revenue, charged "
                "every month for as long as the unit is live — not a one-off signing bonus."),
    ("B", "•", "Figures supplied and used as-is: domain name 3 years AED 387; company stamp AED 137. Both are "
                "one-off, so they sit in CAPEX."),
    ("B", "•", "Shareholder capital is AED 200,000 as confirmed. NOTE: the Business Profile states AED 2,000,000 — "
                "the two must be reconciled before the pack goes to the bank. This model uses AED 200,000."),
    ("B", "•", "Nothing here is sized to the capital figure. Everything is built bottom-up from what the business "
                "needs, then compared against the capital available on 'Funding Summary'."),
    ("", ""),
    ("SEC", "COLOUR LEGEND"),
    ("L", "Blue text", "Hardcoded input — edit freely."),
    ("L", "Yellow fill", "Key lever, or a figure supplied by management."),
    ("L", "Black text", "Formula. Do not overwrite."),
    ("L", "Green text", "Link to another tab in this workbook."),
    ("", ""),
    ("SEC", "WHAT IS DELIBERATELY EXCLUDED"),
    ("B", "•", "OTA commission (Airbnb / Booking.com, 15–18%). Under a commission-only model this is deducted from "
                "gross booking revenue before the owner's split — it is not an Orizuru operating cost. Add it only "
                "if your management contracts make Orizuru bear it."),
    ("B", "•", "Tourism Dirham. Collected from the guest, remitted to DET. Pure pass-through."),
    ("B", "•", "Corporate Tax itself (9% above AED 375,000 taxable profit) — a tax on profit, not OPEX. The "
                "compliance and filing cost IS included."),
    ("B", "•", "Depreciation on the CAPEX. Non-cash; belongs in the P&L, not an OPEX cash budget."),
    ("B", "•", "Unit furnishing. Owner-funded under this model. The operating layer Orizuru does fund is in CAPEX."),
    ("B", "•", "Bank minimum balance. A blocked asset, not a cost — shown as a memo on 'CAPEX Detail'."),
]
for row in blocks:
    if row[0] == "":
        r += 1
        continue
    if row[0] == "SEC":
        section(wsr, r, row[1], 6)
    elif row[0] == "T":
        wsr.cell(r, 1, row[1]).font = f_hdr
        wsr.cell(r, 2, row[2]).font = f_hdr
        for col in range(1, 7):
            wsr.cell(r, col).fill = fill_hdr
    else:
        wsr.cell(r, 1, row[1]).font = Font(name=FONT, size=10, bold=True)
        wsr.merge_cells(start_row=r, start_column=2, end_row=r, end_column=6)
        c = wsr.cell(r, 2, row[2])
        c.font = f_item
        c.alignment = Alignment(wrap_text=True, vertical="top")
        wsr.row_dimensions[r].height = max(14, 13 * (1 + len(row[2]) // 92))
        if row[0] == "L":
            if "Blue" in row[1]:
                wsr.cell(r, 1).font = Font(name=FONT, size=10, bold=True, color="0000FF")
            if "Green" in row[1]:
                wsr.cell(r, 1).font = Font(name=FONT, size=10, bold=True, color="008000")
            if "Yellow" in row[1]:
                wsr.cell(r, 1).fill = fill_key
    r += 1

wsr.column_dimensions["A"].width = 22
for col in "BCDEF":
    wsr.column_dimensions[col].width = 19
wsr.sheet_view.showGridLines = False

# ================================================== FUNDING SUMMARY =========
wsf = wb.create_sheet("Funding Summary")
banner(wsf, "FUNDING SUMMARY — WHAT THE BUSINESS ACTUALLY NEEDS",
       "CAPEX and Year-1 OPEX combined. All figures AED. Base case unless the scenario is changed on 'Assumptions'.", 5)

r = 4
section(wsf, r, "1.  CAPITAL EXPENDITURE  —  one-off", 5)
r += 1
for i, h in enumerate(["Item", "Low", "Base", "High", "Comment"], 1):
    c = wsf.cell(r, i, h)
    c.font = f_hdr
    c.fill = fill_hdr
    c.alignment = Alignment(horizontal="center", wrap_text=True, vertical="center")
wsf.row_dimensions[r].height = 22
r += 1

wsf.cell(r, 1, "Company setup (formation, tech, brand, equipment, deposits)").font = f_item
for col, letter in ((2, "G"), (3, "H"), (4, "I")):
    wsf.cell(r, col, f"='CAPEX Detail'!{letter}{SUB_ROW}").font = f_link
    wsf.cell(r, col).number_format = CUR
wsf.cell(r, 5, "Scale-insensitive — the same whether you run 1 unit or 80.").font = f_note
for col in range(1, 6):
    wsf.cell(r, col).border = b_bottom
r += 1

wsf.cell(r, 1, "Unit setup — 1 unit").font = f_item
for col, letter in ((2, "D"), (3, "E"), (4, "F")):
    wsf.cell(r, col, f"='Unit Setup (1 Unit)'!{letter}{U_TOTAL_ROW}").font = f_link
    wsf.cell(r, col).number_format = CUR
wsf.cell(r, 5, "One unit only, as instructed. Multiply on the 'Unit Setup' tab for portfolio scale.").font = f_note
for col in range(1, 6):
    wsf.cell(r, col).border = b_bottom
r += 1

wsf.cell(r, 1, "Contingency on company setup").font = f_item
for col, letter in ((2, "G"), (3, "H"), (4, "I")):
    wsf.cell(r, col, f"='CAPEX Detail'!{letter}{CONT_ROW}").font = f_link
    wsf.cell(r, col).number_format = CUR
for col in range(1, 6):
    wsf.cell(r, col).border = b_bottom
r += 1

F_CAPEX = r
wsf.cell(r, 1, "TOTAL CAPEX").font = f_white_b
for col, letter in ((2, "B"), (3, "C"), (4, "D")):
    c = wsf.cell(r, col, f"=SUM({letter}{F_CAPEX-3}:{letter}{F_CAPEX-1})")
    c.font = f_white_b
    c.number_format = CUR
for col in range(1, 6):
    wsf.cell(r, col).fill = fill_sec
wsf.row_dimensions[r].height = 20
r += 2

section(wsf, r, "2.  OPERATING EXPENDITURE  —  Year 1", 5)
r += 1
op_lines = [
    ("Total OPEX — Year 1", f"='OPEX Summary'!B{S_TOT}", CUR,
     "Active scenario only. Change SCENARIO on 'Assumptions' to see Low / High."),
    ("Monthly average OPEX", None, CUR, "Year-1 total divided by 12."),
    ("Exit run-rate OPEX (Month 12)", f"='OPEX Monthly'!N{OPEX_TOT_ROW}", CUR,
     "The steady-state monthly cost you carry into Year 2."),
]
F_OPEX = r
for label, f, fmt, note in op_lines:
    wsf.cell(r, 1, label).font = f_item if "Total" not in label else f_tot
    if f:
        wsf.cell(r, 3, f).font = f_link
    else:
        wsf.cell(r, 3, f"=C{F_OPEX}/12").font = f_calc
    wsf.cell(r, 3).number_format = fmt
    c = wsf.cell(r, 5, note)
    c.font = f_note
    c.alignment = Alignment(wrap_text=True, vertical="top")
    for col in range(1, 6):
        wsf.cell(r, col).border = b_bottom
    wsf.row_dimensions[r].height = 22
    r += 1
r += 1

section(wsf, r, "3.  YEAR-1 TRADING  —  does it cover itself?", 5)
r += 1
F_TRADE = r
trade = [
    ("Units signed by Month 12", f"='OPEX Monthly'!N{MONTH_ROWS['cum']}", '0',
     "Against the Business Profile's 70–80 Year-1 target. Driven by the yellow ramp row on 'OPEX Monthly'."),
    ("Gross booking revenue (guest spend across the portfolio)", f"='OPEX Monthly'!O{MONTH_ROWS['gross']}", CUR,
     "NOT Orizuru's revenue. This is the money flowing through the account — likely what the Business Profile's "
     "AED 2.5–4.5M turnover figure refers to."),
    ("Orizuru revenue (management fees retained)", f"='OPEX Monthly'!O{MONTH_ROWS['rev']}", CUR,
     "Orizuru's actual top line under the commission-only model. Agree with your accountant which of these two "
     "figures goes to the bank — they are very different numbers."),
    ("Total OPEX — Year 1", f"=C{F_OPEX}", CUR, ""),
    ("Operating surplus / (deficit), Year 1", None, CUR,
     "Before corporate tax, before depreciation, and before any director remuneration."),
    ("OPEX as % of Orizuru revenue", None, PCT,
     "Above 100% means Year 1 runs at an operating loss — normal while a portfolio ramps from zero."),
]
for label, f, fmt, note in trade:
    wsf.cell(r, 1, label).font = f_item
    wsf.cell(r, 1).alignment = Alignment(wrap_text=True, vertical="center")
    if f:
        wsf.cell(r, 3, f).font = f_link if "'OPEX" in f else f_calc
    wsf.cell(r, 3).number_format = fmt
    c = wsf.cell(r, 5, note)
    c.font = f_note
    c.alignment = Alignment(wrap_text=True, vertical="top")
    for col in range(1, 6):
        wsf.cell(r, col).border = b_bottom
    wsf.row_dimensions[r].height = max(22, 12 * (1 + len(note) // 62))
    r += 1
# surplus and ratio
wsf.cell(F_TRADE + 4, 3, f"=C{F_TRADE+2}-C{F_TRADE+3}").font = f_tot
wsf.cell(F_TRADE + 4, 3).number_format = CUR
wsf.cell(F_TRADE + 5, 3, f"=IF(C{F_TRADE+2}=0,0,C{F_TRADE+3}/C{F_TRADE+2})").font = f_calc
wsf.cell(F_TRADE + 5, 3).number_format = PCT
r += 1

section(wsf, r, "4.  TOTAL FUNDING REQUIREMENT", 5)
r += 1
F_PEAK = r
wsf.cell(r, 1, "Peak cumulative operating cash deficit").font = f_item
wsf.cell(r, 3, f"=MIN(0,MIN('OPEX Monthly'!C{MONTH_ROWS['cumcash']}:N{MONTH_ROWS['cumcash']}))").font = f_link
wsf.cell(r, 3).number_format = CUR
wsf.cell(r, 5, "The worst the cumulative operating cash position ever gets during Year 1. THIS is the working "
                "capital to fund — not the annual OPEX figure.").font = f_note
wsf.cell(r, 5).alignment = Alignment(wrap_text=True, vertical="top")
wsf.row_dimensions[r].height = 32
for col in range(1, 6):
    wsf.cell(r, col).border = b_bottom
r += 1

wsf.cell(r, 1, "Total CAPEX").font = f_item
wsf.cell(r, 3, f"=C{F_CAPEX}").font = f_calc
wsf.cell(r, 3).number_format = CUR
for col in range(1, 6):
    wsf.cell(r, col).border = b_bottom
F_CAPREF = r
r += 1

wsf.cell(r, 1, "Safety buffer").font = f_item
wsf.cell(r, 2, 0.20).font = f_in
wsf.cell(r, 2).number_format = PCT
wsf.cell(r, 2).fill = fill_key
wsf.cell(r, 2).alignment = Alignment(horizontal="center")
wsf.cell(r, 3, f"=(ABS(C{F_PEAK})+C{F_CAPREF})*B{r}").font = f_calc
wsf.cell(r, 3).number_format = CUR
wsf.cell(r, 5, "Cover for the ramp landing slower than planned. Edit the percentage in column B.").font = f_note
for col in range(1, 6):
    wsf.cell(r, col).border = b_bottom
F_BUF = r
r += 1

F_FUND = r
wsf.cell(r, 1, "TOTAL FUNDING REQUIRED").font = f_white_b
wsf.cell(r, 3, f"=ABS(C{F_PEAK})+C{F_CAPREF}+C{F_BUF}").font = f_white_b
wsf.cell(r, 3).number_format = CUR
for col in range(1, 6):
    wsf.cell(r, col).fill = fill_sec
wsf.row_dimensions[r].height = 20
r += 1

wsf.cell(r, 1, "Shareholder capital available").font = f_item
wsf.cell(r, 3, 200000).font = f_in
wsf.cell(r, 3).number_format = CUR
wsf.cell(r, 3).fill = fill_key
wsf.cell(r, 5, "AED 200,000 as confirmed. The Business Profile states AED 2,000,000 — reconcile before "
                "submission.").font = f_note
for col in range(1, 6):
    wsf.cell(r, col).border = b_bottom
F_CAP = r
r += 1

wsf.cell(r, 1, "Headroom / (shortfall)").font = f_tot
wsf.cell(r, 3, f"=C{F_CAP}-C{F_FUND}").font = f_tot
wsf.cell(r, 3).number_format = CUR
wsf.cell(r, 5, "Negative means the ramp above cannot be funded from AED 200,000. Fix it by slowing the unit ramp, "
                "taking the Low CAPEX case, or re-charging unit-level OPEX to owners — see note 6 below.").font = f_note
wsf.cell(r, 5).alignment = Alignment(wrap_text=True, vertical="top")
wsf.row_dimensions[r].height = 30
for col in range(1, 6):
    wsf.cell(r, col).fill = fill_tot
    wsf.cell(r, col).border = b_top
r += 2

section(wsf, r, "5.  READ THIS BEFORE YOU CIRCULATE", 5)
r += 1
for d in [
    "ONE OPERATIONS PERSON FOR 70–80 UNITS IS NOT ENOUGH. At AED 3,000/month one person is covering check-ins, guest "
    "support, housekeeping coordination, maintenance and owner reporting across a portfolio spread over Dubai. The "
    "model runs your figure as instructed, but budget a second and third hire around Months 4 and 8 — or outsource "
    "check-in and housekeeping on a per-unit basis.",
    "THE 2% IS MODELLED AS ONGOING. It applies to every live unit every month, indefinitely, as confirmed. By Month "
    "12 it is one of the largest single lines in the model and it never stops growing with the portfolio. If a "
    "one-off signing bonus was intended, this needs re-cutting — over three years the difference is very large.",
    "REVENUE RECOGNITION. The Business Profile projects AED 2.5–4.5M Year-1 turnover. Under pure commission-only, "
    "Orizuru's own revenue at 70–80 units is materially lower; the AED 2.5–4.5M is closer to gross booking value "
    "passing through the account. Settle which figure you are presenting before the KYC pack goes to the bank.",
    "CAPEX IS SIZED FOR ONE UNIT, OPEX RAMPS TO 80. This is deliberate and as instructed, but the two tabs are not "
    "on the same basis. If you take the portfolio to 80 units, the unit-setup CAPEX scales with it — see the scaling "
    "table on 'Unit Setup (1 Unit)' and add it to the funding requirement above.",
    "MOST UNIT-LEVEL OPEX IS RE-CHARGEABLE. Housekeeping, DET permit renewals and consumables are commonly billed to "
    "the owner or the guest. Set those assumptions to 0 if your management contracts pass them through — it changes "
    "the OPEX total substantially.",
    "AT AED 200,000 THE BASE CASE DOES NOT FUND ITSELF. Base CAPEX (121,158) plus the peak operating cash deficit "
    "(76,726) plus a 20% buffer comes to 237,461 against 200,000 available — a shortfall of about 37,000. Two levers "
    "close it: (a) take the Low CAPEX case, deferring the full website build and brand spend until cash turns "
    "positive, which alone gets you to roughly 20,000 of headroom; (b) re-charge unit-level OPEX (housekeeping, DET "
    "permit renewals, consumables) to owners and guests, which is standard Dubai practice. Doing both leaves about "
    "38,000 of headroom and is the recommended path.",
    "DO NOT TRY TO FIX IT BY SLOWING THE RAMP. This is counter-intuitive but the model is unambiguous: cutting the "
    "ramp from 80 units to 46 by Month 12 makes the peak cash deficit WORSE, not better (119,632 vs 76,726). Fixed "
    "OPEX — office, licence, staff, technology — runs regardless, so a slower ramp simply means paying it for longer "
    "before revenue catches up. If capital is tight, cut CAPEX and re-charge OPEX; do not cut growth.",
]:
    wsf.merge_cells(start_row=r, start_column=1, end_row=r, end_column=5)
    c = wsf.cell(r, 1, "•  " + d)
    c.font = Font(name=FONT, size=9)
    c.alignment = Alignment(wrap_text=True, vertical="top")
    wsf.row_dimensions[r].height = 13 * (1 + len(d) // 118) + 8
    r += 1

wsf.column_dimensions["A"].width = 50
wsf.column_dimensions["B"].width = 16
wsf.column_dimensions["C"].width = 18
wsf.column_dimensions["D"].width = 16
wsf.column_dimensions["E"].width = 58
wsf.sheet_view.showGridLines = False

# ===================================================== ORDER & SAVE =========
ORDER = ["README", "Funding Summary", "Assumptions",
         "CAPEX Summary", "CAPEX Detail", "Unit Setup (1 Unit)",
         "OPEX Summary", "OPEX Monthly", "Marketing Comparison", "AI Subscriptions"]
wb._sheets = [wb[n] for n in ORDER]

OUT = "/home/user/scaling-couscous/orizuru/Orizuru_CAPEX_OPEX_Model.xlsx"
wb.save(OUT)
print("saved", OUT)
print("sheets:", wb.sheetnames)
'''

HEADER_DOC = '''"""Build the SINGLE combined Orizuru Holiday Homes LLC model (CAPEX + OPEX, AED).

Generated by merge_model.py from build_capex.py and build_opex.py — edit those
two builders (or this file) and re-run, rather than hand-editing the workbook.
"""
'''

src = opex_header
# swap the OPEX-only docstring for the combined one
src = HEADER_DOC + src[src.index('"""', src.index('"""') + 3) + 3:]

out = src + capex_body + "\n\n" + opex_body + TAIL
open("build_model.py", "w").write(out)
print("wrote build_model.py", len(out), "bytes")
