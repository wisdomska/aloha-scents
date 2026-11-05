import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Aloha Scents · Gifts that smell like love";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [font, gold, amber] = await Promise.all([
    readFile(join(process.cwd(), "src/app/_og/CormorantGaramond.ttf")),
    readFile(join(process.cwd(), "public/assets/hero-gold.png"), "base64"),
    readFile(join(process.cwd(), "public/assets/hero-amber.png"), "base64"),
  ]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        background: "radial-gradient(70% 60% at 50% 46%, #FBF7F2 0%, #F3E8DC 70%, #EBDACB 100%)",
        fontFamily: "Cormorant",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/png;base64,${gold}`}
        width={330}
        height={330}
        alt=""
        style={{ position: "absolute", left: -30, bottom: -40, transform: "rotate(-16deg)" }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/png;base64,${amber}`}
        width={350}
        height={350}
        alt=""
        style={{ position: "absolute", right: -40, bottom: -50, transform: "rotate(10deg)" }}
      />
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: -40 }}>
        <div style={{ fontSize: 22, letterSpacing: 8, color: "#6B3F35", textTransform: "uppercase" }}>Aloha Scents</div>
        <div style={{ fontSize: 104, lineHeight: 1, color: "#2E1A16", marginTop: 24, letterSpacing: -4 }}>
          Gifts that smell
        </div>
        <div style={{ display: "flex", fontSize: 104, lineHeight: 1, color: "#2E1A16", letterSpacing: -4 }}>
          like&nbsp;<span style={{ color: "#B4695A", fontStyle: "italic" }}>love.</span>
        </div>
        <div style={{ fontSize: 28, color: "#6B3F35", marginTop: 28 }}>
          Perfumes, oils &amp; gift sets · Accra, Ghana
        </div>
      </div>
    </div>,
    { ...size, fonts: [{ name: "Cormorant", data: font, style: "normal", weight: 400 }] },
  );
}
