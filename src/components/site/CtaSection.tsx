import type { SiteContent } from "@/lib/content-types";
import { Container } from "./Container";
import { Button } from "./Button";
import { WhatsappIcon, MailIcon } from "./Icons";

export function CtaSection({ content }: { content: SiteContent }) {
  const { ctaSection, company } = content;
  const whatsappHref = `https://wa.me/${company.whatsappNumber.replace(/[^\d]/g, "")}`;
  const mailHref = `mailto:${company.email}`;

  return (
    <section id="contact" className="scroll-mt-24 bg-navy-900">
      <Container className="py-12 sm:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">{ctaSection.title}</h2>
            <p className="mt-4 text-base leading-relaxed text-white/80">{ctaSection.description}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3">
            <Button
              href={whatsappHref}
              external
              icon={<WhatsappIcon className="h-4 w-4" />}
              className="bg-white px-6 py-3 text-sm font-semibold text-navy-950 hover:bg-navy-50"
            >
              {ctaSection.whatsappLabel}
            </Button>
            <Button
              href={mailHref}
              icon={<MailIcon className="h-4 w-4" />}
              className="bg-accent-600 px-6 py-3 text-sm font-semibold text-white hover:bg-accent-700"
            >
              {ctaSection.emailLabel}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
