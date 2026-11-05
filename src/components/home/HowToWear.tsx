"use client";

import { Fragment } from "react";
import { WEAR } from "@/content/site";
import { useCarousel } from "@/hooks/useCarousel";

export function HowToWear() {
  const wearSteps = WEAR.map((w, i) => ({
    ...w,
    n: "0" + (i + 1),
    d: String(i * 80),
    alt: "Placeholder illustration: " + w.ill,
  }));
  const { onScroll: carScroll, dots: wearDots } = useCarousel(WEAR.length);

  return (
    <>
      <section
        id="wear"
        aria-labelledby="wear-title"
        style={{ background: "#F3E8DC", padding: "clamp(64px,8vw,120px) clamp(20px,4vw,48px)" }}
      >
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <div data-reveal="" style={{ maxWidth: "38em" }}>
            <p
              style={{
                margin: "0",
                font: "600 12px/1.2 var(--font-body)",
                letterSpacing: ".3em",
                textTransform: "uppercase",
                color: "#6B3F35",
              }}
            >
              A small ritual
            </p>{" "}
            <h2
              id="wear-title"
              style={{
                margin: "14px 0 0",
                font: "300 clamp(32px,2.4vw + 14px,48px)/1.1 var(--font-display)",
                color: "#2E1A16",
                letterSpacing: "-.05em",
              }}
            >
              How to wear perfume oils
            </h2>{" "}
            <p
              style={{
                margin: "14px 0 0",
                font: "400 clamp(16px,.4vw + 14.5px,18px)/1.6 var(--font-body)",
                color: "#6B3F35",
              }}
            >
              Oils sit close to the skin and warm with you. A drop or two is all it takes.
            </p>
          </div>{" "}
          <ol
            className="carousel"
            data-car="wear"
            onScroll={carScroll}
            style={{
              listStyle: "none",
              display: "grid",
              scrollbarWidth: "none",
              overscrollBehaviorX: "contain",
              WebkitOverflowScrolling: "touch",
              gap: "clamp(14px,2vw,28px)",
              marginTop: "clamp(28px,4vw,44px)",
              marginBottom: "0",
            }}
          >
            {wearSteps.map((w, i) => (
              <Fragment key={i}>
                <li
                  data-reveal=""
                  data-d={w.d}
                  style={{
                    scrollSnapAlign: "start",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px",
                    padding: "12px 12px 18px",
                    background: "#FBF7F2",
                    borderRadius: "22px",
                  }}
                >
                  <div
                    role="img"
                    aria-label={w.alt}
                    style={{
                      aspectRatio: "4/3",
                      borderRadius: "10px",
                      background: "repeating-linear-gradient(135deg, #F3E8DC 0 10px, #EFE0D1 10px 20px)",
                      display: "grid",
                      placeItems: "center",
                    }}
                  >
                    <span
                      style={{
                        font: "500 10px/1.3 ui-monospace,Menlo,monospace",
                        color: "#6B3F35",
                        textAlign: "center",
                        padding: "0 12px",
                      }}
                    >
                      ILLUSTRATION ·<br />
                      {w.ill}
                    </span>
                  </div>{" "}
                  <p style={{ margin: "0", font: "300 34px/1 var(--font-display)", color: "#B4695A" }}>{w.n}</p>{" "}
                  <h3
                    style={{
                      margin: "0",
                      font: "600 19px/1.25 var(--font-display)",
                      color: "#2E1A16",
                      letterSpacing: "-.05em",
                    }}
                  >
                    {w.t}
                  </h3>{" "}
                  <p style={{ margin: "0", font: "400 15px/1.6 var(--font-body)", color: "#6B3F35" }}>{w.b}</p>
                </li>
              </Fragment>
            ))}
          </ol>{" "}
          <div className="only-mob">
            <div aria-hidden="true" style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "6px" }}>
              {wearDots.map((d, i) => (
                <Fragment key={i}>
                  <span
                    style={{
                      height: "6px",
                      width: d.w,
                      borderRadius: "3px",
                      background: d.bg,
                      transition: "width 300ms cubic-bezier(.23,1,.32,1), background-color 300ms ease",
                    }}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
