import type { SiteContent } from "@/lib/content-types";
import { Container } from "./Container";
import { SmartImage } from "./SmartImage";

export function Directions({ content }: { content: SiteContent }) {
  return (
    <section id="directions" className="scroll-mt-24 ">
      <Container className="mt-8 sm:mt-10 md:mt-12 lg:mt-14.5">
        <h2 className="text-4xl font-bold tracking-tight text-navy-950 uppercase sm:text-5xl lg:text-[64px]">
          Направления
        </h2>
        <div className="mt-[22px] grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {content.directions.map((direction, i) => (
            <div
              key={i}
              className="min-h-93 border border-navy-950 bg-white pb-4 transition-transform duration-200 ease-out will-change-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-navy-950/15"
            >
              <SmartImage
                src={direction.image}
                alt={direction.title}
                className="aspect-[16/9] w-full"
                placeholder="flat"
              />
              <div className="mt-4 px-6">
                <h3 className="text-lg font-bold text-navy-900 leading-none">
                  {direction.title}
                </h3>
                <p className="mt-2 text-sm leading-none ">
                  {direction.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
