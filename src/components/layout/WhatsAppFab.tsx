"use client";

import { useSite } from "@/components/providers/SiteProvider";
import { useWhatsApp } from "@/hooks/useNav";
export function WhatsAppFab() {
  const { menuOpen, isWide, focus } = useSite();
  const { fabHref, fabClick, waHello } = useWhatsApp();
  // Hidden while the menu is open, and while a form field is focused on smaller screens.
  const showFab = !menuOpen && !(!isWide && focus);

  return (
    <>
      {showFab && (
        <>
          <a
            className="ix-hf ix-ag"
            href={fabHref}
            target="_blank"
            rel="noopener"
            onClick={fabClick}
            onMouseEnter={waHello}
            aria-label="Chat with Aloha on WhatsApp (opens WhatsApp)"
            style={{
              position: "fixed",
              right: "max(16px, env(safe-area-inset-right))",
              bottom: "max(16px, env(safe-area-inset-bottom))",
              zIndex: "40",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              minHeight: "58px",
              padding: "0 var(--fab-pad-r) 0 0",
              borderRadius: "999px",
              background: "var(--fab-bg)",
              color: "#FBF7F2",
              font: "500 15px var(--font-body)",
              textDecoration: "none",
              boxShadow: "0 14px 30px -12px rgba(46,26,22,.55)",
              transition: "transform 180ms cubic-bezier(.34,1.56,.64,1), background-color 200ms ease",
              animation: "riseIn 500ms cubic-bezier(.23,1,.32,1) 1200ms both",
            }}
          >
            <span
              data-wa-icon=""
              style={{
                width: "58px",
                height: "58px",
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
                  width: "26px",
                  height: "26px",
                  backgroundColor: "currentColor",
                  WebkitMask: "url(/assets/icons/whatsapp.svg) center / contain no-repeat",
                  mask: "url(/assets/icons/whatsapp.svg) center / contain no-repeat",
                }}
              />
            </span>{" "}
            <div className="only-wide">
              <span>Chat with us</span>
            </div>
          </a>
        </>
      )}
    </>
  );
}
