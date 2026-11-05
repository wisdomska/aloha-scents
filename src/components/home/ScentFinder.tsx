"use client";

import { Fragment, type MouseEvent } from "react";
import Link from "next/link";
import { useSite, type FinderState } from "@/components/providers/SiteProvider";
import { BUDGET_OPTS, BUDGETS, SETS, VIBES, WHO, type Choice, type Line } from "@/content/site";
import { IMG, photo } from "@/content/images";
import { track } from "@/lib/analytics";
import { EASE } from "@/lib/motion";
import { waLink } from "@/lib/whatsapp";

type Field = "who" | "vibe" | "budget";

/** Recommend a line and a set from the answers. */
function recommend(f: FinderState) {
  const line: Line =
    f.who === "him" ? "him" : f.who === "her" ? "her" : f.vibe === "woody" || f.vibe === "fresh" ? "him" : "her";
  const idx = f.budget == null ? 0 : f.budget;
  return { line, idx, set: SETS[line][idx] };
}

export function ScentFinder() {
  const { finder: s, setFinder, scheduleFinder, clearFinderTimer, isReduced, startRequest } = useSite();

  const step = (d: number) => {
    clearFinderTimer();
    setFinder((f) => {
      const n = Math.max(0, Math.min(3, f.step + d));
      if (n === 3 && f.step !== 3) track("scent_finder_complete", { who: f.who, vibe: f.vibe, budget: f.budget });
      return { ...f, step: n, dir: d };
    });
  };
  const pick = <V,>(field: Field, v: V) => {
    clearFinderTimer();
    setFinder((f) => ({ ...f, [field]: v }));
    scheduleFinder(() => step(1), isReduced() ? 150 : 340);
  };
  const opt = <V,>(field: Field, list: Choice<V>[]) =>
    list.map((o) => {
      const sel = s[field] === o.v;
      return {
        ...o,
        pressed: sel,
        bg: sel ? "#E7C3B5" : "rgba(243,232,220,.55)",
        bc: sel ? "#B4695A" : "rgba(46,26,22,.10)",
        ringC: sel ? "#B4695A" : "rgba(46,26,22,.25)",
        ringBg: sel ? "#B4695A" : "transparent",
        ck: sel ? "1" : "0",
        cks: sel ? "1" : "0.5",
        onClick: () => pick(field, o.v),
      };
    });

  const answered = [s.who, s.vibe, s.budget][s.step] != null;
  const progress = (s.step === 3 ? 1 : Math.max(0.04, (s.step + (answered ? 1 : 0)) / 3)).toFixed(3);
  const whoT = WHO.find((o) => o.v === s.who)?.t;
  const vibeT = VIBES.find((o) => o.v === s.vibe)?.t;
  const budT = BUDGETS.find((o) => o.v === s.budget)?.t;
  const { line, idx, set } = recommend(s);
  const recImg = photo(IMG[line][idx]);

  const partial = ["Hi Aloha, I'd like help choosing a scent."];
  if (whoT) partial.push(`It's for: ${whoT === "Me" ? "me" : whoT.toLowerCase()}.`);
  if (vibeT) partial.push(`Vibe: ${vibeT}.`);

  const stepLabel = s.step < 3 ? `Step ${s.step + 1} of 3` : "Your match";
  const canBack = s.step > 0;
  const back = () => step(-1);
  const [step0, step1, step2, step3] = [0, 1, 2, 3].map((n) => s.step === n);
  const notResult = s.step !== 3;
  const stepAnim = s.dir === 0 ? "none" : `${s.dir > 0 ? "stepFwd" : "stepBack"} 380ms ${EASE} both`;
  const vibeQ = s.who === "me" ? "What's your vibe?" : "What's their vibe?";
  const whoOpts = opt("who", WHO);
  const vibeOpts = opt("vibe", VIBES);
  const budgetOpts = opt("budget", BUDGETS);
  const summaryWho = whoT === "Me" ? "you" : (whoT || "").toLowerCase();
  const summaryVibe = vibeT || "";
  const summaryBudget = budT || "";
  const rec = {
    img: recImg,
    name: set.name,
    price: set.price,
    line: line === "her" ? "For her" : "For him",
    contentsText: set.tbc ? "Contents tailored to them" : set.contents.join(" + "),
    onClick: (e: MouseEvent) =>
      startRequest(
        e,
        { title: set.name + " set", detail: `For ${summaryWho} · ${vibeT} · ${set.price}`, img: recImg },
        {
          service: "A gift set",
          who: whoT === "Me" ? "Myself" : whoT,
          budget: BUDGET_OPTS[idx],
          message: vibeT && vibeT !== "Not sure" ? "Their vibe: " + vibeT : "",
        },
      ),
  };
  const restart = () => setFinder({ step: 0, dir: -1, who: null, vibe: null, budget: null });
  const skipHref = waLink(partial.join(" "));
  const skipClick = () => track("whatsapp_click", { source: "finder_skip", step: s.step + 1 });

  return (
    <>
      <section
        id="finder"
        aria-labelledby="finder-title"
        style={{ background: "#F3E8DC", padding: "clamp(40px,6vw,96px) clamp(20px,4vw,48px) clamp(64px,8vw,120px)" }}
      >
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <div data-reveal="" style={{ textAlign: "center" }}>
            <p
              style={{
                margin: "0",
                font: "600 12px/1.2 var(--font-body)",
                letterSpacing: ".3em",
                textTransform: "uppercase",
                color: "#6B3F35",
              }}
            >
              Scent Finder
            </p>{" "}
            <h2
              id="finder-title"
              style={{
                margin: "14px 0 0",
                font: "300 clamp(32px,2.4vw + 14px,48px)/1.1 var(--font-display)",
                color: "#2E1A16",
                textWrap: "balance",
                letterSpacing: "-.05em",
              }}
            >
              Three questions. One <em style={{ fontStyle: "italic", color: "#B4695A" }}>well-chosen</em> gift.
            </h2>{" "}
            <p
              style={{
                margin: "16px auto 0",
                maxWidth: "34em",
                font: "400 clamp(16px,.4vw + 14.5px,18px)/1.6 var(--font-body)",
                color: "#6B3F35",
                textWrap: "pretty",
              }}
            >
              Tell us a little, and we&apos;ll suggest a set you can send straight to us on WhatsApp.
            </p>
          </div>{" "}
          <div
            data-reveal=""
            data-d="100"
            style={{
              marginTop: "40px",
              background: "#FBF7F2",
              borderRadius: "28px",
              padding: "clamp(22px,4vw,48px)",
              boxShadow: "0 1px 0 rgba(46,26,22,.04), 0 30px 60px -36px rgba(46,26,22,.35)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "16px",
                minHeight: "44px",
              }}
            >
              <p
                aria-live="polite"
                style={{
                  margin: "0",
                  font: "600 12px/1.2 var(--font-body)",
                  letterSpacing: ".3em",
                  textTransform: "uppercase",
                  color: "#6B3F35",
                }}
              >
                {stepLabel}
              </p>{" "}
              {canBack && (
                <>
                  <button
                    className="ix-h6 ix-a3"
                    type="button"
                    onClick={back}
                    style={{
                      flex: "none",
                      whiteSpace: "nowrap",
                      minHeight: "44px",
                      padding: "0 14px",
                      border: "0",
                      borderRadius: "999px",
                      background: "transparent",
                      color: "#2E1A16",
                      font: "500 15px var(--font-body)",
                      cursor: "pointer",
                      transition: "background-color 200ms ease, transform 160ms ease",
                    }}
                  >
                    ← Back
                  </button>
                </>
              )}
            </div>{" "}
            <div
              aria-hidden="true"
              style={{
                marginTop: "12px",
                height: "3px",
                borderRadius: "3px",
                background: "rgba(46,26,22,.08)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: "linear-gradient(90deg,#C99A5B,#B4695A)",
                  transformOrigin: "left center",
                  transform: `scaleX(${progress})`,
                  transition: "transform 500ms cubic-bezier(.23,1,.32,1)",
                }}
              />
            </div>{" "}
            {step0 && (
              <>
                <fieldset style={{ border: "0", margin: "30px 0 0", padding: "0", minWidth: "0", animation: stepAnim }}>
                  <legend
                    style={{
                      padding: "0",
                      font: "300 clamp(28px,2vw + 14px,40px)/1.15 var(--font-display)",
                      color: "#2E1A16",
                    }}
                  >
                    Who is it for?
                  </legend>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))",
                      gap: "12px",
                      marginTop: "22px",
                    }}
                  >
                    {whoOpts.map((o, i) => (
                      <Fragment key={i}>
                        <button
                          className="ix-a3"
                          type="button"
                          aria-pressed={o.pressed}
                          onClick={o.onClick}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "12px",
                            minHeight: "76px",
                            padding: "16px 18px",
                            textAlign: "left",
                            borderRadius: "18px",
                            border: `1px solid ${o.bc}`,
                            background: o.bg,
                            cursor: "pointer",
                            transition:
                              "background-color 220ms ease, border-color 220ms ease, transform 160ms cubic-bezier(.23,1,.32,1)",
                          }}
                        >
                          <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            <span style={{ font: "500 17px/1.3 var(--font-body)", color: "#2E1A16" }}>{o.t}</span>
                            <span style={{ font: "400 14px/1.4 var(--font-body)", color: "#6B3F35" }}>{o.h}</span>
                          </span>{" "}
                          <span
                            aria-hidden="true"
                            style={{
                              flex: "none",
                              width: "26px",
                              height: "26px",
                              borderRadius: "50%",
                              border: `1px solid ${o.ringC}`,
                              background: o.ringBg,
                              display: "grid",
                              placeItems: "center",
                              color: "#FBF7F2",
                              transition: "background-color 220ms ease, border-color 220ms ease",
                            }}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              style={{
                                opacity: o.ck,
                                transform: `scale(${o.cks})`,
                                transition: "opacity 200ms ease, transform 280ms cubic-bezier(.34,1.56,.64,1)",
                              }}
                            >
                              <path
                                d="M2 6.5l2.5 2.5L10 3"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </button>
                      </Fragment>
                    ))}
                  </div>
                </fieldset>
              </>
            )}{" "}
            {step1 && (
              <>
                <fieldset style={{ border: "0", margin: "30px 0 0", padding: "0", minWidth: "0", animation: stepAnim }}>
                  <legend
                    style={{
                      padding: "0",
                      font: "300 clamp(28px,2vw + 14px,40px)/1.15 var(--font-display)",
                      color: "#2E1A16",
                    }}
                  >
                    {vibeQ}
                  </legend>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,220px),1fr))",
                      gap: "12px",
                      marginTop: "22px",
                    }}
                  >
                    {vibeOpts.map((o, i) => (
                      <Fragment key={i}>
                        <button
                          className="ix-a3"
                          type="button"
                          aria-pressed={o.pressed}
                          onClick={o.onClick}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "12px",
                            minHeight: "76px",
                            padding: "16px 18px",
                            textAlign: "left",
                            borderRadius: "18px",
                            border: `1px solid ${o.bc}`,
                            background: o.bg,
                            cursor: "pointer",
                            transition:
                              "background-color 220ms ease, border-color 220ms ease, transform 160ms cubic-bezier(.23,1,.32,1)",
                          }}
                        >
                          <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            <span style={{ font: "500 17px/1.3 var(--font-body)", color: "#2E1A16" }}>{o.t}</span>
                            <span style={{ font: "400 14px/1.4 var(--font-body)", color: "#6B3F35" }}>{o.h}</span>
                          </span>{" "}
                          <span
                            aria-hidden="true"
                            style={{
                              flex: "none",
                              width: "26px",
                              height: "26px",
                              borderRadius: "50%",
                              border: `1px solid ${o.ringC}`,
                              background: o.ringBg,
                              display: "grid",
                              placeItems: "center",
                              color: "#FBF7F2",
                              transition: "background-color 220ms ease, border-color 220ms ease",
                            }}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              style={{
                                opacity: o.ck,
                                transform: `scale(${o.cks})`,
                                transition: "opacity 200ms ease, transform 280ms cubic-bezier(.34,1.56,.64,1)",
                              }}
                            >
                              <path
                                d="M2 6.5l2.5 2.5L10 3"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </button>
                      </Fragment>
                    ))}
                  </div>
                </fieldset>
              </>
            )}{" "}
            {step2 && (
              <>
                <fieldset style={{ border: "0", margin: "30px 0 0", padding: "0", minWidth: "0", animation: stepAnim }}>
                  <legend
                    style={{
                      padding: "0",
                      font: "300 clamp(28px,2vw + 14px,40px)/1.15 var(--font-display)",
                      color: "#2E1A16",
                    }}
                  >
                    Your budget
                  </legend>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,200px),1fr))",
                      gap: "12px",
                      marginTop: "22px",
                    }}
                  >
                    {budgetOpts.map((o, i) => (
                      <Fragment key={i}>
                        <button
                          className="ix-a3"
                          type="button"
                          aria-pressed={o.pressed}
                          onClick={o.onClick}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "12px",
                            minHeight: "76px",
                            padding: "16px 18px",
                            textAlign: "left",
                            borderRadius: "18px",
                            border: `1px solid ${o.bc}`,
                            background: o.bg,
                            cursor: "pointer",
                            transition:
                              "background-color 220ms ease, border-color 220ms ease, transform 160ms cubic-bezier(.23,1,.32,1)",
                          }}
                        >
                          <span style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                            <span style={{ font: "500 17px/1.3 var(--font-body)", color: "#2E1A16" }}>{o.t}</span>
                            <span style={{ font: "400 14px/1.4 var(--font-body)", color: "#6B3F35" }}>{o.h}</span>
                          </span>{" "}
                          <span
                            aria-hidden="true"
                            style={{
                              flex: "none",
                              width: "26px",
                              height: "26px",
                              borderRadius: "50%",
                              border: `1px solid ${o.ringC}`,
                              background: o.ringBg,
                              display: "grid",
                              placeItems: "center",
                              color: "#FBF7F2",
                              transition: "background-color 220ms ease, border-color 220ms ease",
                            }}
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              style={{
                                opacity: o.ck,
                                transform: `scale(${o.cks})`,
                                transition: "opacity 200ms ease, transform 280ms cubic-bezier(.34,1.56,.64,1)",
                              }}
                            >
                              <path
                                d="M2 6.5l2.5 2.5L10 3"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        </button>
                      </Fragment>
                    ))}
                  </div>
                </fieldset>
              </>
            )}{" "}
            {step3 && (
              <>
                <div
                  style={{
                    marginTop: "30px",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "clamp(24px,4vw,44px)",
                    alignItems: "center",
                    animation: stepAnim,
                  }}
                >
                  <div style={{ flex: "0 1 220px", margin: "0 auto", position: "relative", padding: "12px" }}>
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
                      role="img"
                      aria-label="Perfume styled for the recommended set"
                      style={{
                        position: "relative",
                        aspectRatio: "4/5",
                        borderRadius: "9999px 9999px 0 0",
                        overflow: "hidden",
                        background: rec.img,
                      }}
                    />
                  </div>{" "}
                  <div style={{ flex: "1 1 300px", minWidth: "0" }}>
                    <p
                      style={{
                        margin: "0",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        font: "600 12px/1.2 var(--font-body)",
                        letterSpacing: ".3em",
                        textTransform: "uppercase",
                        color: "#6B3F35",
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          fill="#C99A5B"
                          d="M12 0C12.6 7.2 16.8 11.4 24 12C16.8 12.6 12.6 16.8 12 24C11.4 16.8 7.2 12.6 0 12C7.2 11.4 11.4 7.2 12 0Z"
                        />
                      </svg>
                      We&apos;d suggest · {rec.line}
                    </p>{" "}
                    <h3
                      style={{
                        margin: "10px 0 0",
                        font: "300 clamp(40px,3vw + 16px,56px)/1 var(--font-display)",
                        color: "#2E1A16",
                        letterSpacing: "-.05em",
                      }}
                    >
                      {rec.name}
                    </h3>{" "}
                    <p style={{ margin: "12px 0 0", font: "400 16px/1.6 var(--font-body)", color: "#6B3F35" }}>
                      {rec.contentsText}, wrapped with a handwritten or voice note.
                    </p>{" "}
                    <p style={{ margin: "14px 0 0", font: "600 20px/1.2 var(--font-body)", color: "#2E1A16" }}>
                      {rec.price}
                    </p>{" "}
                    <p style={{ margin: "14px 0 0", font: "400 14px/1.5 var(--font-body)", color: "#6B3F35" }}>
                      For {summaryWho} · {summaryVibe} · {summaryBudget}
                    </p>{" "}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "10px",
                        marginTop: "22px",
                      }}
                    >
                      <Link
                        className="ix-h4 ix-a3"
                        href="/contact"
                        onClick={rec.onClick}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "10px",
                          minHeight: "54px",
                          padding: "0 28px",
                          border: "0",
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
                          cursor: "pointer",
                          transition:
                            "background-position 800ms cubic-bezier(.23,1,.32,1), transform 180ms cubic-bezier(.34,1.56,.64,1)",
                        }}
                      >
                        Request this gift
                      </Link>{" "}
                      <button
                        className="ix-a3"
                        type="button"
                        onClick={restart}
                        style={{
                          minHeight: "52px",
                          padding: "0 18px",
                          border: "0",
                          borderRadius: "999px",
                          background: "transparent",
                          color: "#2E1A16",
                          font: "500 15px var(--font-body)",
                          textDecoration: "underline",
                          textDecorationColor: "#C99A5B",
                          textUnderlineOffset: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Start again
                      </button>
                    </div>{" "}
                    <p style={{ margin: "10px 0 0", font: "400 13px/1.5 var(--font-body)", color: "#6B3F35" }}>
                      Your answers come with you, so there&apos;s nothing to repeat.
                    </p>
                  </div>
                </div>
              </>
            )}{" "}
            {notResult && (
              <>
                <p
                  style={{
                    margin: "28px 0 0",
                    paddingTop: "18px",
                    borderTop: "1px solid rgba(46,26,22,.08)",
                    font: "400 14px/1.6 var(--font-body)",
                    color: "#6B3F35",
                  }}
                >
                  Rather just talk?{" "}
                  <a
                    href={skipHref}
                    target="_blank"
                    rel="noopener"
                    onClick={skipClick}
                    style={{ color: "#2E1A16", fontWeight: "500" }}
                  >
                    Skip and chat with us
                  </a>{" "}
                  (opens WhatsApp).
                </p>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
