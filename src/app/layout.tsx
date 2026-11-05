import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, DM_Sans, Pinyon_Script } from "next/font/google";
import { Overlays } from "@/components/effects/Overlays";
import { RevealObserver } from "@/components/effects/RevealObserver";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { SkipLink } from "@/components/layout/SkipLink";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { SiteProvider } from "@/components/providers/SiteProvider";
import { LocalBusinessJsonLd } from "@/components/seo/LocalBusinessJsonLd";
import { RibbonToFooter } from "@/components/ui/SilkRibbon";
import { SITE } from "@/lib/site-config";
import "./globals.css";
import "./interactions.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});
const body = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});
const script = Pinyon_Script({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: SITE.title, template: "%s · Aloha Scents" },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "perfume Accra",
    "perfume oils Ghana",
    "gift sets Accra",
    "Dubai perfumes Ghana",
    "body splash",
    "Aloha Scents",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GH",
    url: "/",
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
  },
  twitter: { card: "summary_large_image", title: SITE.title, description: SITE.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FBF7F2",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GH" className={`${display.variable} ${body.variable} ${script.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal styles only when JavaScript runs, so content is never hidden without it. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <SiteProvider>
          <SkipLink />
          <Header />
          <main id="main" tabIndex={-1} style={{ outline: "none" }}>
            {children}
          </main>
          <RibbonToFooter />
          <Footer />
          <WhatsAppFab />
          <MobileMenu />
          <Overlays />
          <RevealObserver />
        </SiteProvider>
        <LocalBusinessJsonLd />
      </body>
    </html>
  );
}
