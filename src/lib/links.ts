import type { SiteContent } from "./content-types";

/** wa.me links require a plain digit string (no "+", spaces, or dashes). */
export function getWhatsappHref(company: Pick<SiteContent["company"], "whatsappNumber">): string {
  return `https://wa.me/${company.whatsappNumber.replace(/[^\d]/g, "")}`;
}

/** tel: links may keep the leading "+", unlike wa.me. */
export function getTelHref(phone: string): string {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}
