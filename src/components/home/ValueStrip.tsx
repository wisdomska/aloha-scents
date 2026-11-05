export function ValueStrip() {
  return (
    <>
      <section
        aria-label="Why Aloha"
        style={{ background: "#2E1A16", color: "#F3E8DC", padding: "22px clamp(20px,4vw,48px)" }}
      >
        <ul
          style={{
            listStyle: "none",
            margin: "0 auto",
            padding: "0",
            maxWidth: "1200px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "14px clamp(24px,4vw,64px)",
            font: "400 15px/1.5 var(--font-body)",
          }}
        >
          <li data-reveal="" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#C99A5B"
                d="M12 0C12.6 7.2 16.8 11.4 24 12C16.8 12.6 12.6 16.8 12 24C11.4 16.8 7.2 12.6 0 12C7.2 11.4 11.4 7.2 12 0Z"
              />
            </svg>
            Matched to your budget
          </li>
          <li data-reveal="" data-d="80" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#C99A5B"
                d="M12 0C12.6 7.2 16.8 11.4 24 12C16.8 12.6 12.6 16.8 12 24C11.4 16.8 7.2 12.6 0 12C7.2 11.4 11.4 7.2 12 0Z"
              />
            </svg>
            Wrapped with a note, in your words
          </li>
          <li data-reveal="" data-d="160" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#C99A5B"
                d="M12 0C12.6 7.2 16.8 11.4 24 12C16.8 12.6 12.6 16.8 12 24C11.4 16.8 7.2 12.6 0 12C7.2 11.4 11.4 7.2 12 0Z"
              />
            </svg>
            5% of every bottle feeds a child
          </li>
        </ul>
      </section>
    </>
  );
}
