"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/LanguageProvider";
import { localeLabels, localeNames, locales, type Locale } from "@/i18n/dictionaries";

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const links = [
    { href: "#journey", label: t.header.journey },
    { href: "#facts", label: t.header.facts },
    { href: "#prebook", label: t.header.prebook },
    { href: "#faq", label: t.header.faq },
    { href: "#contact", label: t.header.contact },
  ];

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!menuRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  function choose(next: Locale) {
    setLocale(next);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#D4AF37]/40 bg-[#2C0A12] shadow-[0_10px_28px_rgba(44,10,18,0.45)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 md:h-[4.25rem] md:px-8">
        <a href="#journey" className="min-w-0 shrink-0">
          <p className="font-display text-lg leading-none text-[#F1D78A] md:text-xl">{t.header.brand}</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-[#D4AF37]">{t.header.brandKicker}</p>
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label={t.header.brand}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#F8ECD4] transition-colors hover:text-[#F1D78A]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="#prebook"
            className="hidden rounded-brand bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-[#2C0A12] hover:bg-[#E4C36A] sm:inline-flex"
          >
            {t.header.cta}
          </a>
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#D4AF37]/70 bg-[#3E101C] px-3 py-1.5 text-xs font-medium tracking-wide text-[#F8ECD4]"
              aria-haspopup="listbox"
              aria-expanded={open}
              aria-label={t.header.language}
            >
              <GlobeIcon />
              <span className="tabular-nums">{localeLabels[locale]}</span>
              <Chevron open={open} />
            </button>
            {open && (
              <ul
                role="listbox"
                aria-label={t.header.language}
                className="absolute right-0 z-50 mt-2 min-w-[9.5rem] overflow-hidden rounded-brand border border-[#D4AF37]/40 bg-[#2C0A12] py-1 shadow-[0_12px_32px_rgba(44,10,18,0.5)]"
              >
                {locales.map((code) => (
                  <li key={code}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={locale === code}
                      onClick={() => choose(code)}
                      className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm ${
                        locale === code
                          ? "bg-[#3E101C] text-[#F1D78A]"
                          : "text-[#F8ECD4] hover:bg-[#3E101C] hover:text-[#F1D78A]"
                      }`}
                    >
                      <span>{localeNames[code]}</span>
                      <span className="tabular-nums text-xs text-[#D4AF37]">{localeLabels[code]}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
      <nav
        className="flex gap-4 overflow-x-auto border-t border-[#D4AF37]/25 bg-[#3E101C] px-4 py-2 text-xs font-medium text-[#F8ECD4] lg:hidden"
        aria-label={t.header.brand}
      >
        {links.map((link) => (
          <a key={link.href} href={link.href} className="shrink-0 hover:text-[#F1D78A]">
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function GlobeIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M3 12h18M12 3c2.5 2.8 4 6.2 4 9s-1.5 6.2-4 9c-2.5-2.8-4-6.2-4-9s1.5-6.2 4-9Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={`transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
