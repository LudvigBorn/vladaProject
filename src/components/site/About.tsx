import type { SiteContent } from "@/lib/content-types";
import { Container } from "./Container";
import { SmartImage } from "./SmartImage";

export function About({ content }: { content: SiteContent }) {
  const { about } = content;

  return (
    <section id="about" className="scroll-mt-24 bg-white">
      <Container className="mt-8 sm:mt-[58px] ">
        <div className="grid gap-y-4 gap-x-7 [grid-template-areas:'title'_'photo'_'text'] lg:h-145 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-7 lg:[grid-template-areas:'title_photo'_'text_photo']">
          <h2 className="[grid-area:title] text-4xl leading-none font-bold text-navy-950 sm:text-5xl lg:text-[64px]">
            {about.title}
          </h2>
          <SmartImage
            src={about.image}
            alt={about.title}
            className="[grid-area:photo] w-full aspect-16/9 lg:aspect-5/4 lg:h-full"
            // sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <div className="[grid-area:text] text-base sm:text-lg lg:text-[18px] leading-[1.2]">
            {about.paragraphs.map((p, i) => (
              <p className={`${i > 0 ? "mt-5 hidden lg:block" : ""}`} key={i}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
