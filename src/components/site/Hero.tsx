import type { SiteContent } from "@/lib/content-types";
import { Container } from "./Container";
import { Button } from "./Button";
import { SmartImage } from "./SmartImage";
import { ArrowRightIcon } from "./Icons";

export function Hero({ content }: { content: SiteContent }) {
  const { hero, featuredProject, company } = content;
  const whatsappHref = `https://wa.me/${company.whatsappNumber.replace(/[^\d]/g, "")}`;

  return (
    <section className="flex h-screen flex-col bg-white">
      <Container className="shrink-0 pt-24 pb-8 sm:pt-28 sm:pb-14.5">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between ">
          <div className="max-w-2xl">
            <p className="leading-none text-xl font-normal text-navy-950 sm:text-2xl lg:text-[28px]">
              {hero.eyebrow}
            </p>
            <h1 className="mt-1 leading-none text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl lg:text-[64px]">
              {hero.title}
            </h1>
            <p className=" leading-none  mt-[22px] max-w-xl text-base  text-black">
              {hero.description}
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3">
            <Button
              href={whatsappHref}
              external
              className="w-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white hover:bg-accent-700 sm:w-70"
            >
              {hero.primaryCtaLabel}
            </Button>
            <Button
              href={hero.secondaryCtaHref}
              className="w-full border border-navy-100 bg-white px-6 py-3 text-sm font-semibold text-navy-900 hover:border-navy-600 sm:w-70"
            >
              {hero.secondaryCtaLabel}
            </Button>
          </div>
        </div>
      </Container>

      <div className="relative min-h-0 flex-1 overflow-hidden">
        <SmartImage
          src={featuredProject.image}
          alt={featuredProject.title}
          className="h-full w-full"
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0">
          <Container className="flex flex-col gap-4 p-6 sm:flex-row sm:items-end sm:justify-between sm:p-10 ">
            <div className="max-w-xl">
              <h2 className="text-xl font-bold text-white sm:text-[30px] leading-[35px]">
                {featuredProject.title}
              </h2>
              <p className="mt-2 text-base leading-[19px] text-white/85 sm:text-base">
                {featuredProject.description}
              </p>
            </div>
            <Button
              href={featuredProject.ctaHref}
              icon={<ArrowRightIcon className="h-4 w-4" />}
              iconPosition="right"
              className="w-full shrink-0 bg-white px-5 py-3 text-sm font-semibold text-navy-950 hover:bg-navy-50 sm:w-70"
            >
              {featuredProject.ctaLabel}
            </Button>
          </Container>
        </div>
      </div>
    </section>
  );
}
