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
    ("R", "Financial Summary", "5-year P&L, cash flow and returns: EBITDA, net profit, free cash flow, IRR, NPV, "
                               "MOIC, payback, break-even portfolio size and IRR sensitivities. Year 1 links live to "
                               "the monthly model; Years 2–5 are driven by the editable inputs in its section 1."),
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
    ("B", "5.", "Financial Summary sections 1 and 1b — unit counts for Years 2–5, inflation, headcount, exit "
                "multiple, discount rate and the fixed-cost step-up. These drive every return metric."),
    ("", ""),
    ("SEC", "MODEL BASIS — AS CONFIRMED"),
    ("B", "•", "PURE MANAGEMENT / COMMISSION-ONLY. Orizuru does not master-lease. There is NO unit rent, no unit "
                "DEWA and no unit internet anywhere in this model — those sit with the property owner."),
    ("B", "•", "Unit setup CAPEX is sized for ONE unit. The scaling table on 'Unit Setup (1 Unit)' shows portfolio "
                "cost but is not added to the CAPEX total."),
    ("B", "•", "Directors draw NO salary."),
    ("B", "•", "Operations & service staff: AED 3,000/month per person, starting with 1 person and scaling with the "
                "portfolio via the 'live units per operations staff member' ratio on the Assumptions tab."),
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
    "STAFFING SCALES WITH THE PORTFOLIO. Headcount is no longer fixed at one person: it is driven by the 'live units "
    "per operations staff member' ratio on the Assumptions tab (35 in the Base case, floor of one person), so the "
    "team grows through Year 1 as units come live. Salary stays at the AED 3,000/month specified. That rate is low "
    "for Dubai even for an operations assistant — if hiring proves harder than expected, raise the salary input "
    "rather than cutting the ratio.",
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


# ================================================ FINANCIAL SUMMARY =========
wsn = wb.create_sheet("Financial Summary")
banner(wsn, "FINANCIAL SUMMARY — 5-YEAR P&L, CASH FLOW & RETURNS",
       "All figures AED. Year 1 links live to the monthly model; Years 2–5 are driven by the inputs in section 1.", 7)

YC = ["B", "C", "D", "E", "F"]
FR = {}
r = 4


def fsec(text):
    global r
    section(wsn, r, text, 7)
    r += 1


def fhdr():
    global r
    wsn.cell(r, 1, "").fill = fill_hdr
    for i, h in enumerate(["Year 1", "Year 2", "Year 3", "Year 4", "Year 5"], 2):
        c = wsn.cell(r, i, h)
        c.font = f_hdr
        c.fill = fill_hdr
        c.alignment = Alignment(horizontal="center")
    wsn.cell(r, 1, "Line item").font = f_hdr
    wsn.cell(r, 1).alignment = Alignment(indent=1)
    wsn.cell(r, 7, "Basis / note").font = f_hdr
    wsn.cell(r, 7).fill = fill_hdr
    wsn.cell(r, 1).fill = fill_hdr
    r += 1


def frow(key, label, cells, fmt=CUR, note="", bold=False, band=False,
         indent=1, size=10, rule=False):
    """cells: list of 5 formula strings / values for Y1..Y5."""
    global r
    fnt = Font(name=FONT, size=size, bold=bold)
    wsn.cell(r, 1, label).font = fnt
    wsn.cell(r, 1).alignment = Alignment(indent=indent, wrap_text=True, vertical="center")
    for i, v in enumerate(cells):
        c = wsn.cell(r, 2 + i, v)
        if isinstance(v, str) and v.startswith("="):
            c.font = Font(name=FONT, size=size, bold=bold,
                          color="008000" if "'" in v and "!" in v else "000000")
        else:
            c.font = Font(name=FONT, size=size, bold=bold, color="0000FF")
            c.fill = fill_key
        c.number_format = fmt
    n = wsn.cell(r, 7, note)
    n.font = f_note
    n.alignment = Alignment(wrap_text=True, vertical="top")
    for col in range(1, 8):
        if band:
            wsn.cell(r, col).fill = fill_tot
        wsn.cell(r, col).border = b_top if rule else b_bottom
    wsn.row_dimensions[r].height = max(20, 11 * (1 + len(note) // 62))
    FR[key] = r
    r += 1
    return r - 1


def Y(key):
    return FR[key]


def SY():
    """Row number this frow() call is about to write - for self-referencing rows."""
    return r


def single(key, label, value, fmt=CUR, note="", bold=False, isinput=False):
    global r
    wsn.cell(r, 1, label).font = Font(name=FONT, size=10, bold=bold)
    wsn.cell(r, 1).alignment = Alignment(indent=1, wrap_text=True, vertical="center")
    c = wsn.cell(r, 2, value)
    if isinput:
        c.font = Font(name=FONT, size=10, bold=bold, color="0000FF")
        c.fill = fill_key
    else:
        c.font = Font(name=FONT, size=10, bold=bold,
                      color="008000" if isinstance(value, str) and "'" in value else "000000")
    c.number_format = fmt
    n = wsn.cell(r, 7, note)
    n.font = f_note
    n.alignment = Alignment(wrap_text=True, vertical="top")
    for col in range(1, 8):
        wsn.cell(r, col).border = b_bottom
    wsn.row_dimensions[r].height = max(20, 11 * (1 + len(note) // 62))
    FR[key] = r
    r += 1




# ------------------------------------------------------------- 1. DRIVERS ---
fsec("1.  DRIVERS  —  edit the blue cells to re-cut every number below")
fhdr()

frow("eoy", "Units under management at year end",
     ["='OPEX Monthly'!N" + str(MONTH_ROWS['cum']), 130, 180, 220, 250], fmt='0',
     note="Year 1 links to the monthly model. Years 2–5 are your growth plan — the single biggest lever here.")

frow("avg", "Average live units during the year",
     ["=AVERAGE('OPEX Monthly'!C{0}:N{0})".format(MONTH_ROWS['live'])] +
     [f"=({YC[i-1]}{Y('eoy')}+{YC[i]}{Y('eoy')})/2" for i in range(1, 5)],
     fmt=NUM,
     note="Revenue is earned by units that are LIVE, not units signed. Year 1 averages the actual monthly ramp.")

frow("um", "Live unit-months in the year",
     ["=SUM('OPEX Monthly'!C{0}:N{0})".format(MONTH_ROWS['live'])] +
     [f"={YC[i]}{Y('avg')}*12" for i in range(1, 5)], fmt=NUM,
     note="Drives every per-unit variable cost.")

frow("infl_p", "Price inflation (ADR)", ["=0", 0.03, 0.03, 0.03, 0.03], fmt=PCT,
     note="Applied to ADR from Year 2. Dubai STR rates have run ahead of this; 3% is deliberately conservative.")
frow("infl_c", "Cost inflation", ["=0", 0.04, 0.04, 0.04, 0.04], fmt=PCT,
     note="Applied to all fixed and per-unit costs from Year 2.")

frow("adr", "Average Daily Rate",
     [f"={A('adr')}"] + [f"={YC[i-1]}{SY()}*(1+{YC[i]}{Y('infl_p')})" for i in range(1, 5)],
     note="Year 1 from the Assumptions tab.")

frow("gpu", "Gross booking revenue per unit per month",
     [f"={YC[i]}{Y('adr')}*{A('occ')}*{A('nights')}" for i in range(5)],
     note="What the guest pays. NOT Orizuru revenue.")

frow("hc", "Operations & service headcount (average)",
     ["=AVERAGE('OPEX Monthly'!C{0}:N{0})".format(MONTH_ROWS['hcreq'])] +
     [f"=MAX({A('ops_hc')},ROUNDUP({YC[i]}{Y('avg')}/{A('units_per_staff')},0))" for i in range(1, 5)],
     fmt=NUM,
     note="Driven by the 'live units per operations staff member' ratio on the Assumptions tab, with a floor of one "
          "person. Year 1 is the average of the actual monthly ramp. Change the ratio there and headcount, staff "
          "cost and EBITDA all move together.")

frow("sal", "Average salary per operations head (monthly)",
     [f"={A('ops_sal')}"] + [f"={YC[i-1]}{SY()}*(1+{YC[i]}{Y('infl_c')})" for i in range(1, 5)],
     note="Year 1 as specified by management.")

fsec("1b.  FINANCIAL INPUTS  —  used by the cash flow and returns sections below")
wsn.cell(r, 1, "Input").font = f_hdr
wsn.cell(r, 2, "Value").font = f_hdr
wsn.cell(r, 7, "Basis / note").font = f_hdr
for col in range(1, 8):
    wsn.cell(r, col).fill = fill_hdr
    wsn.cell(r, col).alignment = Alignment(horizontal="center")
wsn.cell(r, 1).alignment = Alignment(indent=1)
r += 1

single("stepup", "Fixed-cost step-up with portfolio growth", 0.40, fmt=PCT, isinput=True,
       note="Share of portfolio growth that flows into 'other fixed costs'. A business running 235 units does not "
            "carry the same office, marketing and admin base as one running 30. At 40%, a doubling of the portfolio "
            "raises fixed costs by 40%. Set to 0% to assume pure operating leverage — optimistic, and the reason "
            "unadjusted models show implausible margins.")
single("onboard", "Share of unit-onboarding cost borne by Orizuru", 0.0, fmt=PCT, isinput=True,
       note="SET TO 0% per the instruction that only ONE unit's setup sits in CAPEX — i.e. onboarding is re-charged "
            "to the owner. Raise it to see what self-funding the rollout costs. Sensitivity below.")
single("wcpct", "Working capital as % of revenue", 0.05, fmt=PCT, isinput=True,
       note="Cash tied up in guest and OTA settlement timing.")
single("disc", "Discount rate (cost of equity)", 0.20, fmt=PCT, isinput=True,
       note="20% is a reasonable hurdle for an unlisted, pre-trading UAE SME. Lower it and NPV rises.")
single("mult", "Exit EBITDA multiple", 4.0, fmt='0.0"x"', isinput=True,
       note="Assumes a trade sale at the end of Year 5. 4x final-year EBITDA is typical for an asset-light "
            "property-management book of this size.")
single("equity", "Shareholder capital invested (Year 0)", f"='Funding Summary'!C{F_CAP}",
       note="Links to the Funding Summary.")


# --------------------------------------------------------- 2. P&L ----------
fsec("2.  INCOME STATEMENT (P&L)")
fhdr()

frow("gbv", "Gross booking value handled (memo)",
     [f"='OPEX Monthly'!O{MONTH_ROWS['gross']}"] +
     [f"={YC[i]}{Y('avg')}*{YC[i]}{Y('gpu')}*12" for i in range(1, 5)],
     note="MEMO ONLY — this is guest money flowing through the account, not revenue. Never present this as turnover.",
     size=9)

frow("rev", "REVENUE — management fees retained",
     [f"='OPEX Monthly'!O{MONTH_ROWS['rev']}"] +
     [f"={YC[i]}{Y('gbv')}*{A('mgmt_fee')}" for i in range(1, 5)],
     bold=True, band=True,
     note="Orizuru's actual top line under the commission-only model.")

wsn.cell(r, 1, "Variable costs").font = Font(name=FONT, size=9, bold=True, italic=True)
r += 1

frow("vunit", "Unit operations (permits, cleaning, consumables, maintenance, linen)",
     [f"='OPEX Monthly'!O{CAT_ROWS['F.  UNIT OPERATIONS  —  variable with portfolio size']}"] +
     [f"={YC[i]}{Y('um')}*({A('permit_unit')}/12+{A('clean_unit')}+{A('consum_unit')}+{A('maint_unit')}"
      f"+{A('linen_unit')})*(1+{YC[i]}{Y('infl_c')})^({i})" for i in range(1, 5)],
     note="Scales directly with the portfolio. Much of it is re-chargeable to owners — see the note at the foot of "
          "this tab.")

frow("vtech", "Unit technology (PMS, dynamic pricing, smart locks)",
     [f"='OPEX Monthly'!C{MONTH_ROWS['live']}*0+SUM('OPEX Monthly'!C{MONTH_ROWS['live']}:N{MONTH_ROWS['live']})"
      f"*({A('pms_unit')}+{A('pricing_unit')}+{A('lock_unit')})"] +
     [f"={YC[i]}{Y('um')}*({A('pms_unit')}+{A('pricing_unit')}+{A('lock_unit')})*(1+{YC[i]}{Y('infl_c')})^({i})"
      for i in range(1, 5)],
     note="Priced per property, so it scales one-for-one with units.")

frow("vcomm", "Unit-acquisition commission (2%, ongoing)",
     [f"='OPEX Monthly'!O{CAT_ROWS['D.  UNIT-ACQUISITION COMMISSION  —  the 2% per management, ongoing']}"] +
     [f"={YC[i]}{Y('gbv')}*{A('comm_pct')}" for i in range(1, 5)],
     note="Charged on every live unit every month, indefinitely. Grows in line with the portfolio and never stops.")

frow("vtot", "Total variable costs",
     [f"={c}{Y('vunit')}+{c}{Y('vtech')}+{c}{Y('vcomm')}" for c in YC], bold=True)

frow("gp", "GROSS PROFIT",
     [f"={c}{Y('rev')}-{c}{Y('vtot')}" for c in YC], bold=True, band=True, rule=True)
frow("gpm", "Gross margin", [f"=IF({c}{Y('rev')}=0,0,{c}{Y('gp')}/{c}{Y('rev')})" for c in YC],
     fmt=PCT, size=9,
     note="Contribution left over after the costs that grow with the portfolio.")

wsn.cell(r, 1, "Fixed operating costs").font = Font(name=FONT, size=9, bold=True, italic=True)
r += 1

frow("fstaff", "Staff (salaries, visas, insurance, gratuity, WPS)",
     [f"='OPEX Monthly'!O{CAT_ROWS['A.  STAFF COSTS  —  DUBAI']}"] +
     [f"={YC[i]}{Y('hc')}*{YC[i]}{Y('sal')}*12*($B${SY()}/MAX(1,$B${Y('hc')}*$B${Y('sal')}*12))"
      for i in range(1, 5)],
     note="Headcount x salary x 12, grossed up by the same employment loading as Year 1 (visas, mandatory "
          "insurance, gratuity, WPS) — roughly 19% on top of salary. Directors remain unpaid throughout.")

frow("ffix", "All other fixed costs (marketing, technology, office, compliance, contingency)",
     [f"='OPEX Summary'!B{S_TOT}-B{Y('vunit')}-B{Y('vtech')}-B{Y('vcomm')}-B{Y('fstaff')}"] +
     [f"={YC[i-1]}{SY()}*(1+{YC[i]}{Y('infl_c')})*(1+$B${FR['stepup']}"
      f"*IF({YC[i-1]}{Y('avg')}=0,0,{YC[i]}{Y('avg')}/{YC[i-1]}{Y('avg')}-1))" for i in range(1, 5)],
     note="Year 1 is derived so that this tab ties EXACTLY to total Year-1 OPEX on the monthly model. Years 2–5 "
          "grow with cost inflation PLUS a step-up for portfolio growth (driver in section 1b) — a bigger book needs "
          "a bigger office, more marketing and more admin.")

frow("ftot", "Total fixed costs", [f"={c}{Y('fstaff')}+{c}{Y('ffix')}" for c in YC], bold=True)

frow("ebitda", "EBITDA", [f"={c}{Y('gp')}-{c}{Y('ftot')}" for c in YC],
     bold=True, band=True, rule=True,
     note="Earnings before interest, tax, depreciation and amortisation. The headline operating profit measure.")
frow("ebitdam", "EBITDA margin",
     [f"=IF({c}{Y('rev')}=0,0,{c}{Y('ebitda')}/{c}{Y('rev')})" for c in YC], fmt=PCT, bold=True, size=9,
     note="Asset-light property management typically runs 20–35% at scale.")

frow("capex", "Capital expenditure in year",
     [f"='Funding Summary'!C{F_CAPEX}"] +
     [f"=({YC[i]}{Y('eoy')}-{YC[i-1]}{Y('eoy')})*'Unit Setup (1 Unit)'!E{U_TOTAL_ROW}*$B${Y('onboard')}"
      for i in range(1, 5)],
     note="Year 1 is the full CAPEX from the Funding Summary. Years 2–5 are unit-onboarding cost on NEW units only, "
          "scaled by the share Orizuru bears (driver in section 4).", size=9)

frow("da", "Depreciation & amortisation",
     [f"=B{Y('capex')}/3",
      f"=SUM($B{Y('capex')}:C{Y('capex')})/3",
      f"=SUM($B{Y('capex')}:D{Y('capex')})/3",
      f"=SUM(C{Y('capex')}:E{Y('capex')})/3",
      f"=SUM(D{Y('capex')}:F{Y('capex')})/3"],
     note="Straight line over 3 years. Non-cash — added back in the cash flow below.")

frow("ebit", "EBIT (operating profit)", [f"={c}{Y('ebitda')}-{c}{Y('da')}" for c in YC], bold=True)
frow("pbt", "Profit before tax", [f"={c}{Y('ebit')}" for c in YC],
     note="No debt assumed, so no interest charge. Add a finance cost line here if the company borrows.")
frow("tax", "UAE Corporate Tax", [f"=-MAX(0,({c}{Y('pbt')}-375000)*0.09)" for c in YC],
     note="9% on taxable profit above the AED 375,000 threshold. Nil below it.")
frow("np", "NET PROFIT", [f"={c}{Y('pbt')}+{c}{Y('tax')}" for c in YC],
     bold=True, band=True, rule=True)
frow("npm", "Net margin", [f"=IF({c}{Y('rev')}=0,0,{c}{Y('np')}/{c}{Y('rev')})" for c in YC],
     fmt=PCT, size=9)

# ------------------------------------------------------- 3. CASH FLOW ------
fsec("3.  CASH FLOW")
fhdr()

frow("cf_ebitda", "EBITDA", [f"={c}{Y('ebitda')}" for c in YC])
frow("cf_tax", "Corporate tax paid", [f"={c}{Y('tax')}" for c in YC])
frow("cf_capex", "Capital expenditure", [f"=-{c}{Y('capex')}" for c in YC])
frow("cf_wc", "Movement in working capital",
     [f"=-{YC[0]}{Y('rev')}*$B${Y('wcpct')}"] +
     [f"=-({YC[i]}{Y('rev')}-{YC[i-1]}{Y('rev')})*$B${Y('wcpct')}" for i in range(1, 5)],
     note="Guest and OTA settlement timing. Cash tied up grows as revenue grows.")
frow("fcf", "FREE CASH FLOW",
     [f"={c}{Y('cf_ebitda')}+{c}{Y('cf_tax')}+{c}{Y('cf_capex')}+{c}{Y('cf_wc')}" for c in YC],
     bold=True, band=True, rule=True)
frow("cumfcf", "Cumulative free cash flow",
     [f"=B{Y('fcf')}"] + [f"={YC[i-1]}{SY()}+{YC[i]}{Y('fcf')}" for i in range(1, 5)], bold=True)
frow("cash", "Closing cash balance (capital + cumulative FCF)",
     [f"='Funding Summary'!C{F_CAP}+B{Y('cumfcf')}"] +
     [f"='Funding Summary'!C{F_CAP}+{YC[i]}{Y('cumfcf')}" for i in range(1, 5)], bold=True,
     note="If this goes negative in any year the plan is not fundable from AED 200,000 as it stands.")

# --------------------------------------------- 4. RETURNS & VALUATION ------
fsec("4.  RETURNS & VALUATION")
wsn.cell(r, 1, "Measure").font = f_hdr
wsn.cell(r, 2, "Value").font = f_hdr
wsn.cell(r, 7, "Basis / note").font = f_hdr
for col in range(1, 8):
    wsn.cell(r, col).fill = fill_hdr
    wsn.cell(r, col).alignment = Alignment(horizontal="center")
wsn.cell(r, 1).alignment = Alignment(indent=1)
r += 1


single("exit", "Exit / terminal value at end of Year 5", f"=F{Y('ebitda')}*B{FR['mult']}", bold=True,
       note="Year-5 EBITDA multiplied by the exit multiple above.")

# investor cash flow row
wsn.cell(r, 1, "Investor cash flow").font = Font(name=FONT, size=9, bold=True, italic=True)
r += 1
wsn.cell(r, 1, "Year").font = f_hdr
for i, h in enumerate(["Year 0", "Year 1", "Year 2", "Year 3", "Year 4", "Year 5"], 2):
    c = wsn.cell(r, i, h)
    c.font = f_hdr
    c.fill = fill_hdr
    c.alignment = Alignment(horizontal="center")
wsn.cell(r, 1).fill = fill_hdr
wsn.cell(r, 1).alignment = Alignment(indent=1)
r += 1

ICF = r
wsn.cell(r, 1, "Net cash flow to shareholders").font = f_tot
wsn.cell(r, 1).alignment = Alignment(indent=1)
cf_cells = [f"=-B{FR['equity']}"] + [f"={c}{Y('fcf')}" for c in YC[:4]] + \
           [f"=F{Y('fcf')}+B{FR['exit']}"]
for i, v in enumerate(cf_cells):
    c = wsn.cell(r, 2 + i, v)
    c.font = f_tot
    c.number_format = CUR
for col in range(1, 9):
    wsn.cell(r, col).fill = fill_tot
    wsn.cell(r, col).border = b_top
wsn.cell(r, 9, "Year 0 is the capital injection. Year 5 includes the exit proceeds.").font = f_note
r += 2

single("irr", "IRR — internal rate of return", f"=IRR(B{ICF}:G{ICF})", fmt=PCT, bold=True,
       note="The annualised return to shareholders across the 5 years including the exit. Compare against the "
            "discount rate above — anything meaningfully higher creates value.")
single("npv", "NPV at the discount rate", f"=NPV(B{FR['disc']},C{ICF}:G{ICF})+B{ICF}", bold=True,
       note="Positive NPV means the plan beats the hurdle rate.")
single("moic", "MOIC — money multiple",
       f"=IF(B{FR['equity']}=0,0,SUM(C{ICF}:G{ICF})/B{FR['equity']})", fmt='0.00"x"', bold=True,
       note="Total cash back divided by cash in.")
single("payback", "Payback — first year cumulative cash flow turns positive",
       f'=IF(F{Y("cumfcf")}<0,"Beyond Year 5","Year "&(COUNTIF(B{Y("cumfcf")}:F{Y("cumfcf")},"<0")+1))',
       fmt='General',
       note="How long before the business has returned the cash it consumed.")
single("revcagr", "Revenue CAGR, Year 1 to Year 5",
       f"=IF(B{Y('rev')}<=0,0,(F{Y('rev')}/B{Y('rev')})^(1/4)-1)", fmt=PCT,
       note="Compound annual growth in management-fee revenue. Flattered by Year 1 being a part-year ramp from zero "
            "— the Year 2 to Year 5 rate below is the fairer measure.")
single("revcagr2", "Revenue CAGR, Year 2 to Year 5",
       f"=IF(C{Y('rev')}<=0,0,(F{Y('rev')}/C{Y('rev')})^(1/3)-1)", fmt=PCT,
       note="Growth once the business is trading normally. This is the number to defend.")
single("ebitdacagr", "EBITDA CAGR, Year 2 to Year 5",
       f"=IF(C{Y('ebitda')}<=0,0,(F{Y('ebitda')}/C{Y('ebitda')})^(1/3)-1)", fmt=PCT,
       note="Profit growth, stripping out the Year-1 ramp distortion.")
single("roe", "Return on equity (Year 5)",
       f"=IF((B{FR['equity']}+SUM(B{Y('np')}:E{Y('np')}))=0,0,"
       f"F{Y('np')}/(B{FR['equity']}+SUM(B{Y('np')}:E{Y('np')})))", fmt=PCT,
       note="Year-5 net profit against closing shareholders' equity (capital plus retained earnings). More "
            "meaningful than measuring against the original AED 200,000 alone.")

# ------------------------------------------------ 5. HEALTH INDICATORS -----
fsec("5.  FINANCIAL HEALTH INDICATORS")
fhdr()

frow("rpu", "Revenue per live unit (annual)",
     [f"=IF({c}{Y('avg')}=0,0,{c}{Y('rev')}/{c}{Y('avg')})" for c in YC],
     note="Should be broadly stable. A fall means discounting or weakening occupancy.")
frow("cpu", "Total cost per live unit (annual)",
     [f"=IF({c}{Y('avg')}=0,0,({c}{Y('vtot')}+{c}{Y('ftot')})/{c}{Y('avg')})" for c in YC],
     note="Should FALL every year as fixed costs spread over more units. This is the whole scaling thesis.")
frow("epu", "EBITDA per live unit (annual)",
     [f"=IF({c}{Y('avg')}=0,0,{c}{Y('ebitda')}/{c}{Y('avg')})" for c in YC])
frow("contrib", "Contribution per unit (revenue less variable cost)",
     [f"=IF({c}{Y('avg')}=0,0,{c}{Y('gp')}/{c}{Y('avg')})" for c in YC],
     note="What each additional unit contributes towards fixed costs and profit.")
frow("beunits", "Break-even portfolio size (units)",
     [f"=IF({c}{Y('contrib')}<=0,0,{c}{Y('ftot')}/{c}{Y('contrib')})" for c in YC], fmt=NUM,
     bold=True,
     note="Units needed just to cover fixed costs. Compare against the average live units in row above — the gap is "
          "your margin of safety.")
frow("safety", "Margin of safety (live units above break-even)",
     [f"={c}{Y('avg')}-{c}{Y('beunits')}" for c in YC], fmt=NUM, bold=True)
frow("fixcov", "Fixed-cost coverage (gross profit / fixed costs)",
     [f"=IF({c}{Y('ftot')}=0,0,{c}{Y('gp')}/{c}{Y('ftot')})" for c in YC], fmt='0.00"x"',
     note="Below 1.0x the business is loss-making at EBITDA level.")
frow("runway", "Cash runway at year-end (months of fixed cost)",
     [f"=IF({c}{Y('ftot')}=0,0,{c}{Y('cash')}/({c}{Y('ftot')}/12))" for c in YC], fmt=NUM,
     note="How many months the closing cash balance would cover fixed costs with no revenue at all.")

# -------------------------------------------------- 6. SENSITIVITY --------
fsec("6.  SENSITIVITY  —  what actually moves the IRR")
r += 0
wsn.cell(r, 1, "Case").font = f_hdr
wsn.cell(r, 2, "IRR").font = f_hdr
wsn.cell(r, 3, "NPV").font = f_hdr
wsn.cell(r, 7, "Comment").font = f_hdr
for col in range(1, 8):
    wsn.cell(r, col).fill = fill_hdr
    wsn.cell(r, col).alignment = Alignment(horizontal="center")
wsn.cell(r, 1).alignment = Alignment(indent=1)
r += 1

SENS = []
sens_defs = [
    ("Exit at 3.0x EBITDA", 3.0, None,
     "A weaker exit market. Note how much of the return depends on the sale, not the trading."),
    ("Exit at 4.0x EBITDA — base case", 4.0, None, ""),
    ("Exit at 5.0x EBITDA", 5.0, None, "A strong strategic buyer."),
    ("No exit — operating cash only", 0.0, None,
     "The honest floor: what shareholders earn if the business is never sold."),
]
for label, mult, _, note in sens_defs:
    hidden = r
    wsn.cell(r, 1, label).font = f_item
    wsn.cell(r, 1).alignment = Alignment(indent=1, wrap_text=True)
    # helper cash flows in columns I..N (off to the side)
    for i in range(6):
        col = 9 + i
        if i < 5:
            v = f"={get_column_letter(2+i)}{ICF}"
        else:
            v = f"=F{Y('fcf')}+F{Y('ebitda')}*{mult}"
        c = wsn.cell(r, col, v)
        c.font = Font(name=FONT, size=8, color="BFBFBF")
        c.number_format = CUR
    wsn.cell(r, 2, f"=IRR(I{r}:N{r})").font = f_tot
    wsn.cell(r, 2).number_format = PCT
    wsn.cell(r, 3, f"=NPV(B{FR['disc']},J{r}:N{r})+I{r}").font = f_calc
    wsn.cell(r, 3).number_format = CUR
    n = wsn.cell(r, 7, note)
    n.font = f_note
    n.alignment = Alignment(wrap_text=True, vertical="top")
    for col in range(1, 8):
        wsn.cell(r, col).border = b_bottom
        if abs(mult - 4.0) < 0.01:
            wsn.cell(r, col).fill = fill_tot
    wsn.row_dimensions[r].height = max(20, 11 * (1 + len(note) // 62))
    r += 1

for label, share, note in [
    ("Orizuru funds 0% of unit onboarding — base case", 0.0,
     "As instructed: onboarding re-charged to the owner."),
    ("Orizuru funds 50% of unit onboarding", 0.5,
     "A common commercial compromise where the operator shares setup cost to win the mandate."),
    ("Orizuru funds 100% of unit onboarding", 1.0,
     "Self-funding the whole rollout. This is the scenario that breaks the AED 200,000 capital — check the closing "
     "cash balance if you go this way."),
]:
    wsn.cell(r, 1, label).font = f_item
    wsn.cell(r, 1).alignment = Alignment(indent=1, wrap_text=True)
    for i in range(6):
        col = 9 + i
        if i == 0:
            v = f"=B{ICF}"
        elif i < 5:
            yr = i  # 1..4
            v = (f"={get_column_letter(2+i)}{ICF}-({YC[yr]}{Y('eoy')}-{YC[yr-1]}{Y('eoy')})"
                 f"*'Unit Setup (1 Unit)'!E{U_TOTAL_ROW}*({share}-$B${FR['onboard']})") if yr >= 1 else f"={get_column_letter(2+i)}{ICF}"
        else:
            v = (f"=G{ICF}-(F{Y('eoy')}-E{Y('eoy')})"
                 f"*'Unit Setup (1 Unit)'!E{U_TOTAL_ROW}*({share}-$B${FR['onboard']})")
        c = wsn.cell(r, col, v)
        c.font = Font(name=FONT, size=8, color="BFBFBF")
        c.number_format = CUR
    wsn.cell(r, 2, f"=IRR(I{r}:N{r})").font = f_tot
    wsn.cell(r, 2).number_format = PCT
    wsn.cell(r, 3, f"=NPV(B{FR['disc']},J{r}:N{r})+I{r}").font = f_calc
    wsn.cell(r, 3).number_format = CUR
    n = wsn.cell(r, 7, note)
    n.font = f_note
    n.alignment = Alignment(wrap_text=True, vertical="top")
    for col in range(1, 8):
        wsn.cell(r, col).border = b_bottom
        if share == 0.0:
            wsn.cell(r, col).fill = fill_tot
    wsn.row_dimensions[r].height = max(20, 11 * (1 + len(note) // 62))
    r += 1

r += 1
# ------------------------------------------------------- 7. READ-ACROSS ----
fsec("7.  HOW TO READ THIS")
r += 0
for d in [
    "YEAR 1 TIES EXACTLY TO THE MONTHLY MODEL. Revenue, staff, unit operations and commission all link straight to "
    "'OPEX Monthly', and the residual fixed-cost line is derived so total Year-1 cost equals the monthly model to the "
    "dirham. Change anything on 'Assumptions' and Year 1 here moves with it.",
    "YEARS 2–5 ARE A PLAN, NOT A FORECAST. They rest on the unit counts, inflation rates and headcount in section 1. "
    "Those are the numbers to argue about — everything below them is arithmetic.",
    "THE IRR IS FLATTERED BY A SMALL CAPITAL BASE. Returns are measured against AED 200,000 of equity. A business "
    "that needs little capital and generates modest absolute profit will always show a high percentage return. Look "
    "at absolute EBITDA and the money multiple alongside the IRR, not the IRR alone.",
    "MUCH OF THE RETURN SITS IN THE EXIT. Compare the base case against the 'no exit' row in section 6. If the gap "
    "is large, the plan depends on selling the business, not on operating it — which a lender will read very "
    "differently from an equity investor.",
    "UNIT ONBOARDING IS THE HIDDEN CAPITAL RISK. This tab assumes owners fund unit setup, per instruction. If "
    "Orizuru ends up funding it to win mandates, the cash requirement rises sharply — section 6 quantifies it. "
    "Settle this in the management agreement before signing owners.",
    "RE-CHARGEABLE COSTS ARE THE BIGGEST SINGLE LEVER. Housekeeping, DET permit renewals and consumables are all "
    "commonly billed to owners or guests. They sit in variable costs here. Re-charging them materially lifts EBITDA "
    "at no commercial cost — it is standard Dubai practice.",
    "CORPORATE TAX BITES FROM THE YEAR PROFIT EXCEEDS AED 375,000. Below that the 9% rate does not apply. Watch the "
    "year the tax line first appears — that is when net profit starts diverging from EBITDA.",
]:
    wsn.merge_cells(start_row=r, start_column=1, end_row=r, end_column=7)
    c = wsn.cell(r, 1, "•  " + d)
    c.font = Font(name=FONT, size=9)
    c.alignment = Alignment(wrap_text=True, vertical="top")
    wsn.row_dimensions[r].height = 13 * (1 + len(d) // 145) + 8
    r += 1

wsn.column_dimensions["A"].width = 52
for col in YC:
    wsn.column_dimensions[col].width = 15
wsn.column_dimensions["G"].width = 62
for col in "HIJKLMN":
    wsn.column_dimensions[col].width = 9
wsn.sheet_view.showGridLines = False
wsn.freeze_panes = "B5"

# ===================================================== ORDER & SAVE =========
ORDER = ["README", "Funding Summary", "Financial Summary", "Assumptions",
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
