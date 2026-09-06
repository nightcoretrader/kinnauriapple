import { dictionaries } from "@/i18n/dictionaries";
import { facts } from "@/content/site";
import { getSiteUrl } from "@/lib/siteUrl";

export function JsonLd() {
  const faqs = dictionaries.en.faq.items;
  const siteUrl = getSiteUrl();
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kinnaur Apple",
    url: siteUrl,
    description: "Orchard-direct seller of GI-tagged Kinnauri apples from Kinnaur, Himachal Pradesh.",
    areaServed: "IN",
    address: { "@type": "PostalAddress", addressRegion: "Himachal Pradesh", addressCountry: "IN" },
  };
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "GI-tagged Kinnauri Apple",
    description: `Premium hand-graded apples grown at ${facts.altitude} in ${facts.origin}. ${facts.gi}.`,
    brand: { "@type": "Brand", name: "Kinnaur Apple" },
    category: "Fresh fruit",
    additionalProperty: [
      { "@type": "PropertyValue", name: "GI tag", value: "Kinnauri Apple" },
      { "@type": "PropertyValue", name: "Altitude", value: facts.altitude },
      { "@type": "PropertyValue", name: "Growth cycle", value: facts.hangTime },
    ],
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: "300",
      availability: "https://schema.org/PreOrder",
      description: facts.priceAnchor,
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
    </>
  );
}
