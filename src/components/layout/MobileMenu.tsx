"use client";

import Image from "next/image";
import { Fragment } from "react";
import Link from "next/link";
import { useSite } from "@/components/providers/SiteProvider";
import { useNav, useWhatsApp } from "@/hooks/useNav";

export function MobileMenu() {
  const { menuOpen, closeMenu, closeRef } = useSite();
  const menuNav = useNav();
  const { fabHref, headerWaClick } = useWhatsApp();

  return (
    <>
      {menuOpen && (
        <>
          <div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            style={{
              position: "fixed",
              inset: "0",
              zIndex: "80",
              background: "#2E1A16",
              color: "#F3E8DC",
              display: "flex",
              flexDirection: "column",
              padding: "18px clamp(20px,5vw,40px) max(24px, env(safe-area-inset-bottom))",
              overflow: "auto",
              animation: "fadeIn 220ms ease both",
            }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: "0",
                backgroundImage: 'url("/assets/monogram-tile.png")',
                backgroundSize: "80px 80px",
                pointerEvents: "none",
              }}
            />{" "}
            <div
              style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <Image
                src="/assets/logo-horizontal-sand.png"
                alt="Aloha Scents"
                width={572}
                height={138}
                style={{ display: "block", width: "auto", height: "36px" }}
              />{" "}
              <button
                type="button"
                ref={closeRef}
                onClick={closeMenu}
                style={{
                  minHeight: "48px",
                  padding: "0 18px",
                  borderRadius: "999px",
                  border: "1px solid rgba(243,232,220,.3)",
                  background: "transparent",
                  color: "#FBF7F2",
                  font: "500 15px var(--font-body)",
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>{" "}
            <nav aria-label="Mobile" style={{ position: "relative", marginTop: "auto", padding: "40px 0" }}>
              <ul
                style={{
                  listStyle: "none",
                  margin: "0",
                  padding: "0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                {menuNav.map((n, i) => (
                  <Fragment key={i}>
                    <li style={{ animation: `riseIn 420ms cubic-bezier(.23,1,.32,1) ${n.delay} both` }}>
                      <Link
                        href={n.href}
                        aria-current={n.current}
                        onClick={n.onClick}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          minHeight: "60px",
                          color: "#FBF7F2",
                          font: "300 clamp(36px,9vw,52px)/1.1 var(--font-display)",
                          textDecoration: "none",
                          borderBottom: "1px solid rgba(201,154,91,.25)",
                        }}
                      >
                        {n.label}
                        <span
                          aria-hidden="true"
                          style={{ font: "400 18px var(--font-body)", color: "#C99A5B", opacity: n.mark }}
                        >
                          ✦
                        </span>
                      </Link>
                    </li>
                  </Fragment>
                ))}
              </ul>
            </nav>{" "}
            <a
              href={fabHref}
              target="_blank"
              rel="noopener"
              onClick={headerWaClick}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                minHeight: "56px",
                borderRadius: "999px",
                background: "#FBF7F2",
                color: "#2E1A16",
                font: "500 16px var(--font-body)",
                textDecoration: "none",
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  flex: "none",
                  display: "block",
                  width: "20px",
                  height: "20px",
                  backgroundColor: "currentColor",
                  WebkitMask: "url(/assets/icons/whatsapp.svg) center / contain no-repeat",
                  mask: "url(/assets/icons/whatsapp.svg) center / contain no-repeat",
                }}
              />
              Chat on WhatsApp
            </a>{" "}
            <p
              style={{
                position: "relative",
                margin: "10px 0 0",
                textAlign: "center",
                font: "400 13px var(--font-body)",
                color: "#E7C3B5",
              }}
            >
              Opens WhatsApp
            </p>
          </div>
        </>
      )}
    </>
  );
}
