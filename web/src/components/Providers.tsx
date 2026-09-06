"use client";

import { LanguageProvider } from "@/i18n/LanguageProvider";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Header } from "@/components/Header";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <SmoothScroll>
        <Header />
        {children}
      </SmoothScroll>
    </LanguageProvider>
  );
}
