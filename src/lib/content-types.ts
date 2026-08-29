export type NavLink = {
  label: string;
  href: string;
};

export type StatItem = {
  value: string;
  prefix: string;
  label: string;
  sublabel: string;
};

export type GalleryItem = {
  image: string | null;
  tag: string;
  description: string;
};

export type DirectionItem = {
  title: string;
  description: string;
  image: string | null;
};

export type SiteContent = {
  seo: {
    title: string;
    description: string;
  };
  company: {
    name: string;
    legalName: string;
    phone: string;
    email: string;
    whatsappNumber: string;
    foundedYear: number;
    instagramUrl: string;
    telegramUrl: string;
  };
  nav: NavLink[];
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
  featuredProject: {
    title: string;
    description: string;
    image: string | null;
    ctaLabel: string;
    ctaHref: string;
  };
  stats: StatItem[];
  about: {
    title: string;
    paragraphs: string[];
    image: string | null;
  };
  gallery: GalleryItem[];
  directions: DirectionItem[];
  ctaSection: {
    title: string;
    description: string;
    whatsappLabel: string;
    emailLabel: string;
    backgroundImage: string | null;
    backgroundOpacity: number;
  };
  footer: {
    copyright: string;
  };
};
