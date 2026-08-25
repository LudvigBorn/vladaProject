import "server-only";
import { revalidatePath } from "next/cache";
import { prisma } from "./db";
import { defaultContent } from "./default-content";
import type { SiteContent } from "./content-types";

const CONTENT_ID = 1;

// Shallow-merge saved JSON over the defaults so newly added fields always
// have a value even for content saved before they existed.
function mergeWithDefaults(saved: Partial<SiteContent>): SiteContent {
  return {
    ...defaultContent,
    ...saved,
    seo: { ...defaultContent.seo, ...saved.seo },
    company: { ...defaultContent.company, ...saved.company },
    hero: { ...defaultContent.hero, ...saved.hero },
    featuredProject: { ...defaultContent.featuredProject, ...saved.featuredProject },
    about: { ...defaultContent.about, ...saved.about },
    ctaSection: { ...defaultContent.ctaSection, ...saved.ctaSection },
    footer: { ...defaultContent.footer, ...saved.footer },
    nav: saved.nav ?? defaultContent.nav,
    stats: saved.stats ?? defaultContent.stats,
    gallery: saved.gallery ?? defaultContent.gallery,
    directions: saved.directions ?? defaultContent.directions,
  };
}

export async function getContent(): Promise<SiteContent> {
  const row = await prisma.pageContent.findUnique({ where: { id: CONTENT_ID } });
  if (!row) return defaultContent;
  try {
    const parsed = JSON.parse(row.data) as Partial<SiteContent>;
    return mergeWithDefaults(parsed);
  } catch {
    return defaultContent;
  }
}

export async function saveContent(content: SiteContent): Promise<void> {
  await prisma.pageContent.upsert({
    where: { id: CONTENT_ID },
    create: { id: CONTENT_ID, data: JSON.stringify(content) },
    update: { data: JSON.stringify(content) },
  });
  // Content is served statically (ISR) so edits show up immediately without a rebuild.
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
}
