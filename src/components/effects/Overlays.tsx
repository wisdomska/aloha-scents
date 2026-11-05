"use client";

import { useSite } from "@/components/providers/SiteProvider";
export function Overlays() {
  const { cursorRef, burstRef } = useSite();

  return (
    <>
      <div
        ref={cursorRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          left: "0",
          top: "0",
          zIndex: "90",
          width: "14px",
          height: "14px",
          margin: "-7px 0 0 -7px",
          pointerEvents: "none",
          opacity: "0",
          transition: "opacity 220ms ease",
        }}
      >
        <svg viewBox="0 0 24 24" width="14" height="14">
          <path
            fill="#C99A5B"
            d="M12 0C12.6 7.2 16.8 11.4 24 12C16.8 12.6 12.6 16.8 12 24C11.4 16.8 7.2 12.6 0 12C7.2 11.4 11.4 7.2 12 0Z"
          />
        </svg>
      </div>
      <div
        ref={burstRef}
        aria-hidden="true"
        style={{ position: "fixed", inset: "0", zIndex: "95", pointerEvents: "none" }}
      />
    </>
  );
}
