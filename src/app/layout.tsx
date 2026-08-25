import type { Metadata, Viewport } from "next";
import { Roboto_Flex } from "next/font/google";
import "./globals.css";
import { getContent } from "@/lib/content";
import { organizationJsonLd } from "@/lib/seo";

const robotoFlex = Roboto_Flex({
  variable: "--font-roboto-flex",
  subsets: ["latin", "cyrillic"],
  axes: ["opsz"],
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: content.seo.title,
      template: `%s — ${content.company.name}`,
    },
    description: content.seo.description,
    applicationName: content.company.name,
    alternates: { canonical: "/" },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      url: siteUrl,
      siteName: content.company.name,
      locale: "ru_RU",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const content = await getContent();
  const jsonLd = organizationJsonLd(content);

  return (
    <html lang="ru" className={`${robotoFlex.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-navy-950 font-sans">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
