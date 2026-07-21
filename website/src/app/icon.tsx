import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 14,
        }}
      >
        <svg width="48" height="48" viewBox="0 0 120 120" fill="none">
          <path
            d="M 98.07 77.75 A 42 42 0 1 1 98.07 42.25"
            stroke="#5FC8B6"
            strokeWidth={15}
            strokeLinecap="round"
          />
          <path d="M 102 60 L 65 60" stroke="#5FC8B6" strokeWidth={15} strokeLinecap="round" />
          <path
            d="M 72 39 A 24 19 0 1 1 72 77"
            stroke="#4361C9"
            strokeWidth={15}
            strokeLinecap="round"
          />
          <path d="M 73 39 L 61 105" stroke="#4361C9" strokeWidth={15} strokeLinecap="round" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
