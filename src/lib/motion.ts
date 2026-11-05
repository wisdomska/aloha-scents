export const EASE = "cubic-bezier(0.23, 1, 0.32, 1)";

const SPARK_PATH =
  "M12 0C12.6 7.2 16.8 11.4 24 12C16.8 12.6 12.6 16.8 12 24C11.4 16.8 7.2 12.6 0 12C7.2 11.4 11.4 7.2 12 0Z";

/** Four-point amber star burst, used as a tiny thank-you on key actions. */
export function burst(host: HTMLElement | null, x: number, y: number) {
  if (!host) return;
  for (let i = 0; i < 9; i++) {
    const s = document.createElement("div");
    const size = 8 + Math.random() * 8;
    s.innerHTML = `<svg viewBox="0 0 24 24" width="100%" height="100%"><path fill="currentColor" d="${SPARK_PATH}"/></svg>`;
    s.style.cssText = `position:fixed;left:${x}px;top:${y}px;width:${size}px;height:${size}px;margin:${-size / 2}px 0 0 ${-size / 2}px;color:#C99A5B;pointer-events:none`;
    host.appendChild(s);
    const a = (i / 9) * Math.PI * 2 + Math.random() * 0.5;
    const d = 30 + Math.random() * 26;
    s.animate(
      [
        { transform: "translate(0,0) scale(.4) rotate(0deg)", opacity: 1 },
        { transform: `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px) scale(1) rotate(60deg)`, opacity: 0 },
      ],
      { duration: 560, easing: EASE },
    ).onfinish = () => s.remove();
  }
}
