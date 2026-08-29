import { z } from "zod";

const navLinkSchema = z.object({
  label: z.string().min(1).max(60),
  href: z.string().min(1).max(200),
});

const statItemSchema = z.object({
  value: z.string().min(1).max(20),
  prefix: z.string().max(20),
  label: z.string().min(1).max(60),
  sublabel: z.string().max(60),
});

const galleryItemSchema = z.object({
  image: z.string().max(500).nullable(),
  tag: z.string().max(200),
  description: z.string().max(500),
});

const directionItemSchema = z.object({
  title: z.string().min(1).max(150),
  description: z.string().max(600),
  image: z.string().max(500).nullable(),
});

export const siteContentSchema = z.object({
  seo: z.object({
    title: z.string().min(1).max(200),
    description: z.string().min(1).max(500),
  }),
  company: z.object({
    name: z.string().min(1).max(100),
    legalName: z.string().min(1).max(200),
    phone: z.string().min(1).max(40),
    email: z.string().email().max(150),
    whatsappNumber: z.string().min(1).max(30),
    foundedYear: z.number().int().min(1900).max(2100),
    instagramUrl: z.string().max(300),
    telegramUrl: z.string().max(300),
  }),
  nav: z.array(navLinkSchema).max(10),
  hero: z.object({
    eyebrow: z.string().max(150),
    title: z.string().min(1).max(150),
    description: z.string().max(500),
    primaryCtaLabel: z.string().max(60),
    primaryCtaHref: z.string().max(200),
    secondaryCtaLabel: z.string().max(60),
    secondaryCtaHref: z.string().max(200),
  }),
  featuredProject: z.object({
    title: z.string().max(200),
    description: z.string().max(600),
    image: z.string().max(500).nullable(),
    ctaLabel: z.string().max(60),
    ctaHref: z.string().max(200),
  }),
  stats: z.array(statItemSchema).max(8),
  about: z.object({
    title: z.string().max(150),
    paragraphs: z.array(z.string().max(1500)).max(10),
    image: z.string().max(500).nullable(),
  }),
  gallery: z.array(galleryItemSchema).max(12),
  directions: z.array(directionItemSchema).max(12),
  ctaSection: z.object({
    title: z.string().max(150),
    description: z.string().max(500),
    whatsappLabel: z.string().max(60),
    emailLabel: z.string().max(60),
    backgroundImage: z.string().max(500).nullable(),
    backgroundOpacity: z.number().min(0).max(100),
  }),
  footer: z.object({
    copyright: z.string().max(200),
  }),
});
