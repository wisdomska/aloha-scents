import Link from "next/link";

export default function NotFound() {
  return (
    <section
      style={{
        background: "#F3E8DC",
        padding: "calc(clamp(40px,6vw,88px) + 40px) clamp(20px,4vw,48px) clamp(64px,8vw,120px)",
        textAlign: "center",
      }}
    >
      <p
        style={{
          margin: 0,
          font: "600 12px/1.2 var(--font-body)",
          letterSpacing: ".3em",
          textTransform: "uppercase",
          color: "#6B3F35",
        }}
      >
        Page not found
      </p>
      <h1
        style={{
          margin: "16px 0 0",
          font: "300 clamp(44px,4vw + 14px,76px)/1.04 var(--font-display)",
          color: "#2E1A16",
          letterSpacing: "-.05em",
        }}
      >
        This scent has <em style={{ fontStyle: "italic", color: "#B4695A" }}>drifted away.</em>
      </h1>
      <p style={{ margin: "18px auto 0", maxWidth: "32em", font: "400 17px/1.6 var(--font-body)", color: "#6B3F35" }}>
        The page you&apos;re looking for doesn&apos;t exist. Let&apos;s get you back to the gifts.
      </p>
      <Link
        href="/"
        className="ix-h4 ix-a3"
        style={{
          marginTop: 28,
          display: "inline-flex",
          alignItems: "center",
          minHeight: 54,
          padding: "0 30px",
          borderRadius: 999,
          backgroundColor: "#2E1A16",
          backgroundImage:
            "linear-gradient(105deg, transparent 38%, rgba(201,154,91,.5) 47%, rgba(180,105,90,.7) 52%, transparent 62%)",
          backgroundSize: "260% 100%",
          backgroundPosition: "120% 0",
          backgroundRepeat: "no-repeat",
          color: "#FBF7F2",
          font: "500 16px var(--font-body)",
          textDecoration: "none",
          transition:
            "background-position 800ms cubic-bezier(.23,1,.32,1), transform 180ms cubic-bezier(.34,1.56,.64,1)",
        }}
      >
        Back to home
      </Link>
    </section>
  );
}
