"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en-MY">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#FFFFFF", color: "#28314E" }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            padding: "2rem",
          }}
        >
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700 }}>GajiPay hit an unexpected error</h1>
          <p style={{ marginTop: "0.75rem", color: "#5B6478", maxWidth: 380 }}>
            Please try again. If this keeps happening, contact hello@gajipay.my.
          </p>
          <button
            onClick={reset}
            style={{
              marginTop: "2rem",
              height: "3.5rem",
              padding: "0 2rem",
              borderRadius: "999px",
              background: "#28314E",
              color: "#FFFFFF",
              border: "none",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
