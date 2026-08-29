"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { SiteContent } from "@/lib/content-types";
import { Container } from "./Container";
import { Button } from "./Button";
import { PhoneIcon, MenuIcon, CloseIcon } from "./Icons";

export function Header({ content }: { content: SiteContent }) {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const whatsappHref = `https://wa.me/${content.company.whatsappNumber.replace(/[^\d]/g, "")}`;

  useEffect(() => {
    function onScroll() {
      const currentY = window.scrollY;
      setHidden(currentY > lastScrollY.current && currentY > 72 && !menuOpen);
      lastScrollY.current = currentY;
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b border-navy-950 bg-white/95 backdrop-blur transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <Container className="flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center" onClick={() => setMenuOpen(false)}>
          <Image
            src="/logo_with_text.png"
            alt={content.company.name}
            width={996}
            height={160}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          <nav className="flex items-center gap-8 text-base font-medium text-navy-900 whitespace-nowrap">
            {content.nav.map((item) => (
              <a key={item.href} href={item.href} className="hover:text-accent-600 transition-colors">
                {item.label}
              </a>
            ))}
          </nav>

          <Button
            href={whatsappHref}
            external
            icon={<PhoneIcon className="h-4 w-4" />}
            className="h-10 shrink-0 bg-navy-900 px-4 text-base font-semibold text-white hover:bg-navy-800"
          >
            {content.company.phone}
          </Button>
        </div>

        <button
          type="button"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 shrink-0 items-center justify-center text-navy-950 lg:hidden"
        >
          {menuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </Container>

      {menuOpen ? (
        <div className="border-t border-navy-950 bg-white lg:hidden">
          <Container className="flex flex-col gap-6 py-6">
            <nav className="flex flex-col gap-4 text-base font-medium text-navy-900">
              {content.nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-accent-600 transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <Button
              href={whatsappHref}
              external
              icon={<PhoneIcon className="h-4 w-4" />}
              className="w-full shrink-0 bg-navy-900 px-4 text-base font-semibold text-white hover:bg-navy-800"
            >
              {content.company.phone}
            </Button>
          </Container>
        </div>
      ) : null}
    </header>
  );
}
