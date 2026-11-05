"use client";

import { Fragment, useRef, type MouseEvent } from "react";
import Link from "next/link";
import { useSite } from "@/components/providers/SiteProvider";
import { track } from "@/lib/analytics";

export function NoteComposer() {
  const { note, setNote, isReduced, isFinePointer, burstFrom, navigate } = useSite();
  const noteRef = useRef<HTMLDivElement>(null);
  const noteTo = note.to;
  const noteText = note.text;
  const noteToShow = note.to.trim() || "you";
  const onNoteTo = (e: { target: { value: string } }) => setNote((n) => ({ ...n, to: e.target.value }));
  const onNoteText = (e: { target: { value: string } }) => setNote((n) => ({ ...n, text: e.target.value }));
  const noteChars = Array.from(note.text).map((c) => ({ c }));
  const noteEmpty = !note.text;
  const noteCount = `${noteChars.length} / 180`;

  const noteClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (!note.text.trim()) {
      document.querySelector<HTMLTextAreaElement>("#note textarea")?.focus();
      return;
    }
    track("note_attached", {});
    burstFrom(e.currentTarget);
    setTimeout(() => navigate("contact", null, "contact"), isReduced() ? 0 : 320);
  };
  /** The card leans toward the pointer (up to 4°). */
  const noteMove = (e: MouseEvent<HTMLElement>) => {
    if (isReduced() || !isFinePointer()) return;
    const card = noteRef.current;
    if (!card) return;
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `perspective(1000px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 8).toFixed(2)}deg) rotate(-2deg)`;
  };
  const noteLeave = () => {
    if (noteRef.current) noteRef.current.style.transform = "perspective(1000px) rotate(-2deg)";
  };

  return (
    <>
      <section
        id="note"
        aria-labelledby="note-title"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#2E1A16",
          color: "#F3E8DC",
          padding: "clamp(64px,8vw,128px) clamp(20px,4vw,48px)",
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            right: "-10%",
            top: "10%",
            width: "70%",
            height: "90%",
            background: "radial-gradient(closest-side, rgba(180,105,90,.32), transparent)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            maxWidth: "1240px",
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "clamp(40px,6vw,96px)",
          }}
        >
          <div data-reveal="" style={{ flex: "1 1 380px", minWidth: "0", maxWidth: "540px" }}>
            <p
              style={{
                margin: "0",
                font: "600 12px/1.2 var(--font-body)",
                letterSpacing: ".3em",
                textTransform: "uppercase",
                color: "#C99A5B",
              }}
            >
              The note
            </p>{" "}
            <h2
              id="note-title"
              style={{
                margin: "14px 0 0",
                font: "300 clamp(36px,2.8vw + 14px,56px)/1.06 var(--font-display)",
                color: "#FBF7F2",
                letterSpacing: "-.05em",
              }}
            >
              Say it in <em style={{ fontStyle: "italic", color: "#E7C3B5" }}>your</em> words.
            </h2>{" "}
            <p
              style={{
                margin: "16px 0 0",
                font: "400 clamp(16px,.4vw + 14.5px,18px)/1.6 var(--font-body)",
                color: "#F3E8DC",
                textWrap: "pretty",
              }}
            >
              Every gift leaves with a note. Write yours here and watch it land on the card. We&apos;ll copy it out by
              hand, or record it as a voice note if you&apos;d rather.
            </p>{" "}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "30px" }}>
              <label
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  font: "500 14px var(--font-body)",
                  color: "#F3E8DC",
                }}
              >
                Who&apos;s it for? <span style={{ fontWeight: "400", color: "#E7C3B5" }}>(optional)</span>{" "}
                <input
                  className="ix-f9"
                  type="text"
                  value={noteTo}
                  onChange={onNoteTo}
                  maxLength={40}
                  autoComplete="off"
                  placeholder="e.g. Ama"
                  style={{
                    height: "52px",
                    padding: "0 16px",
                    borderRadius: "14px",
                    border: "1px solid rgba(243,232,220,.28)",
                    background: "rgba(251,247,242,.06)",
                    color: "#FBF7F2",
                    font: "400 16px var(--font-body)",
                    outline: "none",
                    transition: "border-color 200ms ease",
                  }}
                />
              </label>{" "}
              <label
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  font: "500 14px var(--font-body)",
                  color: "#F3E8DC",
                }}
              >
                Your note{" "}
                <textarea
                  className="ix-f9"
                  value={noteText}
                  onChange={onNoteText}
                  maxLength={180}
                  rows={3}
                  placeholder="Happy birthday, my love. Wear this and think of me."
                  style={{
                    padding: "14px 16px",
                    borderRadius: "14px",
                    border: "1px solid rgba(243,232,220,.28)",
                    background: "rgba(251,247,242,.06)",
                    color: "#FBF7F2",
                    font: "400 16px/1.5 var(--font-body)",
                    resize: "vertical",
                    outline: "none",
                    transition: "border-color 200ms ease",
                  }}
                />
              </label>{" "}
              <p
                aria-live="polite"
                style={{ margin: "-4px 0 0", textAlign: "right", font: "400 13px var(--font-body)", color: "#E7C3B5" }}
              >
                {noteCount}
              </p>
            </div>{" "}
            <div
              style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px 16px", marginTop: "12px" }}
            >
              <Link
                className="ix-ha ix-a3"
                href="/contact"
                onClick={noteClick}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "10px",
                  minHeight: "54px",
                  padding: "0 26px",
                  borderRadius: "999px",
                  background: "#FBF7F2",
                  color: "#2E1A16",
                  font: "500 16px var(--font-body)",
                  textDecoration: "none",
                  transition: "background-color 200ms ease, transform 180ms cubic-bezier(.34,1.56,.64,1)",
                }}
              >
                <span style={{ color: "#B4695A", display: "flex" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fill="currentColor"
                      d="M12 0C12.6 7.2 16.8 11.4 24 12C16.8 12.6 12.6 16.8 12 24C11.4 16.8 7.2 12.6 0 12C7.2 11.4 11.4 7.2 12 0Z"
                    />
                  </svg>
                </span>
                Attach to my gift request
              </Link>{" "}
              <span style={{ font: "400 13px/1.5 var(--font-body)", color: "#E7C3B5" }}>
                Your note travels with your request.
              </span>
            </div>
          </div>{" "}
          <div
            onMouseMove={noteMove}
            onMouseLeave={noteLeave}
            style={{ flex: "1 1 380px", minWidth: "0", display: "flex", justifyContent: "center", padding: "20px 0" }}
          >
            <div
              ref={noteRef}
              aria-hidden="true"
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "500px",
                minHeight: "320px",
                padding: "clamp(24px,3vw,40px)",
                background: "#FBF7F2",
                borderRadius: "4px",
                boxShadow: "0 50px 80px -40px rgba(0,0,0,.7), 0 0 0 1px rgba(201,154,91,.25)",
                transform: "perspective(1000px) rotate(-2deg)",
                transition: "transform 320ms cubic-bezier(.23,1,.32,1)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: "10px",
                  border: "1px solid rgba(201,154,91,.5)",
                  borderRadius: "2px",
                  pointerEvents: "none",
                }}
              />{" "}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: "12px" }}>
                <span
                  style={{
                    font: "600 10px/1 var(--font-body)",
                    letterSpacing: ".3em",
                    textTransform: "uppercase",
                    color: "#6B3F35",
                  }}
                >
                  Aloha Scents · a note for
                </span>{" "}
                <span style={{ font: "400 30px/1 var(--font-script)", color: "#B4695A" }}>{noteToShow}</span>
              </div>{" "}
              <p
                style={{
                  flex: "1",
                  margin: "24px 0 18px",
                  font: "400 clamp(26px,2.2vw + 10px,36px)/1.4 var(--font-script)",
                  color: "#6B3F35",
                  whiteSpace: "pre-wrap",
                  overflowWrap: "anywhere",
                }}
              >
                {noteChars.map((ch, i) => (
                  <Fragment key={i}>
                    <span style={{ animation: "inkIn 650ms cubic-bezier(.23,1,.32,1) both" }}>{ch.c}</span>
                  </Fragment>
                ))}
                {noteEmpty && (
                  <>
                    <span style={{ color: "rgba(107,63,53,.42)" }}>Your words will appear here…</span>
                  </>
                )}
              </p>{" "}
              <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "10px" }}>
                <span style={{ font: "400 28px/1 var(--font-script)", color: "#6B3F35" }}>with love</span>{" "}
                <svg width="14" height="14" viewBox="0 0 24 24">
                  <path
                    fill="#C99A5B"
                    d="M12 0C12.6 7.2 16.8 11.4 24 12C16.8 12.6 12.6 16.8 12 24C11.4 16.8 7.2 12.6 0 12C7.2 11.4 11.4 7.2 12 0Z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
