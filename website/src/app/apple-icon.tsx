import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const iconDataUrl = (() => {
  const filePath = join(process.cwd(), "public", "brand", "gajipay-icon.png");
  const base64 = readFileSync(filePath).toString("base64");
  return `data:image/png;base64,${base64}`;
})();

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFFFFF",
        }}
      >
        <img src={iconDataUrl} width={148} height={148} alt="" />
      </div>
    ),
    { ...size },
  );
}
