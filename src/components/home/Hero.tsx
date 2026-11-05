"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type PointerEvent } from "react";
import { useSite } from "@/components/providers/SiteProvider";
import { useBottleFlight } from "@/hooks/useBottleFlight";
import { useMist } from "@/hooks/useMist";

export function Hero() {
  const { goFinder } = useSite();
  const { mistRef, emitRef } = useMist();
  const lastEmit = useRef(0);
  const heroRef = useRef<HTMLElement>(null);
  const flyRef = useRef<HTMLDivElement>(null);
  useBottleFlight(flyRef, heroRef, "finder-card");

  const heroMove = (e: PointerEvent<HTMLElement>) => {
    if (!emitRef.current) return;
    const now = performance.now();
    if (now - lastEmit.current < 70) return;
    lastEmit.current = now;
    emitRef.current(e.movementX > 0 ? 0.3 : -0.15);
  };
  const buildSet = goFinder(null, 0);
  const findScent = goFinder("me", 1);

  return (
    <>
      <section
        id="home"
        ref={heroRef}
        aria-labelledby="hero-title"
        data-sparkle-zone=""
        onPointerMove={heroMove}
        style={{
          position: "relative",
          zIndex: "5",
          // x is always clipped; y opens up while the gold bottle flies down to the scent finder.
          overflowX: "clip",
          overflowY: "hidden",
          isolation: "isolate",
          "--sy": "0",
          background: "radial-gradient(70% 60% at 50% 46%, #FBF7F2 0%, #F3E8DC 70%, #EBDACB 100%)",
        }}
      >
        <canvas
          ref={mistRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: "20%",
            top: "10%",
            width: "60%",
            height: "80%",
            pointerEvents: "none",
            zIndex: "0",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: "1",
            maxWidth: "880px",
            margin: "0 auto",
            padding: "calc(clamp(44px,9vw,130px) + 88px) clamp(20px,4vw,48px) clamp(150px,11vw,150px)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p
            style={{
              margin: "0",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              font: "600 12px/1.2 var(--font-body)",
              letterSpacing: ".3em",
              textTransform: "uppercase",
              color: "#6B3F35",
              animation: "riseIn 600ms cubic-bezier(.23,1,.32,1) 200ms both",
            }}
          >
            <span aria-hidden="true" style={{ width: "12px", height: "12px", display: "block" }}>
              <svg viewBox="0 0 24 24" width="100%" height="100%">
                <path
                  fill="#C99A5B"
                  d="M12 0C12.6 7.2 16.8 11.4 24 12C16.8 12.6 12.6 16.8 12 24C11.4 16.8 7.2 12.6 0 12C7.2 11.4 11.4 7.2 12 0Z"
                />
              </svg>
            </span>{" "}
            Unveil your essence{" "}
            <span aria-hidden="true" style={{ width: "12px", height: "12px", display: "block" }}>
              <svg viewBox="0 0 24 24" width="100%" height="100%">
                <path
                  fill="#C99A5B"
                  d="M12 0C12.6 7.2 16.8 11.4 24 12C16.8 12.6 12.6 16.8 12 24C11.4 16.8 7.2 12.6 0 12C7.2 11.4 11.4 7.2 12 0Z"
                />
              </svg>
            </span>
          </p>{" "}
          <div style={{ position: "relative", marginTop: "22px" }}>
            <h1
              id="hero-title"
              style={{
                position: "relative",
                zIndex: "1",
                margin: "0",
                font: "400 clamp(46px,6.8vw + 8px,124px)/.98 var(--font-display)",
                color: "#2E1A16",
                letterSpacing: "-.05em",
              }}
            >
              <span style={{ display: "block", animation: "riseIn 700ms cubic-bezier(.23,1,.32,1) 300ms both" }}>
                Gifts that smell
              </span>{" "}
              <span style={{ display: "block", animation: "riseIn 700ms cubic-bezier(.23,1,.32,1) 390ms both" }}>
                like <em style={{ fontStyle: "italic", color: "#B4695A" }}>love.</em>
              </span>
            </h1>
          </div>{" "}
          <p
            style={{
              margin: "26px 0 0",
              maxWidth: "31em",
              font: "400 clamp(16px,.4vw + 14.5px,18px)/1.6 var(--font-body)",
              color: "#6B3F35",
              textWrap: "pretty",
              animation: "riseIn 600ms cubic-bezier(.23,1,.32,1) 480ms both",
            }}
          >
            Tell us who it&apos;s for. We&apos;ll match a scent to their style and your budget, then wrap it with a
            handwritten note.
          </p>{" "}
          <div
            style={{
              width: "100%",
              maxWidth: "460px",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "12px",
              marginTop: "clamp(26px,3vw,34px)",
              animation: "riseIn 600ms cubic-bezier(.23,1,.32,1) 560ms both",
            }}
          >
            <Link
              className="ix-h4 ix-a3"
              href="/#finder"
              onClick={buildSet}
              style={{
                flex: "1 1 190px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                minHeight: "54px",
                padding: "0 30px",
                borderRadius: "999px",
                backgroundColor: "#2E1A16",
                backgroundImage:
                  "linear-gradient(105deg, transparent 38%, rgba(201,154,91,.5) 47%, rgba(180,105,90,.7) 52%, transparent 62%)",
                backgroundSize: "260% 100%",
                backgroundPosition: "120% 0",
                backgroundRepeat: "no-repeat",
                color: "#FBF7F2",
                font: "500 16px var(--font-body)",
                textDecoration: "none",
                boxShadow: "0 18px 30px -18px rgba(46,26,22,.6)",
                transition:
                  "background-position 800ms cubic-bezier(.23,1,.32,1), transform 180ms cubic-bezier(.34,1.56,.64,1)",
              }}
            >
              Build a gift set
            </Link>{" "}
            <Link
              className="ix-h5 ix-a3"
              href="/#finder"
              onClick={findScent}
              style={{
                flex: "1 1 170px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "54px",
                padding: "0 28px",
                borderRadius: "999px",
                border: "1px solid rgba(46,26,22,.28)",
                background: "rgba(251,247,242,.6)",
                color: "#2E1A16",
                font: "500 16px var(--font-body)",
                textDecoration: "none",
                transition:
                  "background-color 200ms ease, border-color 200ms ease, transform 180ms cubic-bezier(.34,1.56,.64,1)",
              }}
            >
              Find my scent
            </Link>
          </div>{" "}
          <p
            style={{
              margin: "26px 0 0",
              font: "400 14px/1.6 var(--font-body)",
              color: "#6B3F35",
              textWrap: "balance",
              animation: "fadeIn 600ms ease 700ms both",
            }}
          >
            Perfumes from Dubai and around the world · perfume oils · body splashes · gift sets
          </p>
        </div>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            zIndex: "3",
            left: "clamp(150px,26vw,520px)",
            top: "clamp(40px,8vw,150px)",
            width: "22px",
            height: "22px",
            animation: "twinkle 3.6s ease-in-out 1.2s infinite",
          }}
        >
          <svg viewBox="0 0 24 24" width="100%" height="100%">
            <path
              fill="#C99A5B"
              d="M12 0C12.6 7.2 16.8 11.4 24 12C16.8 12.6 12.6 16.8 12 24C11.4 16.8 7.2 12.6 0 12C7.2 11.4 11.4 7.2 12 0Z"
            />
          </svg>
        </div>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            zIndex: "3",
            right: "clamp(170px,28vw,560px)",
            bottom: "clamp(60px,10vw,200px)",
            width: "16px",
            height: "16px",
            animation: "twinkle 4.2s ease-in-out 2s infinite",
          }}
        >
          <svg viewBox="0 0 24 24" width="100%" height="100%">
            <path
              fill="#C99A5B"
              d="M12 0C12.6 7.2 16.8 11.4 24 12C16.8 12.6 12.6 16.8 12 24C11.4 16.8 7.2 12.6 0 12C7.2 11.4 11.4 7.2 12 0Z"
            />
          </svg>
        </div>
        <div
          ref={flyRef}
          style={{
            position: "absolute",
            zIndex: "2",
            left: "max(-4vw, calc(50% - 680px))",
            bottom: "clamp(-20px,1vw,24px)",
            width: "clamp(150px,28vw,470px)",
            pointerEvents: "none",
            willChange: "transform",
          }}
        >
          <div style={{ animation: "heroDrop 1100ms cubic-bezier(.23,1,.32,1) 150ms both" }}>
            <div>
              <Image
                width={1000}
                height={1000}
                sizes="(max-width: 600px) 30vw, 500px"
                loading="eager"
                fetchPriority="high"
                src="/assets/hero-gold.png"
                alt="A gold, sculpted perfume bottle with a marbled stopper"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  transform: "rotate(-16deg)",
                  filter: "drop-shadow(0 40px 34px rgba(46,26,22,.32)) drop-shadow(0 8px 10px rgba(46,26,22,.18))",
                }}
              />
            </div>
          </div>{" "}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "20%",
              right: "20%",
              bottom: "-6%",
              height: "22px",
              borderRadius: "50%",
              background: "radial-gradient(closest-side, rgba(46,26,22,.28), transparent)",
              filter: "blur(6px)",
              zIndex: "-1",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            zIndex: "2",
            right: "max(-4vw, calc(50% - 700px))",
            bottom: "clamp(-30px,0vw,16px)",
            width: "clamp(160px,30vw,500px)",
            pointerEvents: "none",
            transform: "translate3d(0, calc(var(--sy) * -0.6px), 0) rotate(calc(var(--sy) * 0.015deg))",
            willChange: "transform",
          }}
        >
          <div style={{ animation: "heroDrop 1100ms cubic-bezier(.23,1,.32,1) 300ms both" }}>
            <div>
              <Image
                width={1000}
                height={1000}
                sizes="(max-width: 600px) 30vw, 500px"
                loading="eager"
                fetchPriority="high"
                src="/assets/hero-amber.png"
                alt="An amber faceted perfume bottle with a gold collar"
                style={{
                  display: "block",
                  width: "100%",
                  height: "auto",
                  transform: "rotate(10deg)",
                  filter: "drop-shadow(0 46px 38px rgba(46,26,22,.36)) drop-shadow(0 10px 12px rgba(46,26,22,.2))",
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
