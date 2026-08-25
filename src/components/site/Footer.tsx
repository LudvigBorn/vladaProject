import Image from "next/image";
import type { SiteContent } from "@/lib/content-types";
import { Container } from "./Container";
import { InstagramIcon, TelegramIcon } from "./Icons";

export function Footer({ content }: { content: SiteContent }) {
  const { company, nav, footer } = content;

  return (
    <footer className="mt-auto bg-navy-950 text-white">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white/60">Навигация по сайту</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="text-white/85 hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white/60">Контакты</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a href={`tel:${company.phone.replace(/[^+\d]/g, "")}`} className="text-white/85 hover:text-white transition-colors">
                  {company.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="text-white/85 hover:text-white transition-colors">
                  {company.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white/60">Соц. сети</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <a
                  href={company.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/85 hover:text-white transition-colors"
                >
                  <InstagramIcon className="h-4 w-4" /> Instagram
                </a>
              </li>
              <li>
                <a
                  href={company.telegramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-white/85 hover:text-white transition-colors"
                >
                  <TelegramIcon className="h-4 w-4" /> Telegram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/50">
            © {company.foundedYear}–{new Date().getFullYear()} {company.legalName}. {footer.copyright}
          </p>
          <div className="flex items-center gap-2">
            <Image src="/logo.png" alt="" width={164} height={160} className="h-6 w-auto" />
            <span className="text-sm font-bold tracking-tight text-white">{company.name}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
