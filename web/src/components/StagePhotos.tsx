"use client";

import Image from "next/image";
import { GRADE_STAGE_INDEX, STORY_FRAMES, frameBlend, textOpacity } from "@/content/story";
import { useI18n } from "@/i18n/LanguageProvider";

type Props = {
  progress: number;
  className?: string;
};

export function StagePhotos({ progress, className = "" }: Props) {
  const { t } = useI18n();
  const { from, to, mix } = frameBlend(progress);
  const gi = textOpacity(progress, GRADE_STAGE_INDEX);

  return (
    <div className={`absolute inset-0 overflow-hidden bg-[#1a120e] ${className}`}>
      {STORY_FRAMES.map((frame, i) => {
        let opacity = 0;
        let scale = 1.08;
        let y = 0;
        let blur = 0;

        if (i === from) {
          opacity = 1 - mix;
          scale = 1 + mix * 0.12;
          y = mix * -28;
          blur = mix * 10;
        } else if (i === to && from !== to) {
          opacity = mix;
          scale = 1.14 - mix * 0.14;
          y = (1 - mix) * 36;
          blur = (1 - mix) * 8;
        } else if (from === to && i === from) {
          opacity = 1;
          scale = 1.02;
        }

        if (opacity < 0.01) return null;

        return (
          <Image
            key={frame.src}
            src={frame.src}
            alt={frame.alt}
            fill
            sizes="100vw"
            priority={i <= 1}
            className="object-cover will-change-transform"
            style={{
              opacity,
              filter: blur > 0.4 ? `blur(${blur}px)` : undefined,
              transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
            }}
          />
        );
      })}

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(20,12,8,0.72) 0%, rgba(20,12,8,0.28) 42%, rgba(20,12,8,0.12) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-[12%] right-[8%] md:right-[10%]"
        style={{
          opacity: gi,
          transform: `scale(${0.86 + gi * 0.14}) rotate(-8deg)`,
        }}
      >
        <div className="flex h-28 w-28 items-center justify-center rounded-full border-[3px] border-[#D89A3E] bg-[#FBF4E9]/90 text-center shadow-[0_20px_50px_rgba(0,0,0,0.28)] md:h-36 md:w-36">
          <div>
            <p className="text-[9px] font-medium tracking-[0.28em] text-primary md:text-[11px]">{t.journey.giStamp}</p>
            <p className="mt-1 font-display text-sm text-bark md:text-base">{t.journey.giStampSub}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

