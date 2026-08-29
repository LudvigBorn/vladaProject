import type { SiteContent } from "@/lib/content-types";
import { Container } from "./Container";

export function Stats({ content }: { content: SiteContent }) {
  return (
    <section className="bg-white ">
      <Container className="mt-8 lg:mt-14.5">
        <div className="grid grid-cols-1 gap-4 sm:gap-7 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 ">
          {content.stats.map((stat, i) => (
            <div
              key={i}
              className="flex   h-50 sm: w-full flex-col justify-end border border-navy-950 p-5 sm:h-60 lg:h-66 lg:max-w-70"
            >
              <div className="flex items-baseline  gap-1.5 ">
                {stat.prefix ? (
                  <span className=" font-bold text-navy-950 text-[24px]">
                    {stat.prefix}
                  </span>
                ) : null}
                <span className=" font-bold leading-none text-accent-600  text-7xl md:text-[104px] lg:leading-0">
                  {stat.value}
                </span>
                <span className=" font-bold uppercase leading-none text-navy-950 text-[24px]">
                  {stat.label}
                </span>
              </div>
              <div className="flex h-14 items-end sm:h-12 lg:h-15">
                <p
                  className={`font-normal uppercase leading-none text-navy-950 ${
                    i === content.stats.length - 1
                      ? "text-[24px]"
                      : "pb-2 sm:pb-0 text-[36px]"
                  }`}
                >
                  {stat.sublabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
