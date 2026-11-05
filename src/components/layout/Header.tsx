"use client";

import Image from "next/image";
import { Fragment, useCallback, useEffect, useRef, type MouseEvent } from "react";
import Link from "next/link";
import { useSite } from "@/components/providers/SiteProvider";
import { useNav, useWhatsApp } from "@/hooks/useNav";

export function Header() {
  const { page, activeKey, scrolled, menuOpen, openMenu, menuBtnRef, navigate, status, setStatus } = useSite();
  const nav = useNav();
  const { fabHref, headerWaClick, waHello } = useWhatsApp();
  const navRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  // Sliding underline: follows hover/focus, rests on the active item.
  const moveBar = useCallback((el: Element | null) => {
    const bar = barRef.current;
    const navEl = navRef.current;
    if (!bar || !navEl) return;
    if (!el) {
      bar.style.opacity = "0";
      return;
    }
    const nr = navEl.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    bar.style.opacity = "1";
    bar.style.transform = `translateX(${r.left - nr.left}px) scaleX(${r.width})`;
  }, []);
  const barToActive = useCallback(
    () => moveBar(navRef.current?.querySelector('[aria-current="page"]') ?? null),
    [moveBar],
  );

  useEffect(() => {
    const raf = requestAnimationFrame(barToActive);
    document.fonts?.ready.then(barToActive);
    window.addEventListener("resize", barToActive);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", barToActive);
    };
  }, [activeKey, barToActive]);

  const navEnter = (e: { currentTarget: Element }) => moveBar(e.currentTarget);
  const navLeave = () => barToActive();

  const hdrBg = scrolled ? "rgba(251,247,242,.84)" : "rgba(251,247,242,0)";
  const hdrBlur = scrolled ? "blur(14px) saturate(1.2)" : "none";
  const hdrLine = scrolled ? "rgba(46,26,22,.08)" : "rgba(46,26,22,0)";
  const hdrPad = scrolled ? "8px" : "20px";
  const logoH = scrolled ? "34px" : "var(--logo-h)";
  const hdrSpace = page === "home" ? "0px" : "var(--hdr-space)";
  const menuExpanded = menuOpen;
  const goHome = (e: MouseEvent) => {
    e.preventDefault();
    if (status === "success") setStatus("idle");
    navigate("home", null, "home");
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          right: "0",
          zIndex: "50",
          background: hdrBg,
          backdropFilter: hdrBlur,
          WebkitBackdropFilter: hdrBlur,
          borderBottom: `1px solid ${hdrLine}`,
          transition: "background-color 300ms ease, border-color 300ms ease",
        }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: `${hdrPad} clamp(20px,4vw,48px)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            transition: "padding 300ms cubic-bezier(.23,1,.32,1)",
          }}
        >
          <Link
            href="/"
            onClick={goHome}
            aria-label="Aloha Scents, home"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              textDecoration: "none",
              color: "#2E1A16",
              minHeight: "44px",
            }}
          >
            <Image
              src="/assets/logo-horizontal.png"
              loading="eager"
              alt="Aloha Scents"
              width={572}
              height={138}
              style={{
                display: "block",
                width: "auto",
                height: logoH,
                transition: "height 300ms cubic-bezier(.23,1,.32,1)",
              }}
            />
          </Link>{" "}
          <div className="only-wide">
            <nav
              aria-label="Main"
              ref={navRef}
              onMouseLeave={navLeave}
              style={{ position: "relative", display: "flex", gap: "clamp(18px,2.2vw,34px)" }}
            >
              {nav.map((n, i) => (
                <Fragment key={i}>
                  <Link
                    className="ix-h1"
                    href={n.href}
                    aria-current={n.current}
                    onClick={n.onClick}
                    onMouseEnter={navEnter}
                    onFocus={navEnter}
                    style={{
                      padding: "12px 0",
                      font: "500 15px var(--font-body)",
                      color: n.color,
                      textDecoration: "none",
                      transition: "color 200ms ease",
                    }}
                  >
                    {n.label}
                  </Link>
                </Fragment>
              ))}
              <span
                ref={barRef}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  left: "0",
                  bottom: "5px",
                  width: "1px",
                  height: "1.5px",
                  background: "#B4695A",
                  transformOrigin: "left center",
                  opacity: "0",
                  transition: "transform 340ms cubic-bezier(.23,1,.32,1), opacity 200ms ease",
                }}
              />
            </nav>
            <a
              className="ix-h2 ix-a3"
              href={fabHref}
              target="_blank"
              rel="noopener"
              onClick={headerWaClick}
              onMouseEnter={waHello}
              aria-label="Chat on WhatsApp (opens WhatsApp)"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                minHeight: "46px",
                padding: "0 20px 0 7px",
                borderRadius: "999px",
                background: "#6B3F35",
                color: "#FBF7F2",
                font: "500 15px var(--font-body)",
                textDecoration: "none",
                transition: "background-color 200ms ease, transform 180ms cubic-bezier(.34,1.56,.64,1)",
              }}
            >
              <span
                data-wa-icon=""
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "#B4695A",
                  display: "grid",
                  placeItems: "center",
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
              </span>{" "}
              Chat on WhatsApp
            </a>
          </div>{" "}
          <div className="only-narrow">
            <button
              className="ix-a3"
              type="button"
              ref={menuBtnRef}
              onClick={openMenu}
              aria-expanded={menuExpanded}
              aria-controls="mobile-menu"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                minHeight: "48px",
                padding: "0 18px",
                borderRadius: "999px",
                border: "1px solid rgba(46,26,22,.22)",
                background: "transparent",
                color: "#2E1A16",
                font: "500 15px var(--font-body)",
                cursor: "pointer",
                transition: "transform 180ms cubic-bezier(.34,1.56,.64,1)",
              }}
            >
              <span aria-hidden="true" style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                <span style={{ width: "18px", height: "1.5px", background: "currentColor" }} />
                <span style={{ width: "12px", height: "1.5px", background: "currentColor" }} />
              </span>{" "}
              Menu
            </button>
          </div>
        </div>
      </header>
      <div aria-hidden="true" style={{ height: hdrSpace, background: "#F3E8DC" }} />
    </>
  );
}
