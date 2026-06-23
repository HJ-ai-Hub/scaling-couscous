#!/usr/bin/env python3
"""
Generates the PDF edition of the Conditional Share Transfer Agreement using
reportlab (Platypus), since LibreOffice headless conversion is unavailable in
this environment. Mirrors the DOCX content with professional typesetting.

Output: agreements/Orizuru_Share_Transfer_Agreement.pdf
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_JUSTIFY, TA_LEFT
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    BaseDocTemplate, PageTemplate, Frame, Paragraph, Spacer, Table, TableStyle,
    PageBreak, KeepTogether, HRFlowable, NextPageTemplate,
)

NAVY = colors.HexColor("#0E2A47")
GOLD = colors.HexColor("#B18A3E")
GREY = colors.HexColor("#555555")
LIGHT = colors.HexColor("#8A8A8A")
CREAM = colors.HexColor("#F4F1E8")
CALL = colors.HexColor("#F3EDDE")
SIGBG = colors.HexColor("#FBFAF6")
ROWALT = colors.HexColor("#F4F1E8")
TOTALBG = colors.HexColor("#E7DFC8")

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                   "Orizuru_Share_Transfer_Agreement.pdf")

# ---------------------------------------------------------------- styles
ss = getSampleStyleSheet()

body = ParagraphStyle("body", parent=ss["Normal"], fontName="Times-Roman",
                      fontSize=10, leading=14.5, alignment=TA_JUSTIFY,
                      textColor=colors.HexColor("#1A1A1A"), spaceAfter=6)
body_l = ParagraphStyle("body_l", parent=body, alignment=TA_LEFT)
small = ParagraphStyle("small", parent=body, fontSize=9, leading=12)
sectitle = ParagraphStyle("sectitle", parent=ss["Normal"], fontName="Helvetica-Bold",
                          fontSize=12, textColor=NAVY, spaceBefore=12, spaceAfter=4)
clause_head = ParagraphStyle("clause_head", parent=ss["Normal"],
                             fontName="Helvetica-Bold", fontSize=11, textColor=NAVY,
                             spaceBefore=12, spaceAfter=3)
clause_body = ParagraphStyle("clause_body", parent=body, leftIndent=26,
                             firstLineIndent=-26, spaceAfter=6)
def_body = ParagraphStyle("def_body", parent=body, leftIndent=40,
                          firstLineIndent=-18, spaceAfter=5)
recital_body = ParagraphStyle("recital_body", parent=body, leftIndent=26,
                              firstLineIndent=-26, spaceAfter=6)
party_body = clause_body
callout_title = ParagraphStyle("callout_title", parent=ss["Normal"],
                               fontName="Helvetica-Bold", fontSize=10, textColor=NAVY)
callout_body = ParagraphStyle("callout_body", parent=body, fontSize=9, leading=12.5,
                              textColor=GREY, spaceAfter=4)
cell = ParagraphStyle("cell", parent=body, fontSize=9, leading=11.5, spaceAfter=0,
                      alignment=TA_LEFT)
cell_c = ParagraphStyle("cell_c", parent=cell, alignment=TA_CENTER)
cell_h = ParagraphStyle("cell_h", parent=cell, fontName="Helvetica-Bold",
                        textColor=colors.white, alignment=TA_CENTER)
cell_tot = ParagraphStyle("cell_tot", parent=cell, fontName="Helvetica-Bold",
                          textColor=NAVY)
cell_tot_c = ParagraphStyle("cell_tot_c", parent=cell_tot, alignment=TA_CENTER)

# cover styles
cv_conf = ParagraphStyle("cv_conf", parent=ss["Normal"], fontName="Helvetica-Bold",
                         fontSize=10, textColor=GOLD, alignment=TA_CENTER, spaceAfter=4)
cv_title = ParagraphStyle("cv_title", parent=ss["Normal"], fontName="Helvetica-Bold",
                          fontSize=28, textColor=NAVY, alignment=TA_CENTER, leading=32)
cv_sub = ParagraphStyle("cv_sub", parent=ss["Normal"], fontName="Helvetica-Oblique",
                        fontSize=14, textColor=GOLD, alignment=TA_CENTER, spaceAfter=2)
cv_small = ParagraphStyle("cv_small", parent=ss["Normal"], fontName="Helvetica",
                          fontSize=11, textColor=GREY, alignment=TA_CENTER)
cv_co = ParagraphStyle("cv_co", parent=ss["Normal"], fontName="Helvetica-Bold",
                       fontSize=14, textColor=NAVY, alignment=TA_CENTER)
cv_co_sm = ParagraphStyle("cv_co_sm", parent=ss["Normal"], fontName="Helvetica-Bold",
                          fontSize=12, textColor=NAVY, alignment=TA_CENTER)
cv_label = ParagraphStyle("cv_label", parent=ss["Normal"], fontName="Helvetica-Bold",
                          fontSize=11, textColor=GOLD, alignment=TA_CENTER)
cv_ital = ParagraphStyle("cv_ital", parent=ss["Normal"], fontName="Helvetica-Oblique",
                         fontSize=9.5, textColor=GREY, alignment=TA_CENTER)

story = []


def b(text):  # bold markup -> reportlab
    return text.replace("**", "<b>", 1)


def md(text):
    # convert **..** pairs to <b>..</b>
    out = []
    bold = False
    i = 0
    while True:
        idx = text.find("**", i)
        if idx == -1:
            out.append(text[i:])
            break
        out.append(text[i:idx])
        out.append("<b>" if not bold else "</b>")
        bold = not bold
        i = idx + 2
    return "".join(out)


def P(text, style=body):
    story.append(Paragraph(md(text), style))


def clause(num, text):
    story.append(Paragraph(f'<font color="#0E2A47"><b>{num}</b></font>&nbsp;&nbsp;&nbsp;{md(text)}',
                           clause_body))


def recital(label, text):
    story.append(Paragraph(
        f'<font color="#0E2A47"><b>({label})</b></font>&nbsp;&nbsp;&nbsp;{md(text)}',
        recital_body))


def section(title):
    story.append(Spacer(1, 4))
    story.append(Paragraph(title.upper(), sectitle))
    story.append(HRFlowable(width="100%", thickness=1, color=GOLD,
                            spaceBefore=1, spaceAfter=6))


def heading(num, text):
    story.append(Paragraph(f"{num}.&nbsp;&nbsp;&nbsp;{text.upper()}", clause_head))


def callout(title, lines, fill=CALL, border=GOLD):
    inner = [Paragraph(title.upper(), callout_title)]
    for ln in lines:
        inner.append(Paragraph(md(ln), callout_body))
    t = Table([[inner]], colWidths=[165 * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), fill),
        ("BOX", (0, 0), (-1, -1), 1, border),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(t)


def data_table(headers, rows, widths, total=None):
    data = [[Paragraph(h, cell_h) for h in headers]]
    for r in rows:
        data.append([Paragraph(c, cell if i == 0 else cell_c) for i, c in enumerate(r)])
    if total:
        data.append([Paragraph(c, cell_tot if i == 0 else cell_tot_c)
                     for i, c in enumerate(total)])
    t = Table(data, colWidths=[w * mm for w in widths], hAlign="CENTER")
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), NAVY),
        ("GRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#BBBBBB")),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
    ]
    body_rows = len(rows)
    for i in range(1, 1 + body_rows):
        if i % 2 == 0:
            style.append(("BACKGROUND", (0, i), (-1, i), ROWALT))
    if total:
        style.append(("BACKGROUND", (0, -1), (-1, -1), TOTALBG))
    t.setStyle(TableStyle(style))
    story.append(t)
    story.append(Spacer(1, 6))


def sig_block(role, entity, name_label, extra=None):
    rows = (extra or []) + [
        ("Signature", "_______________________________________"),
        (name_label, "_______________________________________"),
        ("Title / Capacity", "_______________________________________"),
        ("Date", "_______________________________________"),
    ]
    inner = [
        Paragraph(f'<font color="#B18A3E">{role.upper()}</font>',
                  ParagraphStyle("r", parent=ss["Normal"], fontName="Helvetica-Bold",
                                 fontSize=8.5, textColor=GOLD)),
        Paragraph(entity, ParagraphStyle("e", parent=ss["Normal"],
                  fontName="Helvetica-Bold", fontSize=11, textColor=NAVY, spaceBefore=2,
                  spaceAfter=4)),
    ]
    for lbl, line in rows:
        inner.append(Paragraph(
            f'<font color="#555555"><b>{lbl}:</b></font>&nbsp;&nbsp;{line}',
            ParagraphStyle("sl", parent=ss["Normal"], fontName="Times-Roman",
                           fontSize=9.5, leading=18)))
    t = Table([[inner]], colWidths=[165 * mm])
    t.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), SIGBG),
        ("BOX", (0, 0), (-1, -1), 0.6, colors.HexColor("#C9C2AE")),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ]))
    story.append(KeepTogether([t, Spacer(1, 8)]))


# ================================================================ COVER
story.append(Spacer(1, 30))
P("STRICTLY PRIVATE &amp; CONFIDENTIAL", cv_conf)
story.append(HRFlowable(width="60%", thickness=1.5, color=GOLD, spaceBefore=4,
                        spaceAfter=26, hAlign="CENTER"))
P("SHARE TRANSFER<br/>AGREEMENT", cv_title)
story.append(Spacer(1, 8))
P("Conditional &amp; Performance-Based", cv_sub)
story.append(Spacer(1, 10))
P("in respect of 21% of the issued share capital of", cv_small)
P("ORIZURU HOLIDAY HOMES LLC", cv_co)
story.append(Spacer(1, 14))
story.append(HRFlowable(width="40%", thickness=0.8, color=NAVY, spaceBefore=2,
                        spaceAfter=16, hAlign="CENTER"))
P("BETWEEN", cv_label)
P("PODOCARPUS REAL ESTATE LLC", cv_co_sm)
P("(the Transferor)", cv_ital)
story.append(Spacer(1, 6))
P("AND", cv_label)
P("ORIZURU HOLIDAY HOMES LLC", cv_co_sm)
P("(the Company)", cv_ital)
story.append(Spacer(1, 6))
P("JOINED BY", cv_label)
P("MR. YSLAM ATAYEV &nbsp;&amp;&nbsp; MR. ORAZDURDY MAMIYEV", cv_co_sm)
P("(together, the Transferees)", cv_ital)
story.append(Spacer(1, 22))
story.append(HRFlowable(width="60%", thickness=1.5, color=GOLD, spaceBefore=2,
                        spaceAfter=14, hAlign="CENTER"))
P("Dated: ____ / ____ / 20____", cv_co_sm)
P("Governed by the laws of the United Arab Emirates as applied in the Emirate of Dubai",
  cv_ital)
story.append(PageBreak())

# ================================================================ NOTICE
callout(
    "Important Legal Notice",
    [
        "This document is a template share transfer agreement prepared for the parties named "
        "above. It is drafted to reflect the principles of <b>UAE Federal Decree-Law No. (32) of "
        "2021 on Commercial Companies</b> and the practice of the <b>Department of Economy and "
        "Tourism (Dubai)</b>. It is <b>not</b> a substitute for independent legal advice.",
        "A transfer of shares (an interest / quota) in a Dubai mainland Limited Liability Company "
        "is only fully effective once it is <b>notarised before a Notary Public in Dubai</b>, the "
        "<b>Memorandum of Association (MOA) is amended</b>, and the change is <b>registered with "
        "the Department of Economy and Tourism</b>. The parties should engage a UAE-licensed legal "
        "practitioner to review, finalise, prepare the Arabic notarised addendum and complete "
        "registration before execution.",
        "Fields shown as <b>[ &#9679; ]</b> or blank lines are to be completed by the parties. A "
        "consolidated list of items to complete appears at <b>Schedule 5</b>.",
    ],
)
story.append(Spacer(1, 14))

# ================================================================ TITLE
P("SHARE TRANSFER AGREEMENT", ParagraphStyle("t2", parent=ss["Normal"],
  fontName="Helvetica-Bold", fontSize=16, textColor=NAVY, alignment=TA_CENTER))
P("(Conditional &amp; Performance-Based)", ParagraphStyle("t3", parent=ss["Normal"],
  fontName="Helvetica-Oblique", fontSize=11, textColor=GOLD, alignment=TA_CENTER,
  spaceAfter=10))
P("This Share Transfer Agreement (this &#8220;<b>Agreement</b>&#8221;) is made on this "
  "______ day of ____________________ 20____ (the &#8220;<b>Effective Date</b>&#8221;).")

# ================================================================ PARTIES
section("Parties")
clause("(1)", "**PODOCARPUS REAL ESTATE LLC**, a limited liability company incorporated and "
       "licensed in the Emirate of Dubai, United Arab Emirates under commercial licence no. "
       "[ &#9679; ], having its registered office at [ &#9679; ], Dubai, UAE (the "
       "&#8220;**Transferor**&#8221; or &#8220;**Podocarpus**&#8221;);")
clause("(2)", "**ORIZURU HOLIDAY HOMES LLC**, a limited liability company incorporated and "
       "licensed in the Emirate of Dubai, United Arab Emirates under commercial licence no. "
       "[ &#9679; ], having its registered office at [ &#9679; ], Dubai, UAE (the "
       "&#8220;**Company**&#8221;);")
clause("(3)", "**MR. YSLAM ATAYEV**, holder of passport / Emirates ID no. [ &#9679; ], of "
       "[ &#9679; ] (&#8220;**Mr. Atayev**&#8221;); and")
clause("(4)", "**MR. ORAZDURDY MAMIYEV**, holder of passport / Emirates ID no. [ &#9679; ], of "
       "[ &#9679; ] (&#8220;**Mr. Mamiyev**&#8221;).")
P("Mr. Atayev and Mr. Mamiyev are together referred to as the &#8220;<b>Transferees</b>&#8221; "
  "and each a &#8220;<b>Transferee</b>&#8221;. The Transferor, the Company and the Transferees "
  "are together referred to as the &#8220;<b>Parties</b>&#8221; and each a "
  "&#8220;<b>Party</b>&#8221;. The Transferor and the Company are the principal counterparties to "
  "this Agreement, and the Transferees join in and execute this Agreement as the recipients of the "
  "Transfer Shares and as continuing shareholders of the Company.")

# ================================================================ RECITALS
section("Recitals (Whereas)")
recital("A", "The Company is a limited liability company duly established in the Emirate of Dubai "
        "and engaged, among other activities, in the business of holiday homes / short-term rental "
        "and the leasing and operation of residential property in Dubai.")
recital("B", "As at the Effective Date, the issued share capital of the Company is held as "
        "follows: **Podocarpus &#8211; 70%**; **Mr. Atayev &#8211; 16%**; and **Mr. Mamiyev "
        "&#8211; 14%** (the &#8220;**Existing Shareholding**&#8221;), as more particularly set out "
        "in **Schedule 1**.")
recital("C", "The paid-up capital initially contributed to and deployed in the Company "
        "attributable to the Transferor is **AED 200,000 (two hundred thousand UAE Dirhams)** (the "
        "&#8220;**Initial Capital**&#8221;).")
recital("D", "The Transferor wishes to incentivise and reward the continuing efforts and "
        "performance of the Transferees in growing the business of the Company by agreeing to "
        "transfer to them, conditionally and as a performance reward, an aggregate of **21% "
        "(twenty-one per cent)** of the issued share capital of the Company, subject to and "
        "conditional upon the achievement of the Performance Threshold described in this Agreement.")
recital("E", "It is the express intention of the Parties that (i) the right to effect the "
        "transfer, and the determination of how the 21% is allocated between the Transferees "
        "according to their respective performance, shall vest in and be exercised by the Founder "
        "of the Transferor in the Founder&#8217;s **absolute and sole discretion**; (ii) no "
        "transfer shall occur unless and until the Performance Threshold is satisfied; and "
        "(iii) notwithstanding that the Transferor&#8217;s holding will reduce to 49% and the "
        "Transferees&#8217; combined holding will become 51% upon Completion, the Transferor "
        "(acting by the Founder) shall **retain absolute decision-making power and control over "
        "the Company** following Completion, on the terms set out in Clause 7.")
recital("F", "The Parties enter into this Agreement to record the binding terms upon which the "
        "said transfer shall, upon satisfaction of the conditions set out herein, be carried into "
        "effect.")

# ================================================================ OPERATIVE
section("Operative Provisions")
P("**NOW IT IS HEREBY AGREED** as follows:")

heading("1", "Definitions and Interpretation")
clause("1.1", "In this Agreement, unless the context otherwise requires, the following expressions "
       "have the following meanings:")
defs = [
    ("AED", "the lawful currency of the United Arab Emirates (UAE Dirham)."),
    ("Applicable Law", "the federal laws of the United Arab Emirates and the laws, regulations and "
     "administrative requirements applicable in the Emirate of Dubai, including UAE Federal "
     "Decree-Law No. (32) of 2021 on Commercial Companies (as amended) (the &#8220;CCL&#8221;) and "
     "the requirements of the Department of Economy and Tourism, Dubai (&#8220;DET&#8221;)."),
    ("Allocation Notice", "the written notice issued by the Founder pursuant to Clause 4 "
     "determining the respective percentages of the Transfer Shares to be transferred to each "
     "Transferee, substantially in the form of Schedule 3."),
    ("Capital Recovery Amount", "AED 200,000 (two hundred thousand UAE Dirhams), being the amount "
     "of Cumulative Gross Profit notionally attributable to the full recovery of the Initial "
     "Capital."),
    ("Completion", "completion of the transfer of the Transfer Shares in accordance with Clause 6, "
     "including notarisation and registration with the DET."),
    ("Cumulative Gross Profit", "the aggregate gross profit of the Company (being total revenue "
     "actually realised and received by the Company less the direct cost of generating that "
     "revenue) accumulated from the commencement of the Company&#8217;s operations up to the date "
     "of measurement, as determined in accordance with Schedule 2."),
    ("Encumbrance", "any mortgage, charge, pledge, lien, option, restriction, right of first "
     "refusal, right of pre-emption, third-party right or interest, or any other encumbrance or "
     "security interest of any kind."),
    ("Founder", "[ &#9679; full name ], holder of passport / Emirates ID no. [ &#9679; ], being "
     "the founder of the Transferor, or such other person as the Transferor may by written notice "
     "designate as exercising the Founder&#8217;s rights under this Agreement."),
    ("Performance Threshold", "the achievement by the Company of Cumulative Gross Profit of not "
     "less than AED 400,000 (four hundred thousand UAE Dirhams), comprising the Capital Recovery "
     "Amount of AED 200,000 plus the Surplus Profit Amount of AED 200,000, as more particularly "
     "described in Clause 3 and Schedule 2."),
    ("Surplus Profit Amount", "AED 200,000 (two hundred thousand UAE Dirhams), being the "
     "additional Cumulative Gross Profit required to be generated for the Company over and above "
     "the Capital Recovery Amount."),
    ("Transfer Shares", "an aggregate of 21% (twenty-one per cent) of the issued share capital of "
     "the Company currently held by the Transferor, to be transferred to the Transferees in the "
     "proportions determined under the Allocation Notice."),
    ("Trigger Event", "satisfaction of the Performance Threshold, being the event upon which the "
     "Transferor&#8217;s obligation to transfer the Transfer Shares (subject to the "
     "Founder&#8217;s rights under Clause 5) arises."),
]
for term, meaning in defs:
    story.append(Paragraph(
        f'<font color="#0E2A47"><b>&#8220;{term}&#8221;</b></font>&nbsp;&nbsp;means {meaning}',
        def_body))
clause("1.2", "**Interpretation.** Clause headings are for convenience only and do not affect "
       "interpretation. References to a &#8220;Clause&#8221; or &#8220;Schedule&#8221; are to "
       "clauses of and schedules to this Agreement; the Schedules form part of this Agreement. "
       "Words importing the singular include the plural and vice versa. References to a "
       "&#8220;person&#8221; include natural persons and bodies corporate. A reference to a statute "
       "is a reference to it as amended, consolidated or re-enacted from time to time. "
       "&#8220;Including&#8221; means including without limitation.")

heading("2", "Subject Matter and Conditional Nature")
clause("2.1", "This Agreement records the binding terms upon which the Transferor agrees to "
       "transfer, and the Transferees agree to acquire, the Transfer Shares as a performance "
       "reward, **conditional upon and subject to** the occurrence of the Trigger Event and the "
       "issuance of the Allocation Notice.")
clause("2.2", "The Parties acknowledge and agree that, notwithstanding any other provision of this "
       "Agreement, **no legal or beneficial interest in the Transfer Shares shall pass** to either "
       "Transferee unless and until (a) the Trigger Event has occurred; (b) the Founder has issued "
       "the Allocation Notice; and (c) Completion has taken place in accordance with Clause 6.")
clause("2.3", "Until Completion, the Transferor shall remain the legal and beneficial owner of the "
       "entirety of its 70% shareholding and shall be entitled to exercise all rights attaching to "
       "those shares, including voting and dividend rights.")

heading("3", "Performance Threshold (the Sales / Profit Condition)")
clause("3.1", "The transfer of the Transfer Shares is conditional upon the Company achieving the "
       "**Performance Threshold**, namely Cumulative Gross Profit of not less than **AED 400,000 "
       "(four hundred thousand UAE Dirhams)**.")
clause("3.2", "The Performance Threshold shall be deemed to comprise two components: (a) the "
       "**Capital Recovery Amount** of AED 200,000, representing the full recovery to the Company "
       "of the Initial Capital of AED 200,000; and (b) the **Surplus Profit Amount** of AED "
       "200,000, representing additional profit generated for the Company over and above the "
       "Capital Recovery Amount.")
clause("3.3", "Cumulative Gross Profit shall be measured on a cumulative basis from the "
       "commencement of the Company&#8217;s operations and shall be determined in accordance with "
       "the methodology set out in **Schedule 2**. There shall be **no fixed deadline** by which "
       "the Performance Threshold must be achieved; the condition is a continuing one and the "
       "Trigger Event occurs as and when the Performance Threshold is first satisfied.")
clause("3.4", "The Trigger Event shall be evidenced by management accounts of the Company certified "
       "by the Company&#8217;s accountant or auditor confirming that the Performance Threshold has "
       "been met (the &#8220;**Threshold Certificate**&#8221;). The Transferor (acting by the "
       "Founder) shall be entitled, but not obliged, to require independent verification of the "
       "Threshold Certificate at the Company&#8217;s cost before acting upon it.")
clause("3.5", "For the avoidance of doubt, the achievement of the Performance Threshold is a "
       "condition to the Transferor&#8217;s obligation to transfer; it does not, of itself, effect "
       "any transfer, which remains subject to the Founder&#8217;s rights under Clause 5 and to "
       "Completion under Clause 6.")

heading("4", "Allocation of the Transfer Shares Between the Transferees")
clause("4.1", "The 21% Transfer Shares shall be allocated between the Transferees **according to "
       "their respective performance** and contribution to the achievement of the Performance "
       "Threshold and to the growth of the Company&#8217;s business.")
clause("4.2", "The determination of the respective percentages allocated to each Transferee shall "
       "be made by the **Founder in the Founder&#8217;s absolute and sole discretion**, and shall "
       "be recorded in the Allocation Notice issued substantially in the form of **Schedule 3**. "
       "The aggregate of the percentages so allocated shall equal, but shall not exceed, 21%.")
clause("4.3", "The Founder&#8217;s determination in the Allocation Notice shall, save in the case "
       "of manifest error or fraud, be **final and binding** on the Company and the Transferees, "
       "who irrevocably agree to accept and give effect to it.")
clause("4.4", "By way of illustration only and without binding the Founder, examples of possible "
       "resulting shareholding outcomes are set out in **Schedule 4**. Nothing in Schedule 4 "
       "fetters the Founder&#8217;s discretion under this Clause 4.")

heading("5", "Founder&#8217;s Absolute Rights and Discretion")
clause("5.1", "The Parties expressly acknowledge and agree that the right to trigger, effect, "
       "structure, time, allocate, defer or decline the transfer of the Transfer Shares is vested "
       "in the Founder of the Transferor and is exercisable in the Founder&#8217;s **absolute and "
       "sole discretion**.")
clause("5.2", "Without limiting Clause 5.1, the Founder shall have the absolute right to determine: "
       "(a) whether and when the Trigger Event has been satisfied; (b) the respective allocation of "
       "the Transfer Shares between the Transferees; (c) whether any conditions of good standing, "
       "continued involvement or conduct of a Transferee have been met; and (d) the timing of "
       "Completion.")
clause("5.3", "The exercise (or non-exercise) by the Founder of any discretion under this Agreement "
       "shall not give rise to any claim, liability or cause of action against the Founder or the "
       "Transferor, provided such discretion is exercised in good faith and not fraudulently.")
clause("5.4", "The rights reserved to the Founder under this Clause 5 are in addition to, and not "
       "in substitution for, any rights of the Transferor as a shareholder under the "
       "Company&#8217;s MOA or Applicable Law.")

heading("6", "Completion, Notarisation and Registration")
clause("6.1", "Within 30 (thirty) business days following the later of (a) the occurrence of the "
       "Trigger Event and (b) the issuance of the Allocation Notice, the Parties shall complete the "
       "transfer of the Transfer Shares (&#8220;Completion&#8221;).")
clause("6.2", "At Completion, the Parties shall do all such acts and execute all such documents as "
       "are necessary under Applicable Law to give effect to the transfer, including: (a) executing "
       "an addendum to the Company&#8217;s Memorandum of Association reflecting the revised "
       "shareholding; (b) attending before a **Notary Public in Dubai** to notarise the share "
       "transfer and the MOA addendum; (c) procuring the issuance of an amended trade licence and "
       "the registration of the revised shareholding with the **DET**; and (d) updating the "
       "Company&#8217;s register of shareholders.")
clause("6.3", "The Company and each shareholder shall provide all consents, approvals, board and "
       "shareholder resolutions, powers of attorney and signatures reasonably required to effect "
       "Completion, and irrevocably undertake not to obstruct or delay Completion once the "
       "conditions in Clause 6.1 are satisfied.")
clause("6.4", "If any governmental, regulatory or DET approval is required for the transfer, the "
       "Parties shall co-operate in good faith to obtain it as soon as reasonably practicable.")

heading("7", "Post-Completion Governance: Reserved Control of the Transferor")
clause("7.1", "**Fundamental Condition; Retention of Absolute Decision-Making.** The Parties "
       "acknowledge and agree that, although the Transferor&#8217;s shareholding will reduce from "
       "70% to 49% upon Completion and the Transferees&#8217; combined holding will increase to "
       "51%, it is the express and fundamental intention of the Parties that the Transferor "
       "(acting by the Founder) shall **retain absolute decision-making power and control over "
       "the Company** at all times following Completion. This is a fundamental basis upon which "
       "the Transferor has agreed to transfer the Transfer Shares, and the Transferees would not "
       "have been offered, and shall not be entitled to receive or to retain, the Transfer Shares "
       "but for the arrangements set out in this Clause 7.")
clause("7.2", "**Irrevocable Voting Undertaking.** Each Transferee irrevocably undertakes and "
       "covenants to the Transferor that, in respect of every matter put to a vote of the "
       "shareholders of the Company (whether at an ordinary general assembly, an extraordinary "
       "general assembly, by written resolution or otherwise) and in respect of all consents, "
       "approvals and decisions of the shareholders, he shall: (a) vote (and procure that any "
       "proxy or representative on his behalf shall vote) all of the shares held by him strictly "
       "in accordance with the written instructions of the Transferor (acting by the Founder); "
       "and (b) abstain from voting where so instructed in writing by the Transferor.")
clause("7.3", "**Irrevocable Proxy and Power of Attorney.** As security for the undertaking in "
       "Clause 7.2, each Transferee shall, at Completion and from time to time thereafter at the "
       "request of the Transferor, execute an irrevocable proxy and power of attorney in favour "
       "of the Transferor (or its nominee) authorising the Transferor to attend, speak and vote "
       "at all meetings of the shareholders of the Company in respect of the Transferee&#8217;s "
       "shares, and to execute on the Transferee&#8217;s behalf any written resolution or "
       "shareholder consent. To the maximum extent permitted by Applicable Law, such proxy and "
       "power of attorney shall be **irrevocable and coupled with an interest**.")
clause("7.4", "**Casting / Deciding Vote.** Where, in respect of any matter requiring the consent "
       "or decision of the shareholders of the Company, the view of the Transferor differs from "
       "that of either or both of the Transferees, the **view of the Transferor shall prevail "
       "and shall constitute the binding decision of the shareholders**. The Parties shall "
       "procure that the amended MOA expressly confers upon the Transferor a casting / deciding "
       "vote to give effect to this Clause.")
clause("7.5", "**Sole Right to Appoint the General Manager.** The Transferor shall have the sole "
       "and exclusive right to nominate, appoint, re-appoint, remove and replace the General "
       "Manager (and any other manager, director or officer) of the Company, and to determine "
       "the terms of their appointment and remuneration. The Transferees shall vote in favour "
       "of, and shall not oppose, any such nomination, appointment, re-appointment, removal or "
       "replacement.")
clause("7.6", "**Reserved Matters.** Without limiting the generality of the foregoing, none of "
       "the following matters may be approved, undertaken or implemented by the Company, by any "
       "shareholder or by any manager, director or officer of the Company without the "
       "**prior written consent of the Transferor** (acting by the Founder): "
       "(a) any amendment to the MOA, articles or constitutional documents of the Company; "
       "(b) any increase, reduction, reorganisation or other change to the share capital of the "
       "Company; (c) the declaration or payment of any dividend or other distribution to "
       "shareholders; (d) the issuance, allotment, repurchase or redemption of any shares or "
       "other securities; (e) any merger, consolidation, demerger, liquidation, winding-up or "
       "dissolution of the Company; (f) any sale, lease, disposal or acquisition of assets or "
       "businesses outside the ordinary course of business; (g) any incurrence of borrowing, "
       "financial indebtedness, guarantee or surety, or the creation of any Encumbrance over the "
       "assets of the Company; (h) the entry into, amendment or termination of any related-party "
       "or affiliate transaction; (i) the approval of the annual budget, business plan and "
       "audited financial statements; (j) the appointment, removal or remuneration of the "
       "auditors and key management personnel; (k) the commencement, settlement or compromise of "
       "any litigation, arbitration or material claim; (l) any change to the nature, scope or "
       "location of the business activities of the Company; (m) the opening or closing of any "
       "bank account, or any change to authorised signatories thereto; and (n) any transfer, "
       "pledge or grant of any Encumbrance by a shareholder over its shares in the Company.")
clause("7.7", "**Entrenchment in the Memorandum of Association.** The Parties shall procure that, "
       "at Completion, the Company&#8217;s MOA is amended (and notarised before the Notary "
       "Public and registered with the DET) so as to reflect and entrench the arrangements set "
       "out in this Clause 7, including (i) the Transferor&#8217;s casting / deciding vote; "
       "(ii) the Transferor&#8217;s sole right to appoint and remove the General Manager; and "
       "(iii) the requirement that the Reserved Matters require the prior written consent of the "
       "Transferor. Where, by Applicable Law, any such entrenchment must take the form of "
       "weighted voting rights, super-majority requirements or a dedicated class of shares, the "
       "Parties shall co-operate in good faith to give effect to the same in the manner most "
       "likely to be enforceable under UAE law.")
clause("7.8", "**No Variation Without Founder Consent.** The arrangements in this Clause 7 are a "
       "fundamental condition of the transfer of the Transfer Shares and may not be varied, "
       "suspended or waived save with the prior written consent of the Transferor (acting by the "
       "Founder). Any purported variation or waiver in breach of this Clause shall be null and "
       "void.")
clause("7.9", "**Specific Performance.** The Parties acknowledge that damages would not be an "
       "adequate remedy for any breach of this Clause 7 and that the Transferor shall be "
       "entitled to seek specific performance, injunctive relief and any other equitable remedy "
       "available under Applicable Law.")
clause("7.10", "**Survival.** This Clause 7 shall take effect from Completion and shall continue "
       "in force for so long as the Transferor holds any shares in the Company.")

heading("8", "Consideration")
clause("8.1", "In consideration of the achievement of the Performance Threshold and the past and "
       "continuing performance and services of the Transferees, the Transfer Shares shall be "
       "transferred to the Transferees for an **aggregate nominal consideration of AED 1.00 (one "
       "UAE Dirham)** (or such nominal / par amount as the Notary Public may require to be "
       "stated), the receipt and adequacy of which the Transferor acknowledges.")
clause("8.2", "The Parties confirm that the transfer is by way of a **performance reward and "
       "incentive** and is not a sale at market value. Each Party shall bear its own tax "
       "position arising from the transfer and shall be responsible for obtaining its own "
       "independent tax advice (including in relation to UAE Corporate Tax and any applicable "
       "VAT).")
clause("8.3", "Nothing in this Clause 8 limits the Founder&#8217;s discretion under Clause 5 or "
       "the rights reserved to the Transferor under Clause 7, nor obliges the Transferor to "
       "transfer the Transfer Shares otherwise than in accordance with this Agreement.")

heading("9", "Waiver of Pre-emption Rights")
clause("9.1", "Each shareholder of the Company (including the Transferees) irrevocably and "
       "unconditionally **waives** any right of pre-emption, right of first refusal, tag-along, or "
       "similar right (whether arising under the CCL, the Company&#8217;s MOA or otherwise) to "
       "which it may be entitled in respect of the transfer of the Transfer Shares contemplated by "
       "this Agreement, and consents to such transfer.")
clause("9.2", "Each shareholder shall execute such waivers, consents and resolutions as may be "
       "required to confirm the foregoing for the purposes of notarisation and DET registration.")

heading("10", "Representations and Warranties")
clause("10.1", "Each Party represents and warrants to the others that: (a) it has the power and "
       "authority (and, where applicable, the requisite corporate authorisations) to enter into "
       "and perform this Agreement; (b) this Agreement constitutes its legal, valid and binding "
       "obligations; and (c) its entry into this Agreement does not breach any Applicable Law or "
       "any agreement binding upon it.")
clause("10.2", "The Transferor further represents and warrants that, as at the Effective Date, it "
       "is the legal and beneficial owner of 70% of the issued share capital of the Company, free "
       "from Encumbrances, and that the Transfer Shares will at Completion be transferred free "
       "from Encumbrances.")
clause("10.3", "Each Transferee acknowledges that, save as expressly set out in this Agreement, "
       "no representation, warranty or assurance has been given as to the future profitability or "
       "value of the Company or the Transfer Shares.")

heading("11", "Conduct Pending Completion")
clause("11.1", "From the Effective Date until Completion or termination of this Agreement, the "
       "Transferor shall not create any Encumbrance over, or transfer to any third party, the "
       "Transfer Shares in a manner that would prevent it from performing its obligations under "
       "this Agreement, save with the prior written consent of the Founder.")
clause("11.2", "Nothing in this Clause restricts the ordinary conduct of the business of the "
       "Company or the exercise by the Transferor of its rights as a 70% shareholder.")

heading("12", "Confidentiality")
clause("12.1", "Each Party shall keep confidential the terms of this Agreement and all "
       "information concerning the other Parties and the Company obtained in connection with it, "
       "and shall not disclose the same save: (a) as required by Applicable Law, a court or "
       "regulator (including the DET and the Notary Public); (b) to its professional advisers "
       "under a duty of confidence; or (c) with the prior written consent of the other Parties.")

heading("13", "Costs, Fees and Taxes")
clause("13.1", "Save as otherwise agreed in writing, the Transferor shall bear the Notary Public "
       "fees, DET amendment fees and registration costs directly arising from Completion, and "
       "each Party shall bear its own legal and advisory costs.")
clause("13.2", "Each Party shall be responsible for its own taxes (if any) arising from the "
       "transfer of the Transfer Shares.")

heading("14", "Term and Termination")
clause("14.1", "This Agreement takes effect on the Effective Date and continues until the earlier "
       "of (a) Completion and (b) termination in accordance with this Clause 14. The rights and "
       "obligations of the Transferor under Clause 7 shall, however, take effect from Completion "
       "and continue notwithstanding any termination thereafter, for so long as the Transferor "
       "holds any shares in the Company.")
clause("14.2", "This Agreement may be terminated by the written agreement of the Transferor and "
       "the Company, or by the Transferor (acting by the Founder) if the Performance Threshold "
       "has not been achieved and the Transferor reasonably determines that it is no longer "
       "capable of being achieved, in each case without liability save in respect of antecedent "
       "breaches.")
clause("14.3", "Clauses 1, 7, 12, 15 and 16 survive termination.")

heading("15", "Governing Law and Jurisdiction")
clause("15.1", "This Agreement and any non-contractual obligations arising out of or in "
       "connection with it are governed by, and shall be construed in accordance with, the "
       "**federal laws of the United Arab Emirates as applied in the Emirate of Dubai**.")
clause("15.2", "The Parties irrevocably submit to the **exclusive jurisdiction of the Courts of "
       "Dubai** in respect of any dispute arising out of or in connection with this Agreement, "
       "without prejudice to any mandatory requirement for notarisation or registration before "
       "the Notary Public and the DET.")
clause("15.3", "The Parties may, by written agreement, elect to refer any dispute instead to "
       "arbitration administered by the **Dubai International Arbitration Centre (DIAC)**, "
       "seated in Dubai and conducted in the English language.")

heading("16", "General Provisions")
clause("16.1", "**Entire Agreement.** This Agreement constitutes the entire agreement between "
       "the Parties in relation to its subject matter and supersedes all prior arrangements and "
       "understandings.")
clause("16.2", "**Amendments.** No amendment to this Agreement is effective unless in writing and "
       "signed by or on behalf of each Party; and any amendment to Clause 7 is further subject "
       "to Clause 7.8.")
clause("16.3", "**No Waiver.** No failure or delay in exercising any right operates as a waiver "
       "of it.")
clause("16.4", "**Severability.** If any provision is or becomes invalid or unenforceable, the "
       "remaining provisions continue in full force and the Parties shall negotiate in good faith "
       "to replace the invalid provision with a valid one of similar effect.")
clause("16.5", "**Assignment.** No Party may assign or transfer its rights or obligations under "
       "this Agreement without the prior written consent of the Transferor (acting by the "
       "Founder).")
clause("16.6", "**Further Assurance.** Each Party shall execute such further documents and do "
       "such further acts as may reasonably be required to give full effect to this Agreement, "
       "including the irrevocable proxies and powers of attorney referred to in Clause 7.3.")
clause("16.7", "**Counterparts.** This Agreement may be executed in any number of counterparts, "
       "each of which is an original and all of which together constitute one agreement.")
clause("16.8", "**Notices.** Notices under this Agreement shall be in writing and delivered by "
       "hand, courier or email to the addresses of the Parties set out in this Agreement (or as "
       "notified in writing from time to time).")
clause("16.9", "**Language.** This Agreement is executed in English. Where a notarised Arabic "
       "version is required for registration before the Notary Public and the DET, the Parties "
       "shall procure a certified Arabic translation; in the event of any conflict between the "
       "English and the notarised Arabic version, the **Arabic version shall prevail** for the "
       "purposes of registration before the Dubai authorities, and the English version shall "
       "otherwise govern the commercial intention of the Parties.")

# ================================================================ EXECUTION
section("Execution")
P("**IN WITNESS WHEREOF** the Parties have executed this Agreement on the date stated at the "
  "beginning of this Agreement.")
story.append(Spacer(1, 6))
sig_block("The Transferor", "PODOCARPUS REAL ESTATE LLC", "Name of Authorised Signatory")
sig_block("Acting by the Founder", "FOR AND ON BEHALF OF THE FOUNDER", "Name of Founder")
sig_block("The Company", "ORIZURU HOLIDAY HOMES LLC", "Name of Authorised Signatory")
sig_block("Transferee (1)", "MR. YSLAM ATAYEV", "Name")
sig_block("Transferee (2)", "MR. ORAZDURDY MAMIYEV", "Name")
P("Witnessed by: ______________________________ &nbsp; Name: ______________________________ "
  "&nbsp; Date: ____________", small)

# ================================================================ SCHEDULES
story.append(PageBreak())
section("Schedule 1 &#8212; Existing Shareholding (as at the Effective Date)")
data_table(
    ["Shareholder", "Shareholding %", "Role"],
    [["Podocarpus Real Estate LLC", "70%", "Majority shareholder / Transferor"],
     ["Mr. Yslam Atayev", "16%", "Minority shareholder / Transferee (1)"],
     ["Mr. Orazdurdy Mamiyev", "14%", "Minority shareholder / Transferee (2)"]],
    widths=[66, 35, 64], total=["Total", "100%", ""])

section("Schedule 2 &#8212; Determination of the Performance Threshold")
P("**1. Definition of Cumulative Gross Profit.** &#8220;Cumulative Gross Profit&#8221; means, as "
  "at any date of measurement, the aggregate of the Company&#8217;s gross profit accumulated from "
  "the commencement of the Company&#8217;s operations to that date, where gross profit for any "
  "period equals **total revenue actually realised and received by the Company** in respect of its "
  "holiday-homes / short-term rental and related activities, **less the direct cost of generating "
  "that revenue** (including owner payouts, OTA / platform commissions, cleaning, maintenance, "
  "utilities directly attributable to operated units, and similar direct costs).")
P("**2. Threshold composition.** The Performance Threshold is satisfied when Cumulative Gross "
  "Profit first equals or exceeds **AED 400,000**, deemed to comprise:")
data_table(
    ["Component", "Amount (AED)", "Purpose"],
    [["Capital Recovery Amount", "200,000", "Full recovery of the Initial Capital of AED 200,000"],
     ["Surplus Profit Amount", "200,000", "Additional profit generated for the Company"]],
    widths=[58, 40, 67], total=["Performance Threshold", "400,000", "Trigger Event arises"])
P("**3. Measurement.** Cumulative Gross Profit shall be determined from the Company&#8217;s books "
  "and records and certified by the Company&#8217;s accountant or auditor in the Threshold "
  "Certificate. The Founder may require independent verification under Clause 3.4. There is **no "
  "fixed deadline** for achieving the Performance Threshold.")
P("**4. Adjustments.** Extraordinary, non-recurring or non-operating items may be excluded from the "
  "calculation at the reasonable determination of the Founder, acting in good faith, to ensure the "
  "figure reflects genuine operating performance.")

section("Schedule 3 &#8212; Form of Allocation Notice")
P("[On the letterhead of Podocarpus Real Estate LLC]", ParagraphStyle(
    "it", parent=body, fontName="Times-Italic", textColor=GREY))
P("**ALLOCATION NOTICE**", body_l)
P("Date: ____ / ____ / 20____", body_l)
P("To: Mr. Yslam Atayev and Mr. Orazdurdy Mamiyev, and to Orizuru Holiday Homes LLC.")
P("We refer to the Share Transfer Agreement dated ____ / ____ / 20____ (the "
  "&#8220;Agreement&#8221;). Capitalised terms used in this notice have the meanings given in the "
  "Agreement.")
P("We confirm that the Trigger Event has occurred. Pursuant to Clauses 4 and 5 of the Agreement, "
  "the Founder has determined, in the Founder&#8217;s absolute and sole discretion and according to "
  "the respective performance of the Transferees, that the Transfer Shares (aggregating 21%) shall "
  "be allocated as follows:")
data_table(
    ["Transferee", "% of Company allocated (out of 21%)"],
    [["Mr. Yslam Atayev", "________ %"], ["Mr. Orazdurdy Mamiyev", "________ %"]],
    widths=[85, 80], total=["Total transferred", "21%"])
P("This Allocation Notice is final and binding in accordance with Clause 4.3 of the Agreement. The "
  "Parties shall proceed to Completion in accordance with Clause 6.")
story.append(Spacer(1, 8))
P("Signed for and on behalf of the Founder / Podocarpus Real Estate LLC:")
story.append(Spacer(1, 10))
P("____________________________________ &nbsp;&nbsp;&nbsp;&nbsp; Name: ____________________________",
  body_l)

section("Schedule 4 &#8212; Illustrative Resulting Shareholding (Non-Binding)")
P("The following scenarios are illustrative only and do not bind or fetter the Founder&#8217;s "
  "discretion under Clause 4. In every case Podocarpus moves from 70% to 49% (a reduction of 21%).")
P("**Scenario A &#8212; Split proportional to existing holdings (16:14):**", body_l)
data_table(
    ["Shareholder", "Before", "Transfer", "After"],
    [["Podocarpus Real Estate LLC", "70%", "&#8722; 21%", "49.0%"],
     ["Mr. Yslam Atayev", "16%", "+ 11.2%", "27.2%"],
     ["Mr. Orazdurdy Mamiyev", "14%", "+ 9.8%", "23.8%"]],
    widths=[70, 30, 32, 33], total=["Total", "100%", "", "100%"])
P("**Scenario B &#8212; Equal split (10.5% each):**", body_l)
data_table(
    ["Shareholder", "Before", "Transfer", "After"],
    [["Podocarpus Real Estate LLC", "70%", "&#8722; 21%", "49.0%"],
     ["Mr. Yslam Atayev", "16%", "+ 10.5%", "26.5%"],
     ["Mr. Orazdurdy Mamiyev", "14%", "+ 10.5%", "24.5%"]],
    widths=[70, 30, 32, 33], total=["Total", "100%", "", "100%"])
P("The actual allocation shall be as set out in the Allocation Notice (Schedule 3), determined by "
  "the Founder according to each Transferee&#8217;s respective performance.")

section("Schedule 5 &#8212; Information to be Completed Before Execution")
P("The following items, shown as [ &#9679; ] or blank lines in this Agreement, must be completed by "
  "the Parties (with their legal adviser) before signing and notarisation:")
items = [
    "Effective Date of the Agreement.",
    "Podocarpus Real Estate LLC &#8212; trade licence number and registered address.",
    "Orizuru Holiday Homes LLC &#8212; trade licence number and registered address.",
    "Full legal name of the Founder of Podocarpus, and passport / Emirates ID number.",
    "Mr. Yslam Atayev &#8212; passport / Emirates ID number, nationality and address.",
    "Mr. Orazdurdy Mamiyev &#8212; passport / Emirates ID number, nationality and address.",
    "Confirmation of the Company&#8217;s par value per share and total number of shares.",
    "Names and titles of the authorised signatories for each company.",
    "Whether disputes go to Dubai Courts (Clause 15.2) or DIAC arbitration (Clause 15.3).",
    "Whether to add a specific AED threshold to Reserved Matter 7.6(f) (asset disposals outside ordinary course).",
    "Confirmation that the amended MOA will entrench the Transferor&#8217;s casting vote, Reserved Matters and sole right to appoint the General Manager (Clause 7.7).",
    "Certified Arabic translation for notarisation and DET registration.",
]
for it in items:
    story.append(Paragraph(f"&#8226;&nbsp;&nbsp;{md(it)}",
                 ParagraphStyle("bul", parent=body, leftIndent=14, firstLineIndent=-10,
                                spaceAfter=3)))
story.append(Spacer(1, 10))
callout("Reminder",
        ["This is a binding commercial template. To be legally effective in Dubai, the share "
         "transfer must be notarised before a Dubai Notary Public and registered with the DET, with "
         "the MOA amended accordingly. Have a UAE-licensed lawyer review and finalise this document "
         "and prepare the Arabic notarised addendum prior to execution."])


# ---------------------------------------------------------------- page deco
def footer(canvas, doc_):
    canvas.saveState()
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(LIGHT)
    if doc_.page > 1:
        canvas.drawCentredString(A4[0] / 2, 16 * mm, "STRICTLY PRIVATE & CONFIDENTIAL")
        canvas.drawCentredString(
            A4[0] / 2, 12 * mm,
            f"Share Transfer Agreement — Orizuru Holiday Homes LLC   |   Page {doc_.page}")
    canvas.restoreState()


def cover(canvas, doc_):
    canvas.saveState()
    canvas.setStrokeColor(NAVY)
    canvas.setLineWidth(2)
    canvas.rect(12 * mm, 12 * mm, A4[0] - 24 * mm, A4[1] - 24 * mm)
    canvas.setStrokeColor(GOLD)
    canvas.setLineWidth(0.6)
    canvas.rect(15 * mm, 15 * mm, A4[0] - 30 * mm, A4[1] - 30 * mm)
    canvas.restoreState()


doc = BaseDocTemplate(OUT, pagesize=A4, topMargin=24 * mm, bottomMargin=24 * mm,
                      leftMargin=22 * mm, rightMargin=22 * mm, title="Share Transfer Agreement",
                      author="Podocarpus Real Estate LLC")
frame = Frame(doc.leftMargin, doc.bottomMargin, doc.width, doc.height, id="main")
cover_frame = Frame(28 * mm, 28 * mm, A4[0] - 56 * mm, A4[1] - 56 * mm, id="cover")
doc.addPageTemplates([
    PageTemplate(id="cover", frames=[cover_frame], onPage=cover),
    PageTemplate(id="main", frames=[frame], onPage=footer),
])

# first page uses cover template, then switch
story.insert(0, NextPageTemplate("main"))
doc.build(story)
print("Saved:", OUT)
