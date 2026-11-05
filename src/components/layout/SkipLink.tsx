export function SkipLink() {
  return (
    <>
      <a
        className="ix-f0"
        href="#main"
        style={{
          position: "fixed",
          left: "16px",
          top: "12px",
          zIndex: "100",
          padding: "12px 18px",
          background: "#2E1A16",
          color: "#FBF7F2",
          borderRadius: "999px",
          font: "500 15px var(--font-body)",
          textDecoration: "none",
          transform: "translateY(-200%)",
          transition: "transform 200ms ease",
        }}
      >
        Skip to content
      </a>
    </>
  );
}
