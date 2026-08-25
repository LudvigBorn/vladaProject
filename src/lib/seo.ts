import type { SiteContent } from "./content-types";

export function organizationJsonLd(content: SiteContent) {
  const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: content.company.name,
    legalName: content.company.legalName,
    url: siteUrl,
    telephone: content.company.phone,
    email: content.company.email,
    foundingDate: String(content.company.foundedYear),
    address: {
      "@type": "PostalAddress",
      addressCountry: "KZ",
    },
    areaServed: "KZ",
    sameAs: [content.company.instagramUrl, content.company.telegramUrl].filter(Boolean),
    knowsAbout: content.directions.map((d) => d.title),
  };
}
