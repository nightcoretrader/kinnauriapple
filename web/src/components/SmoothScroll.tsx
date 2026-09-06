"use client";

import { ReactLenis } from "lenis/react";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.075,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 0.78,
        touchMultiplier: 1.05,
        autoRaf: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
