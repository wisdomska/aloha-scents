"use client";

import { Fragment, useRef, type KeyboardEvent, type MouseEvent } from "react";
import Link from "next/link";
import { useSite, type GiftFilter } from "@/components/providers/SiteProvider";
import { BUDGET_OPTS, OCCASIONS, SETS, TIERS } from "@/content/site";
import { IMG, photo } from "@/content/images";
import { useCarousel } from "@/hooks/useCarousel";
import { EASE } from "@/lib/motion";

const TABS: [GiftFilter, string][] = [
  ["her", "For her"],
  ["him", "For him"],
  ["occasions", "Occasions"],
];

export function GiftSets() {
  const { page, giftFilter: filter, setGiftFilter, startRequest, navigate, isReduced, isFinePointer } = useSite();
  const gridRef = useRef<HTMLDivElement>(null);
  const isHome = page === "home";

  const cards =
    filter === "occasions"
      ? OCCASIONS.map((o, i) => ({
          name: o.name,
          line: "Occasion",
          who: o.who,
          tbc: false,
          price: "Priced to your budget",
          cta: "Plan it",
          contentsText: "Any set, or one built from scratch, with a note",
          alt: "A gift being given for " + o.name.toLowerCase(),
          ph: photo(IMG.occasions[i]),
          href: "/contact",
          d: String(i * 70),
          onAsk: (e: MouseEvent) =>
            startRequest(
              e,
              { title: o.name, detail: "Priced to your budget", img: photo(IMG.occasions[i]) },
              {
                occasion: o.occ,
                service: o.occ === "Corporate gifting" ? "Corporate & occasion gifting" : "Custom gift set",
              },
            ),
        }))
      : SETS[filter].map((x, i) => {
          const line = filter === "her" ? "For her" : "For him";
          return {
            name: x.name,
            line,
            who: TIERS[i],
            tbc: !!x.tbc,
            price: x.price,
            cta: "Request",
            contentsText: x.contents.join(" + "),
            alt: `Perfume styled for the ${x.name} gift set`,
            ph: photo(IMG[filter][i]),
            href: "/contact",
            d: String(i * 70),
            onAsk: (e: MouseEvent) =>
              startRequest(
                e,
                { title: x.name + " set", detail: line + " · " + x.price, img: photo(IMG[filter][i]) },
                { service: "A gift set", who: filter === "her" ? "Her" : "Him", budget: BUDGET_OPTS[i] },
              ),
          };
        });

  const { onScroll: carScroll, dots: giftDots } = useCarousel(cards.length);
  const tabIdx = TABS.findIndex((t) => t[0] === filter);

  const setFilter = (k: GiftFilter) => {
    if (k === filter) return;
    setGiftFilter(k);
    if (gridRef.current && !isReduced())
      gridRef.current.animate(
        [
          { opacity: 0.35, transform: "translateY(6px)" },
          { opacity: 1, transform: "none" },
        ],
        {
          duration: 260,
          easing: EASE,
        },
      );
  };
  const tabs = TABS.map(([k, label]) => ({
    id: "tab-" + k,
    label,
    sel: filter === k,
    tabindex: filter === k ? 0 : -1,
    color: filter === k ? "#2E1A16" : "#6B3F35",
    onClick: () => setFilter(k),
  }));
  const tabX = tabIdx * 100 + "%";
  const tabPanelLabel = "tab-" + filter;
  const tabKey = (e: KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const n = (tabIdx + (e.key === "ArrowRight" ? 1 : 2)) % 3;
    setFilter(TABS[n][0]);
    requestAnimationFrame(() => document.getElementById("tab-" + TABS[n][0])?.focus());
  };

  const cardMove = (e: MouseEvent<HTMLElement>) => {
    if (isReduced() || !isFinePointer()) return;
    const el = e.currentTarget.querySelector<HTMLElement>("[data-par]");
    if (!el) return;
    const r = e.currentTarget.getBoundingClientRect();
    el.style.transform = `translate(${((e.clientX - r.left) / r.width - 0.5) * -12}px, ${((e.clientY - r.top) / r.height - 0.5) * -12}px) scale(1.03)`;
  };
  const cardLeave = (e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget.querySelector<HTMLElement>("[data-par]");
    if (el) el.style.transform = "";
  };
  const goCatalogue = (e: MouseEvent) => {
    e.preventDefault();
    navigate("gifts", "catalogue", "perfumes");
  };

  return (
    <>
      <section
        id="gift-sets"
        aria-labelledby="gifts-title"
        data-sparkle-zone=""
        style={{ background: "#F3E8DC", padding: "clamp(48px,7vw,112px) clamp(20px,4vw,48px)" }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div
            data-reveal=""
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "flex-end",
              gap: "20px 40px",
            }}
          >
            <div style={{ maxWidth: "40em" }}>
              <p
                style={{
                  margin: "0",
                  font: "600 12px/1.2 var(--font-body)",
                  letterSpacing: ".3em",
                  textTransform: "uppercase",
                  color: "#6B3F35",
                }}
              >
                Gift sets
              </p>{" "}
              <h2
                id="gifts-title"
                style={{
                  margin: "14px 0 0",
                  font: "300 clamp(32px,2.4vw + 14px,48px)/1.1 var(--font-display)",
                  color: "#2E1A16",
                  textWrap: "balance",
                  letterSpacing: "-.05em",
                }}
              >
                Built for one person. <em style={{ fontStyle: "italic", color: "#B4695A" }}>Yours.</em>
              </h2>{" "}
              <p
                style={{
                  margin: "14px 0 0",
                  font: "400 clamp(16px,.4vw + 14.5px,18px)/1.6 var(--font-body)",
                  color: "#6B3F35",
                  textWrap: "pretty",
                }}
              >
                Each set comes with a handwritten or voice note. Ask about any of them and we&apos;ll tailor it to who
                it&apos;s for.
              </p>
            </div>{" "}
            <div
              role="tablist"
              aria-label="Filter gift sets"
              style={{
                position: "relative",
                display: "grid",
                gridTemplateColumns: "repeat(3,minmax(0,1fr))",
                width: "min(100%,400px)",
                borderBottom: "1px solid rgba(46,26,22,.14)",
              }}
            >
              {tabs.map((t, i) => (
                <Fragment key={i}>
                  <button
                    type="button"
                    role="tab"
                    id={t.id}
                    aria-selected={t.sel}
                    aria-controls="gift-grid"
                    tabIndex={t.tabindex}
                    onClick={t.onClick}
                    onKeyDown={tabKey}
                    style={{
                      minHeight: "48px",
                      padding: "0 6px",
                      border: "0",
                      background: "none",
                      font: "500 15px var(--font-body)",
                      color: t.color,
                      cursor: "pointer",
                      transition: "color 200ms ease",
                    }}
                  >
                    {t.label}
                  </button>
                </Fragment>
              ))}{" "}
              <span
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "0",
                  bottom: "-1px",
                  width: "33.333%",
                  height: "2px",
                  background: "#B4695A",
                  transform: `translateX(${tabX})`,
                  transition: "transform 380ms cubic-bezier(.23,1,.32,1)",
                }}
              />
            </div>
          </div>{" "}
          <div
            className="carousel"
            id="gift-grid"
            role="tabpanel"
            aria-labelledby={tabPanelLabel}
            ref={gridRef}
            data-car="gift"
            onScroll={carScroll}
            style={{
              display: "grid",
              scrollbarWidth: "none",
              overscrollBehaviorX: "contain",
              WebkitOverflowScrolling: "touch",
              gap: "clamp(14px,2vw,28px)",
              marginTop: "clamp(28px,4vw,40px)",
            }}
          >
            {cards.map((c, i) => (
              <Fragment key={i}>
                <article
                  className="ix-h7"
                  data-reveal=""
                  data-d={c.d}
                  onMouseMove={cardMove}
                  onMouseLeave={cardLeave}
                  style={{
                    scrollSnapAlign: "start",
                    display: "flex",
                    flexDirection: "column",
                    background: "#FBF7F2",
                    borderRadius: "22px",
                    padding: "12px 12px 16px",
                    boxShadow: "0 0 0 rgba(46,26,22,0)",
                    transition: "transform 320ms cubic-bezier(.23,1,.32,1), box-shadow 320ms cubic-bezier(.23,1,.32,1)",
                  }}
                >
                  <div style={{ position: "relative" }}>
                    <div
                      role="img"
                      aria-label={c.alt}
                      style={{ position: "relative", aspectRatio: "4/3", borderRadius: "10px", overflow: "hidden" }}
                    >
                      <div
                        data-par=""
                        style={{
                          position: "absolute",
                          inset: "-6%",
                          background: c.ph,
                          transition: "transform 500ms cubic-bezier(.23,1,.32,1)",
                        }}
                      />
                    </div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", flex: "1", padding: "14px 4px 0" }}>
                    <div
                      style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "10px" }}
                    >
                      <h3
                        style={{
                          margin: "0",
                          font: "500 28px/1.05 var(--font-display)",
                          color: "#2E1A16",
                          letterSpacing: "-.05em",
                        }}
                      >
                        {c.name}
                      </h3>{" "}
                      <p
                        style={{
                          margin: "0",
                          flex: "none",
                          font: "600 10px/1.2 var(--font-body)",
                          letterSpacing: ".3em",
                          textTransform: "uppercase",
                          color: "#6B3F35",
                        }}
                      >
                        {c.line}
                      </p>
                    </div>{" "}
                    <p style={{ margin: "4px 0 0", font: "italic 300 17px/1.3 var(--font-display)", color: "#6B3F35" }}>
                      {c.who}
                    </p>{" "}
                    <p
                      style={{
                        margin: "10px 0 0",
                        font: "400 14px/1.5 var(--font-body)",
                        color: "#2E1A16",
                        textWrap: "pretty",
                      }}
                    >
                      {c.contentsText}
                      {c.tbc && (
                        <>
                          <span style={{ color: "#6B3F35" }}> · contents being finalised</span>
                        </>
                      )}
                    </p>{" "}
                    <div
                      style={{
                        marginTop: "auto",
                        paddingTop: "14px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "8px",
                      }}
                    >
                      <p
                        style={{
                          margin: "0",
                          minWidth: "0",
                          whiteSpace: "nowrap",
                          font: "600 15px/1.2 var(--font-body)",
                          color: "#2E1A16",
                        }}
                      >
                        {c.price}
                      </p>{" "}
                      <Link
                        className="ix-h8 ix-a3"
                        href={c.href}
                        onClick={c.onAsk}
                        style={{
                          flex: "none",
                          whiteSpace: "nowrap",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          minHeight: "44px",
                          padding: "0 14px",
                          borderRadius: "999px",
                          border: "1px solid #6B3F35",
                          color: "#2E1A16",
                          font: "500 14px var(--font-body)",
                          textDecoration: "none",
                          transition:
                            "background-color 200ms ease, color 200ms ease, transform 180ms cubic-bezier(.34,1.56,.64,1)",
                        }}
                      >
                        {c.cta}
                        <span aria-hidden="true" style={{ color: "#C99A5B" }}>
                          →
                        </span>
                      </Link>
                    </div>
                  </div>
                </article>
              </Fragment>
            ))}
          </div>{" "}
          <div className="only-mob">
            <div aria-hidden="true" style={{ display: "flex", justifyContent: "center", gap: "6px", marginTop: "6px" }}>
              {giftDots.map((d, i) => (
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
          </div>{" "}
          {isHome && (
            <>
              <div data-reveal="" style={{ marginTop: "36px", display: "flex", justifyContent: "center" }}>
                <Link
                  href="/gifts#catalogue"
                  onClick={goCatalogue}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    minHeight: "48px",
                    padding: "0 8px",
                    color: "#2E1A16",
                    font: "500 16px var(--font-body)",
                    textDecoration: "underline",
                    textDecorationColor: "#C99A5B",
                    textUnderlineOffset: "5px",
                  }}
                >
                  Browse perfumes, oils & body splashes →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
