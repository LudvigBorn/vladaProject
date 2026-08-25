"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SiteContent, StatItem, GalleryItem, DirectionItem } from "@/lib/content-types";
import { Field, TextInput, TextArea, SectionCard, ImageUploadField } from "./fields";
import { AdminNavSidebar, AdminNavMobile } from "./AdminNav";

function ArrayControls({
  onAdd,
  onRemove,
  canRemove,
}: {
  onAdd: () => void;
  onRemove: () => void;
  canRemove: boolean;
}) {
  return (
    <div className="flex justify-end gap-2">
      {canRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className="text-xs font-semibold text-red-600 hover:text-red-700"
        >
          Удалить
        </button>
      ) : null}
      <button
        type="button"
        onClick={onAdd}
        className="text-xs font-semibold text-accent-600 hover:text-accent-700"
      >
        + Добавить
      </button>
    </div>
  );
}

export function AdminEditor({ initialContent }: { initialContent: SiteContent }) {
  const router = useRouter();
  const [content, setContent] = useState<SiteContent>(initialContent);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ type: "ok" | "error"; message: string } | null>(null);

  function updateSection<K extends keyof SiteContent>(key: K, value: Partial<SiteContent[K]>) {
    setContent((prev) => ({ ...prev, [key]: { ...(prev[key] as object), ...value } }));
  }

  async function handleSave() {
    setSaving(true);
    setStatus(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setStatus({ type: "error", message: data?.error ?? "Не удалось сохранить" });
        return;
      }
      setStatus({ type: "ok", message: "Сохранено. Изменения уже видны на сайте." });
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  function updateStat(index: number, patch: Partial<StatItem>) {
    setContent((prev) => ({
      ...prev,
      stats: prev.stats.map((s, i) => (i === index ? { ...s, ...patch } : s)),
    }));
  }

  function updateGalleryItem(index: number, patch: Partial<GalleryItem>) {
    setContent((prev) => ({
      ...prev,
      gallery: prev.gallery.map((g, i) => (i === index ? { ...g, ...patch } : g)),
    }));
  }

  function updateDirection(index: number, patch: Partial<DirectionItem>) {
    setContent((prev) => ({
      ...prev,
      directions: prev.directions.map((d, i) => (i === index ? { ...d, ...patch } : d)),
    }));
  }

  function updateParagraph(index: number, value: string) {
    setContent((prev) => ({
      ...prev,
      about: { ...prev.about, paragraphs: prev.about.paragraphs.map((p, i) => (i === index ? value : p)) },
    }));
  }

  return (
    <div className="min-h-screen bg-navy-50 pb-24">
      <div className="sticky top-0 z-20 h-16 border-b border-navy-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-5">
          <div>
            <h1 className="text-base font-bold text-navy-950">Редактирование сайта</h1>
            <p className="text-xs text-navy-600">VLADA PROJECT</p>
          </div>
          <div className="flex items-center gap-3">
            {status ? (
              <span className={`text-xs font-medium ${status.type === "ok" ? "text-accent-600" : "text-red-600"}`}>
                {status.message}
              </span>
            ) : null}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-navy-100 px-3 py-2 text-xs font-semibold text-navy-800 hover:border-navy-600"
            >
              Открыть сайт
            </a>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="rounded-lg bg-accent-600 px-4 py-2 text-xs font-semibold text-white hover:bg-accent-700 disabled:opacity-60"
            >
              {saving ? "Сохранение…" : "Сохранить"}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="text-xs font-semibold text-navy-600 hover:text-red-600"
            >
              Выйти
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-8">
        <AdminNavMobile />

        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          <AdminNavSidebar />
          <div className="min-w-0 space-y-6">
        <SectionCard id="seo" title="SEO" description="Заголовок и описание для поисковых систем">
          <Field label="Заголовок (title)">
            <TextInput value={content.seo.title} onChange={(v) => updateSection("seo", { title: v })} />
          </Field>
          <Field label="Описание (meta description)">
            <TextArea rows={3} value={content.seo.description} onChange={(v) => updateSection("seo", { description: v })} />
          </Field>
        </SectionCard>

        <SectionCard id="company" title="Компания и контакты">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Название (короткое)">
              <TextInput value={content.company.name} onChange={(v) => updateSection("company", { name: v })} />
            </Field>
            <Field label="Юр. название">
              <TextInput value={content.company.legalName} onChange={(v) => updateSection("company", { legalName: v })} />
            </Field>
            <Field label="Телефон">
              <TextInput value={content.company.phone} onChange={(v) => updateSection("company", { phone: v })} />
            </Field>
            <Field label="Email">
              <TextInput value={content.company.email} onChange={(v) => updateSection("company", { email: v })} />
            </Field>
            <Field label="WhatsApp номер (только цифры)">
              <TextInput
                value={content.company.whatsappNumber}
                onChange={(v) => updateSection("company", { whatsappNumber: v })}
              />
            </Field>
            <Field label="Год основания">
              <TextInput
                value={String(content.company.foundedYear)}
                onChange={(v) => updateSection("company", { foundedYear: Number(v) || content.company.foundedYear })}
              />
            </Field>
            <Field label="Instagram URL">
              <TextInput value={content.company.instagramUrl} onChange={(v) => updateSection("company", { instagramUrl: v })} />
            </Field>
            <Field label="Telegram URL">
              <TextInput value={content.company.telegramUrl} onChange={(v) => updateSection("company", { telegramUrl: v })} />
            </Field>
          </div>
        </SectionCard>

        <SectionCard id="hero" title="Главный экран (Hero)">
          <Field label="Надпись над заголовком">
            <TextInput value={content.hero.eyebrow} onChange={(v) => updateSection("hero", { eyebrow: v })} />
          </Field>
          <Field label="Заголовок">
            <TextInput value={content.hero.title} onChange={(v) => updateSection("hero", { title: v })} />
          </Field>
          <Field label="Описание">
            <TextArea value={content.hero.description} onChange={(v) => updateSection("hero", { description: v })} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Кнопка 1 (текст)">
              <TextInput value={content.hero.primaryCtaLabel} onChange={(v) => updateSection("hero", { primaryCtaLabel: v })} />
            </Field>
            <Field label="Кнопка 1 (ссылка)">
              <TextInput value={content.hero.primaryCtaHref} onChange={(v) => updateSection("hero", { primaryCtaHref: v })} />
            </Field>
            <Field label="Кнопка 2 (текст)">
              <TextInput value={content.hero.secondaryCtaLabel} onChange={(v) => updateSection("hero", { secondaryCtaLabel: v })} />
            </Field>
            <Field label="Кнопка 2 (ссылка)">
              <TextInput value={content.hero.secondaryCtaHref} onChange={(v) => updateSection("hero", { secondaryCtaHref: v })} />
            </Field>
          </div>
        </SectionCard>

        <SectionCard id="featured" title="Баннер проекта" description="Крупная карточка с фото под главным экраном">
          <ImageUploadField
            label="Фото"
            value={content.featuredProject.image}
            onChange={(v) => updateSection("featuredProject", { image: v })}
          />
          <Field label="Заголовок">
            <TextInput value={content.featuredProject.title} onChange={(v) => updateSection("featuredProject", { title: v })} />
          </Field>
          <Field label="Описание">
            <TextArea value={content.featuredProject.description} onChange={(v) => updateSection("featuredProject", { description: v })} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Кнопка (текст)">
              <TextInput value={content.featuredProject.ctaLabel} onChange={(v) => updateSection("featuredProject", { ctaLabel: v })} />
            </Field>
            <Field label="Кнопка (ссылка)">
              <TextInput value={content.featuredProject.ctaHref} onChange={(v) => updateSection("featuredProject", { ctaHref: v })} />
            </Field>
          </div>
        </SectionCard>

        <SectionCard id="stats" title="Цифры и достижения">
          <div className="space-y-5">
            {content.stats.map((stat, i) => (
              <div key={i} className="rounded-xl border border-navy-100 p-4">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <Field label="Приставка">
                    <TextInput value={stat.prefix} onChange={(v) => updateStat(i, { prefix: v })} />
                  </Field>
                  <Field label="Число">
                    <TextInput value={stat.value} onChange={(v) => updateStat(i, { value: v })} />
                  </Field>
                  <Field label="Строка 1">
                    <TextInput value={stat.label} onChange={(v) => updateStat(i, { label: v })} />
                  </Field>
                  <Field label="Строка 2">
                    <TextInput value={stat.sublabel} onChange={(v) => updateStat(i, { sublabel: v })} />
                  </Field>
                </div>
                <ArrayControls
                  canRemove={content.stats.length > 1}
                  onAdd={() =>
                    setContent((prev) => ({
                      ...prev,
                      stats: [...prev.stats, { value: "", prefix: "", label: "", sublabel: "" }],
                    }))
                  }
                  onRemove={() => setContent((prev) => ({ ...prev, stats: prev.stats.filter((_, idx) => idx !== i) }))}
                />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard id="about" title='Блок "Мы работаем"'>
          <Field label="Заголовок">
            <TextInput value={content.about.title} onChange={(v) => updateSection("about", { title: v })} />
          </Field>
          <ImageUploadField label="Фото" value={content.about.image} onChange={(v) => updateSection("about", { image: v })} />
          {content.about.paragraphs.map((p, i) => (
            <Field key={i} label={`Абзац ${i + 1}`}>
              <TextArea rows={4} value={p} onChange={(v) => updateParagraph(i, v)} />
            </Field>
          ))}
          <ArrayControls
            canRemove={content.about.paragraphs.length > 1}
            onAdd={() =>
              setContent((prev) => ({ ...prev, about: { ...prev.about, paragraphs: [...prev.about.paragraphs, ""] } }))
            }
            onRemove={() =>
              setContent((prev) => ({
                ...prev,
                about: { ...prev.about, paragraphs: prev.about.paragraphs.slice(0, -1) },
              }))
            }
          />
        </SectionCard>

        <SectionCard id="gallery" title="Галерея проектов">
          <div className="space-y-5">
            {content.gallery.map((item, i) => (
              <div key={i} className="rounded-xl border border-navy-100 p-4 space-y-3">
                <ImageUploadField label="Фото" value={item.image} onChange={(v) => updateGalleryItem(i, { image: v })} />
                <Field label="Метка (локация/заказчик)">
                  <TextInput value={item.tag} onChange={(v) => updateGalleryItem(i, { tag: v })} />
                </Field>
                <Field label="Описание">
                  <TextArea rows={3} value={item.description} onChange={(v) => updateGalleryItem(i, { description: v })} />
                </Field>
                <ArrayControls
                  canRemove={content.gallery.length > 1}
                  onAdd={() =>
                    setContent((prev) => ({
                      ...prev,
                      gallery: [...prev.gallery, { image: null, tag: "", description: "" }],
                    }))
                  }
                  onRemove={() => setContent((prev) => ({ ...prev, gallery: prev.gallery.filter((_, idx) => idx !== i) }))}
                />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard id="directions" title="Направления деятельности">
          <div className="space-y-5">
            {content.directions.map((dir, i) => (
              <div key={i} className="rounded-xl border border-navy-100 p-4 space-y-3">
                <ImageUploadField label="Фото" value={dir.image} onChange={(v) => updateDirection(i, { image: v })} />
                <Field label="Название">
                  <TextInput value={dir.title} onChange={(v) => updateDirection(i, { title: v })} />
                </Field>
                <Field label="Описание">
                  <TextArea rows={3} value={dir.description} onChange={(v) => updateDirection(i, { description: v })} />
                </Field>
                <ArrayControls
                  canRemove={content.directions.length > 1}
                  onAdd={() =>
                    setContent((prev) => ({
                      ...prev,
                      directions: [...prev.directions, { title: "", description: "", image: null }],
                    }))
                  }
                  onRemove={() =>
                    setContent((prev) => ({ ...prev, directions: prev.directions.filter((_, idx) => idx !== i) }))
                  }
                />
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard id="cta" title='Блок "Обсудим ваш проект"'>
          <Field label="Заголовок">
            <TextInput value={content.ctaSection.title} onChange={(v) => updateSection("ctaSection", { title: v })} />
          </Field>
          <Field label="Описание">
            <TextArea value={content.ctaSection.description} onChange={(v) => updateSection("ctaSection", { description: v })} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Кнопка WhatsApp (текст)">
              <TextInput value={content.ctaSection.whatsappLabel} onChange={(v) => updateSection("ctaSection", { whatsappLabel: v })} />
            </Field>
            <Field label="Кнопка Email (текст)">
              <TextInput value={content.ctaSection.emailLabel} onChange={(v) => updateSection("ctaSection", { emailLabel: v })} />
            </Field>
          </div>
        </SectionCard>

        <SectionCard id="footer" title="Подвал сайта">
          <Field label="Текст копирайта (после юр. названия)">
            <TextInput value={content.footer.copyright} onChange={(v) => updateSection("footer", { copyright: v })} />
          </Field>
        </SectionCard>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-accent-600 px-6 py-3 text-sm font-semibold text-white hover:bg-accent-700 disabled:opacity-60"
          >
            {saving ? "Сохранение…" : "Сохранить изменения"}
          </button>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
}
