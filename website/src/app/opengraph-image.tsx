import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "GajiPay — Modern payroll platform built for Malaysian businesses";

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
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 32,
              background: "linear-gradient(135deg, #A1FEEF 0%, #658AE4 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 64,
              fontWeight: 700,
              color: "#28314E",
            }}
          >
            GP
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 76, fontWeight: 700, color: "#28314E", letterSpacing: -1 }}>GajiPay</span>
            <span style={{ fontSize: 26, color: "#5B6478", letterSpacing: 2, textTransform: "uppercase" }}>
              Pay Earned &middot; Live Empowered
            </span>
          </div>
        </div>
        <div style={{ marginTop: 44, fontSize: 32, color: "#28314E", textAlign: "center", maxWidth: 900 }}>
          Modern payroll platform, built for Malaysian businesses
        </div>
      </div>
    ),
    { ...size },
  );
}
