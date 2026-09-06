"use client";

import { useI18n } from "@/i18n/LanguageProvider";

export function Faq() {
  const { t } = useI18n();
  return (
    <section id="faq" className="scroll-mt-28 mx-auto max-w-3xl px-5 py-20" aria-labelledby="faq-heading">
      <h2 id="faq-heading" className="font-display text-4xl">{t.faq.title}</h2>
      <dl className="mt-10 space-y-6">
        {t.faq.items.map((f) => (
          <div key={f.q} className="rounded-brand bg-white p-5 shadow-soft">
            <dt><h3 className="font-display text-xl">{f.q}</h3></dt>
            <dd className="mt-2 leading-relaxed text-bark-muted">{f.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
