import Image from "next/image";
import type { SiteContent } from "@/lib/content-types";
import { Container } from "./Container";
import { Button } from "./Button";
import { WhatsappIcon, MailIcon } from "./Icons";

export function CtaSection({ content }: { content: SiteContent }) {
  const { ctaSection, company } = content;
  const whatsappHref = `https://wa.me/${company.whatsappNumber.replace(/[^\d]/g, "")}`;
  const mailHref = `mailto:${company.email}`;

  return (
    <section
      id="contact"
      className=" mt-8 relative scroll-mt-24 overflow-hidden bg-navy-900 sm:mt-10 lg:mt-14.5 md:mt-12"
    >
      {ctaSection.backgroundImage ? (
        <Image
          src={ctaSection.backgroundImage}
          alt=""
          fill
          className="object-cover"
          style={{ opacity: ctaSection.backgroundOpacity / 100 }}
        />
      ) : null}
      <Container className="relative  p-8 pt-12">
        <div className="flex flex-col  lg:flex-row lg:items-center lg:justify-between">
          <div className="">
            <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {ctaSection.title}
            </h2>
            <p className="mt-1 max-w-md text-[20px] leading-none text-white/80">
              {ctaSection.description}
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-3">
            <Button
              href={whatsappHref}
              external
              icon={<WhatsappIcon className="h-4 w-4" />}
              className="w-full bg-accent-600 px-6 py-3 text-sm font-semibold text-white hover:bg-accent-700 lg:w-70 mt-6 lg:mt-0 "
            >
              {ctaSection.whatsappLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
