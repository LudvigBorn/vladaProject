import Image from "next/image";
import type { ReactNode } from "react";
import type { SiteContent } from "@/lib/content-types";
import { Container } from "./Container";
import { InstagramIcon, TelegramIcon } from "./Icons";

const LINK_CLASS = "text-white/50 transition-colors hover:text-white/80";
const LABEL_CLASS = "text-base text-white/60";

function FooterColumn({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className={LABEL_CLASS}>{label}</h3>
      <ul className="mt-1 space-y-1 text-sm">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  external,
  icon,
  children,
}: {
  href: string;
  external?: boolean;
  icon?: ReactNode;
  children: ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={
          icon ? `inline-flex items-center gap-2 ${LINK_CLASS}` : LINK_CLASS
        }
      >
        {icon}
        {children}
      </a>
    </li>
  );
}

export function Footer({ content }: { content: SiteContent }) {
  const { company, nav, footer } = content;

  return (
    <footer className="mt-auto bg-navy-950 text-white">
      <Container className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-8">
          <div>
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt=""
                width={164}
                height={160}
                className="h-7 w-auto brightness-0 invert"
              />
              <span className="text-base font-bold tracking-tight text-white">
                {company.name}
              </span>
            </div>
            <p className="mt-4 max-w-64 text-sm leading-relaxed text-white/45">
              {company.legalName}
            </p>
          </div>

          <FooterColumn label="Навигация">
            {nav.map((item) => (
              <FooterLink key={item.href} href={item.href}>
                {item.label}
              </FooterLink>
            ))}
          </FooterColumn>

          <FooterColumn label="Контакты">
            <FooterLink href={`tel:${company.phone.replace(/[^+\d]/g, "")}`}>
              {company.phone}
            </FooterLink>
            <FooterLink href={`mailto:${company.email}`}>
              {company.email}
            </FooterLink>
          </FooterColumn>

          <FooterColumn label="Соц. сети">
            <FooterLink
              href={company.instagramUrl}
              external
              icon={<InstagramIcon className="h-4 w-4" />}
            >
              Instagram
            </FooterLink>
            <FooterLink
              href={company.telegramUrl}
              external
              icon={<TelegramIcon className="h-4 w-4" />}
            >
              Telegram
            </FooterLink>
          </FooterColumn>
        </div>

        <div className="mt-16 border-t border-white/10 pt-6">
          <p className="text-xs text-white/40">
            © {company.foundedYear}–{new Date().getFullYear()}{" "}
            {company.legalName}. {footer.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
