# Orizuru Holiday Homes LLC — Conditional Share Transfer Agreement

Binding template agreement for the conditional, performance-based transfer of **21%**
of Orizuru Holiday Homes LLC from **Podocarpus Real Estate LLC** to the two minority
shareholders, **Mr. Yslam Atayev** and **Mr. Orazdurdy Mamiyev**.

## Deliverables

| File | Description |
|---|---|
| `Orizuru_Share_Transfer_Agreement.docx` | Editable Word edition |
| `Orizuru_Share_Transfer_Agreement.pdf` | Print/sign-ready PDF edition |
| `generate_agreement.py` | Script that builds the DOCX (python-docx) |
| `generate_pdf.py` | Script that builds the PDF (reportlab) |

## Key commercial terms captured

- **Parties:** Podocarpus (Transferor) and Orizuru (the Company) as principal
  counterparties; the two individuals join as Transferees (they must sign to receive shares).
- **Trigger (Performance Threshold):** Cumulative Gross Profit of **AED 400,000** —
  AED 200,000 to recover the Initial Capital + AED 200,000 surplus profit. **No fixed deadline.**
- **Allocation of the 21%:** Determined by the **Founder of Podocarpus in absolute and
  sole discretion**, according to each Transferee's performance, recorded in an Allocation
  Notice (Schedule 3). No fixed split is locked in.
- **Consideration:** Nominal (AED 1.00) — a performance reward, not a market-value sale.
- **Governing law:** UAE federal law as applied in Dubai (CCL — Federal Decree-Law
  No. 32 of 2021); exclusive jurisdiction of the Dubai Courts, with optional DIAC arbitration.
- **Completion:** Notarisation before a Dubai Notary Public, MOA amendment, and DET
  registration.

## Before signing

This is a template. To be legally effective on Dubai mainland, the transfer must be
**notarised before a Dubai Notary Public** and **registered with the Department of
Economy and Tourism (DET)**, with the MOA amended. Have a UAE-licensed lawyer review and
finalise it (and prepare the Arabic notarised addendum). Items to complete are listed in
**Schedule 5** of the agreement (`[ ● ]` placeholders).

## Regenerating

```bash
pip install python-docx reportlab
python3 generate_agreement.py   # -> .docx
python3 generate_pdf.py         # -> .pdf
```
