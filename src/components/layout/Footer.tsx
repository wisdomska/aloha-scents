"use client";

import Image from "next/image";
import { Fragment, type PointerEvent } from "react";
import Link from "next/link";
import { useNav, useWhatsApp } from "@/hooks/useNav";

export function Footer() {
  const nav = useNav();
  const { fabHref, headerWaClick } = useWhatsApp();
  /** Spotlight that lights the big ALOHA wordmark under the pointer. */
  const footSpot = (e: PointerEvent<HTMLElement>) => {
    const ft = e.currentTarget;
    const sp = ft.querySelector("[data-spot]");
    if (!sp) return;
    const r = sp.getBoundingClientRect();
    ft.style.setProperty("--mx", e.clientX - r.left + "px");
    ft.style.setProperty("--my", e.clientY - r.top + "px");
    ft.style.setProperty("--spot", "1");
  };
  const footSpotOff = (e: PointerEvent<HTMLElement>) => e.currentTarget.style.setProperty("--spot", "0");

  return (
    <>
      <footer
        id="site-footer"
        onPointerMove={footSpot}
        onPointerLeave={footSpotOff}
        style={{
          "--fy": "0",
          "--spot": "0",
          "--mx": "50%",
          "--my": "50%",
          position: "relative",
          overflow: "hidden",
          isolation: "isolate",
          background:
            "radial-gradient(60% 70% at 45% 100%, #57342B 0%, transparent 70%), linear-gradient(180deg, #2A1714 0%, #33201B 55%, #3E2620 100%)",
          color: "#F3E8DC",
          padding: "clamp(48px,4vw,72px) clamp(20px,4vw,48px) var(--foot-pad-b)",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: "2",
            maxWidth: "760px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "14px 20px",
            }}
          >
            <Image
              width={572}
              height={138}
              src="/assets/logo-horizontal-sand.png"
              alt="Aloha Scents"
              style={{ display: "block", height: "clamp(38px,3vw,46px)", width: "auto" }}
            />{" "}
            <span
              aria-hidden="true"
              style={{
                display: "var(--foot-div)",
                width: "1px",
                alignSelf: "stretch",
                minHeight: "40px",
                background: "rgba(243,232,220,.3)",
              }}
            />{" "}
            <p
              style={{
                margin: "0",
                flex: "none",
                whiteSpace: "nowrap",
                textAlign: "var(--foot-tag-align)" as React.CSSProperties["textAlign"],
                font: "400 clamp(17px,.4vw + 14px,20px)/1.25 var(--font-display)",
                color: "#F3E8DC",
              }}
            >
              Someone on your mind?
              <br />
              <em style={{ fontStyle: "italic" }}>Let&apos;s find their scent</em>
            </p>
          </div>{" "}
          <div
            aria-hidden="true"
            style={{
              width: "100%",
              height: "1px",
              margin: "clamp(26px,2.6vw,36px) 0 clamp(18px,1.8vw,26px)",
              background: "rgba(243,232,220,.18)",
            }}
          />{" "}
          <nav
            aria-label="Footer"
            style={{
              marginBottom: "clamp(8px,1vw,14px)",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "0 clamp(16px,2.4vw,28px)",
            }}
          >
            <p
              style={{
                margin: "0",
                flex: "none",
                minHeight: "44px",
                display: "flex",
                alignItems: "center",
                font: "700 13px/1.2 var(--font-body)",
                letterSpacing: ".02em",
                textTransform: "uppercase",
                color: "#FBF7F2",
              }}
            >
              Explore:
            </p>
            <ul
              style={{
                listStyle: "none",
                margin: "0",
                padding: "0",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: "0 clamp(16px,2.4vw,28px)",
              }}
            >
              {nav.map((n, i) => (
                <Fragment key={i}>
                  <li>
                    <Link
                      className="ix-hf"
                      href={n.href}
                      onClick={n.onClick}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        minHeight: "44px",
                        color: "#E9DCD3",
                        font: "400 15px/1.3 var(--font-body)",
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                        transition: "color 200ms ease",
                      }}
                    >
                      {n.label}
                    </Link>
                  </li>
                </Fragment>
              ))}
            </ul>
          </nav>{" "}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "center",
              gap: "0 clamp(16px,2.4vw,28px)",
            }}
          >
            <p
              style={{
                margin: "0",
                flex: "none",
                minHeight: "44px",
                display: "flex",
                alignItems: "center",
                font: "700 13px/1.2 var(--font-body)",
                letterSpacing: ".02em",
                textTransform: "uppercase",
                color: "#FBF7F2",
              }}
            >
              Talk to us:
            </p>{" "}
            <ul
              style={{
                listStyle: "none",
                margin: "0",
                padding: "0",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "center",
                gap: "0 clamp(16px,2.4vw,28px)",
              }}
            >
              <li>
                <a
                  className="ix-hf"
                  href={fabHref}
                  target="_blank"
                  rel="noopener"
                  onClick={headerWaClick}
                  aria-label="WhatsApp +233 595 873 933 (opens WhatsApp)"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    minHeight: "44px",
                    color: "#E9DCD3",
                    font: "400 15px/1.3 var(--font-body)",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    transition: "color 200ms ease",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "none",
                      display: "block",
                      width: "18px",
                      height: "18px",
                      backgroundColor: "currentColor",
                      WebkitMask: "url(/assets/icons/whatsapp.svg) center / contain no-repeat",
                      mask: "url(/assets/icons/whatsapp.svg) center / contain no-repeat",
                    }}
                  />
                  +233 595 873 933
                </a>
              </li>
              <li>
                <a
                  className="ix-hf"
                  href="https://instagram.com/_alohascents"
                  target="_blank"
                  rel="noopener"
                  aria-label="Instagram @_alohascents"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    minHeight: "44px",
                    color: "#E9DCD3",
                    font: "400 15px/1.3 var(--font-body)",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    transition: "color 200ms ease",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "none",
                      display: "block",
                      width: "18px",
                      height: "18px",
                      backgroundColor: "currentColor",
                      WebkitMask: "url(/assets/icons/instagram.svg) center / contain no-repeat",
                      mask: "url(/assets/icons/instagram.svg) center / contain no-repeat",
                    }}
                  />
                  @_alohascents
                </a>
              </li>
              <li>
                <a
                  className="ix-hf"
                  href="https://www.tiktok.com/@_alohascentsgh"
                  target="_blank"
                  rel="noopener"
                  aria-label="TikTok @_alohascentsgh"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    minHeight: "44px",
                    color: "#E9DCD3",
                    font: "400 15px/1.3 var(--font-body)",
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    transition: "color 200ms ease",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flex: "none",
                      display: "block",
                      width: "18px",
                      height: "18px",
                      backgroundColor: "currentColor",
                      WebkitMask: "url(/assets/icons/tiktok.svg) center / contain no-repeat",
                      mask: "url(/assets/icons/tiktok.svg) center / contain no-repeat",
                    }}
                  />
                  @_alohascentsgh
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div
          aria-hidden="true"
          style={{
            position: "relative",
            zIndex: "0",
            height: "clamp(140px,22vw,400px)",
            marginTop: "clamp(16px,2vw,40px)",
          }}
        >
          <p
            style={{
              position: "absolute",
              left: "50%",
              bottom: "clamp(8px,2.4vw,44px)",
              transform: "translateX(-50%)",
              margin: "0",
              whiteSpace: "nowrap",
              font: "500 clamp(110px,22vw,420px)/.74 var(--font-display)",
              letterSpacing: "-.01em",
              color: "#6A3529",
              opacity: ".9",
            }}
          >
            ALOHA
          </p>{" "}
          <p
            data-spot=""
            style={{
              position: "absolute",
              left: "50%",
              bottom: "clamp(8px,2.4vw,44px)",
              transform: "translateX(-50%)",
              margin: "0",
              whiteSpace: "nowrap",
              font: "500 clamp(110px,22vw,420px)/.74 var(--font-display)",
              letterSpacing: "-.01em",
              color: "#E9A68C",
              textShadow: "0 0 40px rgba(233,166,140,.45)",
              opacity: "var(--spot)",
              transition: "opacity 400ms ease",
              WebkitMaskImage:
                "radial-gradient(circle clamp(140px,16vw,280px) at var(--mx) var(--my), #000 0%, rgba(0,0,0,.5) 45%, transparent 75%)",
              maskImage:
                "radial-gradient(circle clamp(140px,16vw,280px) at var(--mx) var(--my), #000 0%, rgba(0,0,0,.5) 45%, transparent 75%)",
            }}
          >
            ALOHA
          </p>
        </div>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            zIndex: "1",
            left: "max(-3vw, calc(50% - 1080px))",
            bottom: "clamp(6px,3vw,60px)",
            width: "clamp(150px,25vw,480px)",
            pointerEvents: "none",
            transform: "translate3d(0, calc(var(--fy) * 90px), 0) rotate(calc(var(--fy) * -8deg))",
            willChange: "transform",
          }}
        >
          <Image
            width={1000}
            height={1000}
            sizes="(max-width: 600px) 25vw, 480px"
            src="/assets/hero-amber.png"
            alt=""
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              transform: "rotate(-32deg)",
              filter: "drop-shadow(0 34px 40px rgba(0,0,0,.55))",
            }}
          />
        </div>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            zIndex: "1",
            right: "max(-4vw, calc(50% - 1090px))",
            bottom: "clamp(-6px,0vw,10px)",
            width: "clamp(150px,25vw,480px)",
            pointerEvents: "none",
            transform: "translate3d(0, calc(var(--fy) * 150px), 0) rotate(calc(var(--fy) * 10deg))",
            willChange: "transform",
          }}
        >
          <Image
            width={1000}
            height={1000}
            sizes="(max-width: 600px) 25vw, 480px"
            src="/assets/hero-gold.png"
            alt=""
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              transform: "rotate(30deg)",
              filter: "drop-shadow(0 34px 40px rgba(0,0,0,.55))",
            }}
          />
        </div>
      </footer>
    </>
  );
}
