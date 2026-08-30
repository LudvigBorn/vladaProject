import Image from "next/image";
import type { ReactNode } from "react";
import type { SiteContent } from "@/lib/content-types";
import { getTelHref } from "@/lib/links";
import { Container } from "./Container";
import { InstagramIcon, TelegramIcon } from "./Icons";

const LINK_CLASS =
  "text-white transition-colors hover:text-white text-sm leading-[14px]";
const LABEL_CLASS = "text-sm leading-[14px] text-white font-bold";

function FooterColumn({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className={`${LABEL_CLASS} mb-4`}>{label}</h3>
      <ul className="list-none space-y-2">{children}</ul>
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
    <li className="leading-[14px]">
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer " } : {})}
        className={
          icon ? `inline-flex items-center gap-x-2 ${LINK_CLASS}` : LINK_CLASS
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
    <footer className="mt-auto bg-linear-[100deg] from-navy-700 to-navy-950 text-white">
      <Container className="py-10 sm:py-[38px]">
        <div className=" flex justify-between items-start">
          <div className="flex justify-between max-w-[527px] w-full">
            <FooterColumn label="Навигация">
              {nav.map((item) => (
                <FooterLink key={item.href} href={item.href}>
                  {item.label}
                </FooterLink>
              ))}
            </FooterColumn>

            <FooterColumn label="Контакты">
              <FooterLink href={getTelHref(company.phone)}>
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
          <div className="hidden md:flex items-center gap-2 ">
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
        </div>

        <div className="mt-8">
          <p className="text-[10px] text-white/75">
            © {company.foundedYear}–{new Date().getFullYear()}{" "}
            {company.legalName}. {footer.copyright}
          </p>
        </div>
      </Container>
    </footer>
  );
}
