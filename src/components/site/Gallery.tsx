import type { SiteContent } from "@/lib/content-types";
import { Container } from "./Container";
import { SmartImage } from "./SmartImage";

export function Gallery({ content }: { content: SiteContent }) {
  return (
    <section id="projects" className="scroll-mt-24 bg-white ">
      <Container className="mt-7">
        <div className="grid gap-7 sm:grid-cols-2 ">
          {content.gallery.map((item, i) => (
            <div
              key={i}
              className="group relative aspect-square overflow-hidden"
            >
              <SmartImage
                src={item.image}
                alt={item.tag}
                className="h-full w-full"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy-950/90 via-navy-950/20 to-transparent transition-opacity duration-300 group-hover:opacity-0" />
              <div className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-300 ease-in group-hover:translate-y-full">
                <p className="text-lg text-white font-bold uppercase">
                  {item.tag}
                </p>
                <p className="mt-2 text-base leading-snug text-white/85">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
