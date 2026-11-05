import "react";

declare module "react" {
  interface CSSProperties {
    /** Allow CSS custom properties in inline styles. */
    [key: `--${string}`]: string | number | undefined;
  }
}
