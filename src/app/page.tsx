import { getContent } from "@/lib/content";
import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { About } from "@/components/site/About";
import { Gallery } from "@/components/site/Gallery";
import { Directions } from "@/components/site/Directions";
import { CtaSection } from "@/components/site/CtaSection";
import { Footer } from "@/components/site/Footer";

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Header content={content} />
      <main className="flex-1">
        <Hero content={content} />
        <Stats content={content} />
        <About content={content} />
        <Gallery content={content} />
        <Directions content={content} />
        <CtaSection content={content} />
      </main>
      <Footer content={content} />
    </>
  );
}
