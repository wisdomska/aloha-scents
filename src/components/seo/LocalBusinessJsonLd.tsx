import { CONTACT } from "@/content/site";
import { SITE } from "@/lib/site-config";

/** schema.org structured data so search engines understand the business (Accra, Ghana). */
export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Store",
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    logo: `${SITE.url}/assets/logo-horizontal.png`,
    image: `${SITE.url}/opengraph-image`,
    telephone: CONTACT.whatsappDisplay.replace(/\s/g, ""),
    address: { "@type": "PostalAddress", addressLocality: "Accra", addressCountry: "GH" },
    areaServed: "Ghana",
    priceRange: "GHS 300 – 1,000",
    sameAs: [CONTACT.instagram.url, CONTACT.tiktok.url],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
