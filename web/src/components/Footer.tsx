"use client";

import { useI18n } from "@/i18n/LanguageProvider";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer
      id="contact"
      className="scroll-mt-28 border-t border-[#D4AF37]/40 bg-[#2C0A12] px-5 py-14 text-[#F8ECD4]"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-2xl text-[#F1D78A]">{t.header.brand}</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.28em] text-[#D4AF37]">{t.header.brandKicker}</p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#F8ECD4]/80">{t.footer.blurb}</p>
        </div>
        <div className="text-sm">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#D4AF37]">{t.header.contact}</p>
          <a href={`mailto:${t.footer.email}`} className="mt-3 block text-[#F8ECD4] hover:text-[#F1D78A]">
            {t.footer.email}
          </a>
          <a
            href={t.footer.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 block text-[#F8ECD4] hover:text-[#F1D78A]"
          >
            {t.footer.whatsapp}
          </a>
        </div>
      </div>
    </footer>
  );
}
