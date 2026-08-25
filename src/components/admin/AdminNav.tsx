"use client";

import { useEffect, useState } from "react";

export const ADMIN_SECTIONS = [
  { id: "seo", label: "SEO" },
  { id: "company", label: "Компания и контакты" },
  { id: "hero", label: "Главный экран" },
  { id: "featured", label: "Баннер проекта" },
  { id: "stats", label: "Цифры и достижения" },
  { id: "about", label: "Мы работаем" },
  { id: "gallery", label: "Галерея проектов" },
  { id: "directions", label: "Направления" },
  { id: "cta", label: "Обсудим проект" },
  { id: "footer", label: "Подвал сайта" },
] as const;

function useActiveSection() {
  const [activeId, setActiveId] = useState<string>(ADMIN_SECTIONS[0].id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? a : b));
        setActiveId(topMost.target.id);
      },
      { rootMargin: "-112px 0px -70% 0px", threshold: 0 }
    );

    for (const section of ADMIN_SECTIONS) {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return activeId;
}

export function AdminNavSidebar() {
  const activeId = useActiveSection();

  return (
    <nav className="hidden lg:block">
      <div className="sticky top-24 space-y-1">
        {ADMIN_SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`block border-l-2 px-3 py-1.5 text-sm transition-colors ${
              activeId === section.id
                ? "border-accent-600 font-semibold text-navy-950"
                : "border-transparent text-navy-600 hover:border-navy-100 hover:text-navy-800"
            }`}
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}

export function AdminNavMobile() {
  const activeId = useActiveSection();

  return (
    <nav className="sticky top-16 z-10 -mx-5 mb-6 overflow-x-auto border-b border-navy-100 bg-white/95 px-5 py-2 backdrop-blur lg:hidden">
      <div className="flex w-max gap-2">
        {ADMIN_SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              activeId === section.id
                ? "border-accent-600 bg-accent-600 text-white"
                : "border-navy-100 text-navy-700"
            }`}
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
