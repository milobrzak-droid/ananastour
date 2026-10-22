"use client";

/**
 * Last-resort error boundary: replaces the whole root layout, so there is no
 * CSS, no fonts and no components — inline styles only, both languages at once.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  void error;
  const button: React.CSSProperties = {
    display: "inline-block",
    padding: "12px 24px",
    borderRadius: 999,
    fontWeight: 600,
    fontSize: 16,
    border: 0,
    cursor: "pointer",
    textDecoration: "none",
  };
  return (
    <html lang="uk">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e7a74",
          color: "#1d2440",
          fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
          padding: 16,
        }}
      >
        <main style={{ background: "#fdf8ef", borderRadius: 32, padding: "48px 32px", maxWidth: 560, textAlign: "center" }}>
          <p aria-hidden style={{ fontSize: 48, margin: 0 }}>
            🍍
          </p>
          <h1 style={{ fontSize: 26, margin: "16px 0 8px" }}>Щось пішло не так</h1>
          <p style={{ margin: "0 0 20px", opacity: 0.8 }}>
            Сайт тимчасово не працює. Спробуйте ще раз або напишіть нам у Telegram.
          </p>
          <h2 style={{ fontSize: 18, margin: "0 0 4px" }}>Něco se pokazilo</h2>
          <p style={{ margin: "0 0 24px", opacity: 0.8 }}>Web dočasně nefunguje. Zkuste to znovu, nebo nám napište na Telegram.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button type="button" onClick={() => reset()} style={{ ...button, background: "#1d2440", color: "#fdf8ef" }}>
              Спробувати ще раз / Zkusit znovu
            </button>
            <a href="https://t.me/Ananas_tours" style={{ ...button, background: "#1a78ad", color: "#ffffff" }}>
              Telegram
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
