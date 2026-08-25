import type { SiteContent } from "@/lib/content-types";
import { Container } from "./Container";
import { Button } from "./Button";
import { SmartImage } from "./SmartImage";
import { ArrowRightIcon } from "./Icons";

export function Hero({ content }: { content: SiteContent }) {
  const { hero, featuredProject } = content;

  return (
    <section className="bg-white">
      <Container className="pt-[10px] pb-8 sm:pt-[112px] sm:pb-[58px]">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <p className="leading-none text-[28px] font-normal text-navy-950">{hero.eyebrow}</p>
            <h1 className="mt-1 leading-none text-4xl font-bold tracking-tight text-navy-950 sm:text-5xl lg:text-[64px]">
              {hero.title}
            </h1>
            <p className=" leading-none  mt-[22px] max-w-xl text-base  text-black">{hero.description}</p>
          </div>

          <div className="flex shrink-0 flex-col gap-3">
            <Button href={hero.primaryCtaHref} className="bg-accent-600 px-6 py-3 text-sm font-semibold text-white hover:bg-accent-700">
              {hero.primaryCtaLabel}
            </Button>
            <Button
              href={hero.secondaryCtaHref}
              className="border border-navy-100 bg-white px-6 py-3 text-sm font-semibold text-navy-900 hover:border-navy-600"
            >
              {hero.secondaryCtaLabel}
            </Button>
          </div>
        </div>
      </Container>

        <div className="relative h-[484px] overflow-hidden">
          <SmartImage
            src={featuredProject.image}
            alt={featuredProject.title}
            className="h-full w-full"
            sizes="100vw"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0">
            <Container className="flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10">
              <div className="max-w-xl">
                <h2 className="text-xl font-bold text-white sm:text-[30px] leading-[35px]">{featuredProject.title}</h2>
                <p className="mt-2 text-base leading-[19px] text-white/85 sm:text-base">{featuredProject.description}</p>
              </div>
              <Button
                href={featuredProject.ctaHref}
                icon={<ArrowRightIcon className="h-4 w-4" />}
                iconPosition="right"
                className="w-auto shrink-0 bg-white px-5 py-3 text-sm font-semibold text-navy-950 hover:bg-navy-50"
              >
                {featuredProject.ctaLabel}
              </Button>
            </Container>
          </div>
        </div>
    </section>
  );
}
