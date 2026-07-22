import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "GajiPay — Modern payroll platform built for Malaysian businesses";

const logoDataUrl = (() => {
  const filePath = join(process.cwd(), "public", "brand", "gajipay-logo-trimmed.png");
  const base64 = readFileSync(filePath).toString("base64");
  return `data:image/png;base64,${base64}`;
})();

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #FFFFFF 0%, #EAFBF7 45%, #E5EBFB 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <img src={logoDataUrl} width={260} height={300} alt="" />
        <div style={{ marginTop: 32, fontSize: 32, color: "#28314E", textAlign: "center", maxWidth: 900 }}>
          Modern payroll platform, built for Malaysian businesses
        </div>
      </div>
    ),
    { ...size },
  );
}
