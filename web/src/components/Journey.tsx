"use client";

import { useRef, useState } from "react";
import { useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { StagePhotos } from "./StagePhotos";
import { STORY_STAGES, clamp01, textOpacity } from "@/content/story";
import { useI18n } from "@/i18n/LanguageProvider";

export function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const smooth = useSpring(scrollYProgress, {
    stiffness: reduce ? 400 : 55,
    damping: reduce ? 40 : 22,
    mass: 0.35,
    restDelta: 0.0004,
  });
  const { t } = useI18n();
  const stages = t.journey.stages;
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(smooth, "change", (v) => {
    setProgress(clamp01(v));
  });

  return (
    <section ref={ref} id="journey" className="relative h-[820vh] bg-[#140c08]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <StagePhotos progress={progress} />

        <div className="relative z-10 flex h-full max-w-7xl flex-col justify-end px-5 pb-16 pt-32 md:justify-center md:px-12 md:pb-0 md:pt-28 lg:px-16">
          <p className="mb-6 text-[11px] uppercase tracking-[0.42em] text-[#D89A3E]">
            {t.journey.region}
          </p>

          <div className="relative min-h-[280px] max-w-xl md:min-h-[320px]">
            {stages.map((stage, i) => {
              const o = textOpacity(progress, i);
              const y = (1 - o) * 28;
              return (
                <article
                  key={stage.kicker}
                  className="absolute inset-x-0 top-0"
                  style={{
                    opacity: o,
                    transform: `translate3d(0, ${y}px, 0)`,
                    pointerEvents: o > 0.4 ? "auto" : "none",
                  }}
                >
                  <p className="text-xs uppercase tracking-[0.32em] text-[#F1B6A8]">{stage.kicker}</p>
                  {i === 0 && (
                    <span className="mt-4 inline-flex rounded-full border border-[#D89A3E]/50 bg-[#D89A3E]/15 px-3 py-1 text-[11px] font-medium text-[#D89A3E]">
                      {t.journey.giBadge}
                    </span>
                  )}
                  <h1 className="mt-4 font-display text-4xl leading-[1.08] text-[#FBF4E9] md:text-6xl">
                    {stage.title}{" "}
                    <em className="italic text-[#F1B6A8]">{stage.italic}</em>
                  </h1>
                  <p className="mt-5 max-w-md text-base leading-relaxed text-[#F5EAD8]/80 md:text-lg">
                    {stage.body}
                  </p>
                  {i === 0 && (
                    <a
                      href="#prebook"
                      className="mt-8 inline-flex rounded-brand bg-primary px-6 py-3 text-sm text-white shadow-soft hover:bg-primary-hover"
                    >
                      {t.journey.reserve}
                    </a>
                  )}
                </article>
              );
            })}
          </div>

          <div className="mt-10 flex items-center gap-4 md:mt-16">
            <div className="h-[2px] w-40 overflow-hidden rounded-full bg-white/20 md:w-56">
              <div
                className="h-full origin-left bg-[#B5282D]"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>
            <ol className="hidden gap-2 sm:flex" aria-label={t.journey.chapters}>
              {stages.map((s, i) => {
                const active = textOpacity(progress, i) > 0.45;
                return (
                  <li
                    key={s.kicker}
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${active ? "bg-[#B5282D]" : "bg-white/30"}`}
                  />
                );
              })}
            </ol>
            <span className="tabular-nums text-[11px] tracking-widest text-white/55">
              {String(Math.min(STORY_STAGES.length, Math.floor(progress * STORY_STAGES.length) + 1)).padStart(2, "0")}
              <span className="text-white/30"> / {String(STORY_STAGES.length).padStart(2, "0")}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
