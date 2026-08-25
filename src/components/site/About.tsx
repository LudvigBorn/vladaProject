import type { SiteContent } from "@/lib/content-types";
import { Container } from "./Container";
import { SmartImage } from "./SmartImage";

export function About({ content }: { content: SiteContent }) {
  const { about } = content;

  return (
    <section id="about" className="scroll-mt-24 bg-white">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">{about.title}</h2>
            <div className="mt-6 space-y-5 text-navy-700 leading-relaxed">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <SmartImage
            src={about.image}
            alt={about.title}
            className="aspect-[4/3] w-full lg:aspect-auto lg:h-full"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
      </Container>
    </section>
  );
}
