import type { SiteContent } from "@/lib/content-types";
import { Container } from "./Container";
import { SmartImage } from "./SmartImage";

export function Gallery({ content }: { content: SiteContent }) {
  return (
    <section id="projects" className="scroll-mt-24 bg-white ">
      <Container className="pb-12 sm:pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.gallery.map((item, i) => (
            <div key={i}>
              <SmartImage
                src={item.image}
                alt={item.tag}
                className="aspect-[3/4] w-full"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              />
              <p className="mt-3 text-sm font-bold text-navy-950">{item.tag}</p>
              <p className="mt-1 text-sm leading-relaxed text-navy-600">{item.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
