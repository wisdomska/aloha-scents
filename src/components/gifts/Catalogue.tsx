"use client";

import { Fragment, useState, type FormEvent, type MouseEvent } from "react";
import Link from "next/link";
import { useSite } from "@/components/providers/SiteProvider";
import { CATALOGUE } from "@/content/site";
import { IMG, photo } from "@/content/images";
import { useCarousel } from "@/hooks/useCarousel";

export function Catalogue() {
  const { startRequest } = useSite();
  const [matchName, setMatchName] = useState("");
  const { onScroll: carScroll, dots: catDots } = useCarousel(CATALOGUE.length);

  const catalogue = CATALOGUE.map((k, i) => ({
    ...k,
    d: String(i * 60),
    alt: k.name,
    ph: photo(IMG.catalogue[i]),
    href: "/contact",
    onClick: (e: MouseEvent) =>
      startRequest(
        e,
        { title: k.name, detail: "Price on request · matched to your budget", img: photo(IMG.catalogue[i]) },
        { service: i >= 3 ? "Souvenirs & diffusers" : "Scent matching" },
      ),
  }));
  const onMatch = (e: { target: { value: string } }) => setMatchName(e.target.value);
  const matchSubmit = (e: FormEvent) => {
    e.preventDefault();
    const n = matchName.trim();
    if (!n) {
      document.getElementById("match-name")?.focus();
      return;
    }
    startRequest(
      null,
      {
        title: "Something like “" + n + "”",
        detail: "We'll find it, or its closest match",
        img: photo(IMG.catalogue[0]),
      },
      { service: "Scent matching", message: "A perfume I love: " + n },
    );
    setMatchName("");
  };

  return (
    <>
      <section
        id="catalogue"
        aria-labelledby="cat-title"
        style={{ background: "#F3E8DC", padding: "clamp(64px,8vw,120px) clamp(20px,4vw,48px)" }}
      >
        <div style={{ maxWidth: "1320px", margin: "0 auto" }}>
          <div data-reveal="" style={{ maxWidth: "40em" }}>
            <p
              style={{
                margin: "0",
                font: "600 12px/1.2 var(--font-body)",
                letterSpacing: ".3em",
                textTransform: "uppercase",
                color: "#6B3F35",
              }}
            >
              Perfumes & oils
            </p>{" "}
            <h2
              id="cat-title"
              style={{
                margin: "14px 0 0",
                font: "300 clamp(32px,2.4vw + 14px,48px)/1.1 var(--font-display)",
                color: "#2E1A16",
                textWrap: "balance",
                letterSpacing: "-.05em",
              }}
            >
              Every kind of scent, <em style={{ fontStyle: "italic", color: "#B4695A" }}>matched to you.</em>
            </h2>{" "}
            <p
              style={{
                margin: "14px 0 0",
                font: "400 clamp(16px,.4vw + 14.5px,18px)/1.6 var(--font-body)",
                color: "#6B3F35",
                textWrap: "pretty",
              }}
            >
              From rich Dubai ouds to fresh everyday classics from houses around the world. Stock changes often, so ask
              us what&apos;s in today and we&apos;ll match it to your budget.
            </p>
          </div>{" "}
          <div
            className="carousel"
            data-car="cat"
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
            {catalogue.map((k, i) => (
              <Fragment key={i}>
                <article
                  className="ix-h7"
                  data-reveal=""
                  data-d={k.d}
                  style={{
                    scrollSnapAlign: "start",
                    display: "flex",
                    flexDirection: "column",
                    background: "#FBF7F2",
                    borderRadius: "22px",
                    padding: "12px 12px 16px",
                    transition: "transform 320ms cubic-bezier(.23,1,.32,1), box-shadow 320ms cubic-bezier(.23,1,.32,1)",
                  }}
                >
                  <div
                    role="img"
                    aria-label={k.alt}
                    style={{ aspectRatio: "4/3", borderRadius: "10px", background: k.ph }}
                  />
                  <div style={{ display: "flex", flexDirection: "column", flex: "1", padding: "14px 4px 0" }}>
                    <h3
                      style={{
                        margin: "0",
                        font: "500 28px/1.05 var(--font-display)",
                        color: "#2E1A16",
                        letterSpacing: "-.05em",
                      }}
                    >
                      {k.name}
                    </h3>{" "}
                    <p
                      style={{
                        margin: "10px 0 0",
                        font: "400 14px/1.5 var(--font-body)",
                        color: "#2E1A16",
                        textWrap: "pretty",
                      }}
                    >
                      {k.body}
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
                        On request
                      </p>{" "}
                      <Link
                        className="ix-h8 ix-a3"
                        href={k.href}
                        onClick={k.onClick}
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
                        Enquire
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
              {catDots.map((d, i) => (
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
          <div
            data-reveal=""
            style={{
              marginTop: "clamp(40px,5vw,64px)",
              padding: "clamp(28px,4vw,56px)",
              borderRadius: "28px",
              background: "#2E1A16",
              color: "#F3E8DC",
              display: "flex",
              flexWrap: "wrap",
              gap: "24px 48px",
              alignItems: "center",
            }}
          >
            <div style={{ flex: "1 1 320px", minWidth: "0" }}>
              <p
                style={{
                  margin: "0",
                  font: "600 12px/1.2 var(--font-body)",
                  letterSpacing: ".3em",
                  textTransform: "uppercase",
                  color: "#C99A5B",
                }}
              >
                Already have a favourite?
              </p>{" "}
              <h3
                style={{
                  margin: "12px 0 0",
                  font: "300 clamp(28px,2vw + 14px,40px)/1.12 var(--font-display)",
                  color: "#FBF7F2",
                  letterSpacing: "-.05em",
                }}
              >
                Name a perfume you love. We&apos;ll find it, or its closest match.
              </h3>
            </div>{" "}
            <form
              onSubmit={matchSubmit}
              style={{ flex: "1 1 360px", minWidth: "0", display: "flex", flexWrap: "wrap", gap: "10px" }}
            >
              <label
                htmlFor="match-name"
                style={{ flexBasis: "100%", font: "500 14px var(--font-body)", color: "#F3E8DC" }}
              >
                Perfume name
              </label>
              <input
                className="ix-f9"
                id="match-name"
                type="text"
                value={matchName}
                onChange={onMatch}
                placeholder="Type the name, as best you remember it"
                autoComplete="off"
                style={{
                  flex: "1 1 220px",
                  minWidth: "0",
                  height: "54px",
                  padding: "0 18px",
                  borderRadius: "999px",
                  border: "1px solid rgba(243,232,220,.3)",
                  background: "rgba(251,247,242,.06)",
                  color: "#FBF7F2",
                  font: "400 16px var(--font-body)",
                  outline: "none",
                }}
              />
              <button
                className="ix-hb ix-a3"
                type="submit"
                style={{
                  flex: "0 0 auto",
                  minHeight: "54px",
                  padding: "0 24px",
                  border: "0",
                  borderRadius: "999px",
                  background: "#FBF7F2",
                  color: "#2E1A16",
                  font: "500 16px var(--font-body)",
                  cursor: "pointer",
                  transition: "background-color 200ms ease, transform 180ms cubic-bezier(.34,1.56,.64,1)",
                }}
              >
                Find it for me
              </button>
              <p
                style={{
                  flexBasis: "100%",
                  margin: "4px 0 0 4px",
                  font: "400 13px var(--font-body)",
                  color: "#E7C3B5",
                }}
              >
                We&apos;ll come back with it, or its closest match.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
