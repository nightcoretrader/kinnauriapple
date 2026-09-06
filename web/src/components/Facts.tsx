"use client";

import { useI18n } from "@/i18n/LanguageProvider";

export function Facts() {
  const { t } = useI18n();
  const items = [
    [t.facts.altitude, t.facts.altitudeValue],
    [t.facts.hangTime, t.facts.hangTimeValue],
    [t.facts.origin, t.facts.originValue],
    [t.facts.harvest, t.facts.harvestValue],
    [t.facts.crates, t.facts.cratesValue],
    [t.facts.price, t.facts.priceValue],
  ];

  return (
    <section id="facts" className="scroll-mt-28 mx-auto max-w-6xl px-5 py-16">
      <h2 className="font-display text-3xl">{t.facts.title}</h2>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([label, value]) => (
          <li key={label} className="rounded-brand bg-white p-5 shadow-soft">
            <p className="text-xs uppercase tracking-wide text-accent">{label}</p>
            <p className="mt-2 font-display text-2xl">{value}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
