import type { SiteContent } from "@/lib/content-types";
import { Container } from "./Container";

export function Stats({ content }: { content: SiteContent }) {
  return (
    <section className="bg-white">
      <Container className="py-10 sm:py-12">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {content.stats.map((stat, i) => (
            <div key={i} className="border border-navy-100 p-6">
              <p className="text-4xl font-extrabold text-accent-600 sm:text-5xl">
                {stat.prefix ? <span className="mr-1 text-2xl text-navy-950 sm:text-3xl">{stat.prefix}</span> : null}
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-bold uppercase leading-snug text-navy-950">{stat.label}</p>
              <p className="text-sm font-bold uppercase leading-snug text-navy-950">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
