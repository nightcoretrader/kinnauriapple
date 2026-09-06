export type StoryImage = { src: string; alt: string };

export const STORY_STAGES = [
  {
    kicker: "Origin",
    title: "Grown at 9,000 ft.",
    italic: "Certified by geography.",
    body: "Kinnauri Apple is GI-tagged fruit of Kinnaur, Himachal Pradesh. Thin air, long sun, and a slow season on the branch — sold direct from orchard, not a wholesale yard.",
    giBadge: false,
    images: [
      {
        src: "/mountain_image.jpg",
        alt: "High Himalayan mountains of Kinnaur",
      },
    ] satisfies StoryImage[],
  },
  {
    kicker: "Orchard",
    title: "A 130–150 day hang",
    italic: "on the branch.",
    body: "Trees sit between 6,000 and 9,000 feet. Fruit stays on the limb for four to five months, building sugar and colour slowly. Altitude is the first grader.",
    giBadge: false,
    images: [
      {
        src: "/apple_orchard.jpg",
        alt: "Ripe Kinnauri apples hanging on the branch with orchard and mountains behind",
      },
    ] satisfies StoryImage[],
  },
  {
    kicker: "Harvest",
    title: "Picked by hand.",
    italic: "Never shaken.",
    body: "Crews inspect and twist each fruit. A bruise is a reject. Harvest is slow, selective, and done one apple at a time.",
    giBadge: false,
    images: [
      {
        src: "/apple_pluck_kinnaur.jpg",
        alt: "Hand-picking ripe Kinnauri apples from the tree",
      },
    ] satisfies StoryImage[],
  },
  {
    kicker: "Grade",
    title: "Size, colour, skin.",
    italic: "Then the GI mark.",
    body: "Grading looks at diameter, blush coverage and a blemish-free cuticle. The GI registration ties this apple’s character legally to Kinnaur.",
    giBadge: true,
    images: [
      {
        src: "/apple_grade_closeup.png",
        alt: "Close-up of a blush-red apple",
      },
    ] satisfies StoryImage[],
  },
  {
    kicker: "Pack",
    title: "Tissue-wrapped.",
    italic: "No middlemen.",
    body: "Selected fruit is wrapped, counted and packed at source. The crate you reserve is the crate that left the orchard.",
    giBadge: false,
    images: [
      {
        src: "/apple_tissue_wrapped.jpg",
        alt: "Kinnauri apples wrapped in tissue paper",
      },
    ] satisfies StoryImage[],
  },
  {
    kicker: "Hold",
    title: "Cold storage,",
    italic: "then the road.",
    body: "Crates rest in temperature-controlled rooms until dispatch. Freshness is a short orchard-to-doorstep window — not weeks in ambient transit.",
    giBadge: false,
    images: [
      {
        src: "/apple_cold_storage.png",
        alt: "Stacked crates in cool storage",
      },
    ] satisfies StoryImage[],
  },
  {
    kicker: "Peti",
    title: "5kg, 10kg or 15kg.",
    italic: "₹300/kg.",
    body: "The branded peti is the unit of sale. Price is ₹300 per kg, inclusive of packing. Pre-booking reserves quantity; it does not charge a card.",
    giBadge: false,
    images: [
      {
        src: "/apple_peti_crate.png",
        alt: "Apples packed in a wooden crate",
      },
    ] satisfies StoryImage[],
  },
] as const;

export const STORY_FRAMES: StoryImage[] = STORY_STAGES.flatMap((stage) => [...stage.images]);

export const GRADE_STAGE_INDEX = STORY_STAGES.findIndex((s) => s.giBadge);

function stageRanges() {
  const total = STORY_FRAMES.length;
  let cursor = 0;
  return STORY_STAGES.map((stage) => {
    const start = cursor / total;
    cursor += stage.images.length;
    return { start, end: cursor / total };
  });
}

export function clamp01(n: number) {
  if (!Number.isFinite(n)) return 0;
  return Math.min(1, Math.max(0, n));
}

export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp01((x - edge0) / (edge1 - edge0 || 1));
  return t * t * (3 - 2 * t);
}

export function frameBlend(progress: number, count = STORY_FRAMES.length) {
  const max = Math.max(1, count - 1);
  const t = clamp01(progress) * max;
  const from = Math.min(max, Math.floor(t));
  const to = Math.min(max, from + 1);
  const mix = smoothstep(0, 1, t - from);
  return { from, to, mix };
}

export function textOpacity(progress: number, index: number) {
  const ranges = stageRanges();
  const range = ranges[index] ?? { start: 0, end: 1 };
  const fade = 0.07;
  if (progress < range.start - fade || progress > range.end + fade * 0.35) return 0;
  if (progress < range.start) return smoothstep(range.start - fade, range.start, progress);
  if (progress > range.end - fade) {
    return 1 - smoothstep(range.end - fade, range.end + fade * 0.2, progress);
  }
  return 1;
}
