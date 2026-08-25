import type { SiteContent } from "@/lib/content-types";
import { Container } from "./Container";
import { SmartImage } from "./SmartImage";

export function Directions({ content }: { content: SiteContent }) {
  return (
    <section id="directions" className="scroll-mt-24 bg-navy-50">
      <Container className="py-12 sm:py-16">
        <h2 className="text-3xl font-extrabold tracking-tight text-navy-950 sm:text-4xl">Направления</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.directions.map((direction, i) => (
            <div key={i} className="overflow-hidden border border-navy-100 bg-white">
              <SmartImage src={direction.image} alt={direction.title} className="aspect-[16/9] w-full" placeholder="flat" />
              <div className="p-5">
                <h3 className="text-base font-bold text-navy-900">{direction.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy-600">{direction.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
