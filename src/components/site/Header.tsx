import Image from "next/image";
import Link from "next/link";
import type { SiteContent } from "@/lib/content-types";
import { Container } from "./Container";
import { Button } from "./Button";
import { PhoneIcon } from "./Icons";

export function Header({ content }: { content: SiteContent }) {
  return (
    <header className="sticky top-0 z-40 border-b border-navy-100 bg-white/95 backdrop-blur">
      <Container className="flex h-[72px] items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center">
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
            href={`tel:${content.company.phone.replace(/[^+\d]/g, "")}`}
            icon={<PhoneIcon className="h-4 w-4" />}
            className="h-10 shrink-0 bg-navy-900 px-4 text-base font-semibold text-white hover:bg-navy-800"
          >
            {content.company.phone}
          </Button>
        </div>
      </Container>
    </header>
  );
}
