"use client";

import { Fragment, useState, type MouseEvent } from "react";
import Link from "next/link";
import { useSite } from "@/components/providers/SiteProvider";
import { SERVICES } from "@/content/site";

export function ServicesShowcase() {
  const { goFinder, startRequest, isFinePointer } = useSite();
  const [svc, setSvc] = useState(0);

  const actions: { href: string; onClick: (e: MouseEvent) => void }[] = [
    { href: "/#finder", onClick: goFinder(null, 0) },
    { href: "/#finder", onClick: goFinder("me", 1) },
    {
      href: "/contact",
      onClick: (e) =>
        startRequest(
          e,
          {
            title: "Corporate & occasion gifting",
            detail: "Sets for many people, each with its own note",
            img: SERVICES[2].img,
          },
          { occasion: "Corporate gifting", service: "Corporate & occasion gifting" },
        ),
    },
    {
      href: "/contact",
      onClick: (e) =>
        startRequest(
          e,
          { title: "Souvenirs & diffusers", detail: "Price on request · matched to your budget", img: SERVICES[3].img },
          { service: "Souvenirs & diffusers" },
        ),
    },
  ];

  // Accordion: one service open at a time; hovering previews it on desktop.
  const services = SERVICES.map((v, i) => {
    const on = i === svc;
    return {
      ...v,
      ...actions[i],
      n: "0" + (i + 1),
      alt: v.title,
      ph: v.img,
      btnId: "svc-b" + i,
      panelId: "svc-p" + i,
      expanded: on,
      rows: on ? "1fr" : "0fr",
      op: on ? 1 : 0,
      ty: on ? "0px" : "-8px",
      tab: on ? 0 : -1,
      color: on ? "#2E1A16" : "rgba(46,26,22,.55)",
      ring: on ? "#2E1A16" : "rgba(46,26,22,.25)",
      ringBg: on ? "#2E1A16" : "transparent",
      plus: on ? "#FBF7F2" : "#2E1A16",
      rot: on ? "45deg" : "0deg",
      imgOp: on ? 1 : 0,
      imgScale: on ? 1 : 1.08,
      imgHidden: !on,
      select: () => setSvc(i),
      preview: () => {
        if (isFinePointer() && svc !== i) setSvc(i);
      },
    };
  });
  const svcNum = "0" + (svc + 1);
  const svcLabel = SERVICES[svc].label;

  return (
    <>
      <section
        aria-labelledby="services-title"
        style={{ background: "#F3E8DC", padding: "clamp(40px,6vw,88px) clamp(20px,4vw,48px) clamp(64px,8vw,120px)" }}
      >
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
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
            Services
          </p>{" "}
          <h1
            id="services-title"
            style={{
              margin: "16px 0 0",
              maxWidth: "13em",
              font: "300 clamp(44px,4vw + 14px,76px)/1.04 var(--font-display)",
              color: "#2E1A16",
              textWrap: "balance",
              animation: "riseIn 700ms cubic-bezier(.23,1,.32,1) 80ms both",
              letterSpacing: "-.05em",
            }}
          >
            However you give, <em style={{ fontStyle: "italic", color: "#B4695A" }}>we&apos;ll help.</em>
          </h1>{" "}
          <p
            style={{
              margin: "18px 0 0",
              maxWidth: "34em",
              font: "400 clamp(16px,.4vw + 14.5px,18px)/1.6 var(--font-body)",
              color: "#6B3F35",
              animation: "riseIn 600ms cubic-bezier(.23,1,.32,1) 160ms both",
            }}
          >
            One person or a whole team, one bottle or a full set. Tell us what you need and we&apos;ll take it from
            there.
          </p>{" "}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap-reverse",
              alignItems: "flex-start",
              gap: "clamp(28px,5vw,80px)",
              marginTop: "clamp(36px,5vw,72px)",
            }}
          >
            <div data-reveal="" style={{ flex: "1 1 420px", minWidth: "0" }}>
              {services.map((v, i) => (
                <Fragment key={i}>
                  <div style={{ borderTop: "1px solid rgba(46,26,22,.16)" }}>
                    <h2 style={{ margin: "0", letterSpacing: "-.05em" }}>
                      <button
                        type="button"
                        id={v.btnId}
                        aria-expanded={v.expanded}
                        aria-controls={v.panelId}
                        onClick={v.select}
                        onMouseEnter={v.preview}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: "clamp(14px,2vw,28px)",
                          padding: "clamp(18px,2.2vw,28px) 0",
                          border: "0",
                          background: "none",
                          textAlign: "left",
                          cursor: "pointer",
                          color: v.color,
                          transition: "color 300ms ease",
                        }}
                      >
                        <span
                          style={{
                            flex: "none",
                            width: "2.2em",
                            font: "italic 300 clamp(18px,1.2vw + 10px,24px)/1 var(--font-display)",
                            color: "#B4695A",
                          }}
                        >
                          {v.n}
                        </span>{" "}
                        <span
                          style={{
                            flex: "1",
                            minWidth: "0",
                            font: "300 clamp(28px,2.2vw + 14px,48px)/1.05 var(--font-display)",
                            letterSpacing: "-.03em",
                            textWrap: "balance",
                          }}
                        >
                          {v.title}
                        </span>{" "}
                        <span
                          aria-hidden="true"
                          style={{
                            flex: "none",
                            width: "44px",
                            height: "44px",
                            borderRadius: "50%",
                            border: `1px solid ${v.ring}`,
                            background: v.ringBg,
                            display: "grid",
                            placeItems: "center",
                            transition:
                              "background-color 300ms ease, border-color 300ms ease, transform 400ms cubic-bezier(.23,1,.32,1)",
                            transform: `rotate(${v.rot})`,
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14">
                            <path d="M7 1v12M1 7h12" stroke={v.plus} strokeWidth="1.4" strokeLinecap="round" />
                          </svg>
                        </span>
                      </button>
                    </h2>{" "}
                    <div
                      id={v.panelId}
                      role="region"
                      aria-labelledby={v.btnId}
                      style={{
                        display: "grid",
                        gridTemplateRows: v.rows,
                        transition: "grid-template-rows 500ms cubic-bezier(.23,1,.32,1)",
                      }}
                    >
                      <div style={{ overflow: "hidden", minHeight: "0" }}>
                        <div
                          style={{
                            padding: "0 0 clamp(22px,2.6vw,32px) calc(2.2em + clamp(14px,2vw,28px))",
                            fontSize: "clamp(18px,1.2vw + 10px,24px)",
                            opacity: v.op,
                            transform: `translateY(${v.ty})`,
                            transition: "opacity 400ms ease 100ms, transform 500ms cubic-bezier(.23,1,.32,1) 60ms",
                          }}
                        >
                          <p
                            style={{
                              margin: "0",
                              maxWidth: "34em",
                              font: "400 16px/1.65 var(--font-body)",
                              color: "#6B3F35",
                              textWrap: "pretty",
                            }}
                          >
                            {v.body}
                          </p>{" "}
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              alignItems: "center",
                              gap: "10px 16px",
                              marginTop: "20px",
                            }}
                          >
                            <Link
                              className="ix-h4 ix-a3"
                              href={v.href}
                              onClick={v.onClick}
                              tabIndex={v.tab}
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "10px",
                                minHeight: "50px",
                                padding: "0 26px",
                                borderRadius: "999px",
                                backgroundColor: "#2E1A16",
                                backgroundImage:
                                  "linear-gradient(105deg, transparent 38%, rgba(201,154,91,.5) 47%, rgba(180,105,90,.7) 52%, transparent 62%)",
                                backgroundSize: "260% 100%",
                                backgroundPosition: "120% 0",
                                backgroundRepeat: "no-repeat",
                                color: "#FBF7F2",
                                font: "500 15px var(--font-body)",
                                textDecoration: "none",
                                transition:
                                  "background-position 800ms cubic-bezier(.23,1,.32,1), transform 180ms cubic-bezier(.34,1.56,.64,1)",
                              }}
                            >
                              {v.cta}{" "}
                              <span aria-hidden="true" style={{ color: "#C99A5B" }}>
                                →
                              </span>
                            </Link>{" "}
                            <span style={{ font: "400 13px var(--font-body)", color: "#6B3F35" }}>{v.hint}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Fragment>
              ))}{" "}
              <div style={{ borderTop: "1px solid rgba(46,26,22,.16)" }} />
            </div>{" "}
            <div
              className="sticky-panel sticky-panel--services"
              data-reveal=""
              data-d="100"
              style={{
                flex: "1 1 340px",
                minWidth: "0",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "min(460px, 86vw)",
                  padding: "clamp(10px,1.4vw,16px)",
                }}
              >
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    inset: "0",
                    border: "1px solid #C99A5B",
                    borderRadius: "9999px 9999px 0 0",
                  }}
                />{" "}
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "var(--svc-ratio)",
                    borderRadius: "9999px 9999px 0 0",
                    overflow: "hidden",
                    background: "#E7C3B5",
                  }}
                >
                  {services.map((v, i) => (
                    <Fragment key={i}>
                      <div
                        role="img"
                        aria-label={v.alt}
                        aria-hidden={v.imgHidden}
                        style={{
                          position: "absolute",
                          inset: "0",
                          background: v.ph,
                          opacity: v.imgOp,
                          transform: `scale(${v.imgScale})`,
                          transition: "opacity 700ms ease, transform 1200ms cubic-bezier(.23,1,.32,1)",
                        }}
                      />
                    </Fragment>
                  ))}{" "}
                  <div
                    aria-hidden="true"
                    style={{
                      position: "absolute",
                      inset: "auto 0 0 0",
                      height: "45%",
                      background: "linear-gradient(180deg, transparent, rgba(46,26,22,.72))",
                    }}
                  />{" "}
                  <div
                    style={{
                      position: "absolute",
                      left: "clamp(18px,2.4vw,28px)",
                      right: "clamp(18px,2.4vw,28px)",
                      bottom: "clamp(16px,2vw,24px)",
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                      gap: "16px",
                      color: "#FBF7F2",
                    }}
                  >
                    <p
                      style={{
                        margin: "0",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        font: "600 11px/1.3 var(--font-body)",
                        letterSpacing: ".3em",
                        textTransform: "uppercase",
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fill="#C99A5B"
                          d="M12 0C12.6 7.2 16.8 11.4 24 12C16.8 12.6 12.6 16.8 12 24C11.4 16.8 7.2 12.6 0 12C7.2 11.4 11.4 7.2 12 0Z"
                        />
                      </svg>
                      {svcLabel}
                    </p>{" "}
                    <p
                      aria-hidden="true"
                      style={{
                        margin: "0",
                        font: "italic 300 clamp(56px,5vw,84px)/.8 var(--font-display)",
                        color: "#FBF7F2",
                      }}
                    >
                      {svcNum}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
