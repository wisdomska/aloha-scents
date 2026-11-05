export function GiftsIntro() {
  return (
    <>
      <section
        aria-labelledby="gifts-page-title"
        style={{ background: "#F3E8DC", padding: "clamp(40px,6vw,88px) clamp(20px,4vw,48px) 8px" }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <p
            style={{
              margin: "0",
              font: "600 12px/1.2 var(--font-body)",
              letterSpacing: ".3em",
              textTransform: "uppercase",
              color: "#6B3F35",
              animation: "riseIn 600ms cubic-bezier(.23,1,.32,1) both",
            }}
          >
            Gift sets & catalogue
          </p>{" "}
          <h1
            id="gifts-page-title"
            style={{
              margin: "16px 0 0",
              maxWidth: "12em",
              font: "300 clamp(44px,4vw + 14px,76px)/1.04 var(--font-display)",
              color: "#2E1A16",
              textWrap: "balance",
              animation: "riseIn 700ms cubic-bezier(.23,1,.32,1) 80ms both",
              letterSpacing: "-.05em",
            }}
          >
            Find the gift, <em style={{ fontStyle: "italic", color: "#B4695A" }}>or the scent.</em>
          </h1>{" "}
          <p
            style={{
              margin: "18px 0 0",
              maxWidth: "36em",
              font: "400 clamp(16px,.4vw + 14.5px,18px)/1.6 var(--font-body)",
              color: "#6B3F35",
              textWrap: "pretty",
              animation: "riseIn 600ms cubic-bezier(.23,1,.32,1) 160ms both",
            }}
          >
            Every set leaves wrapped, with a handwritten or voice note. Prices are ranges, and we&apos;ll always match
            within yours.
          </p>
        </div>
      </section>
    </>
  );
}
