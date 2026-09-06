import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Kinnauri Apples — GI-tagged, grown at 9,000 ft";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(160deg, #FBF4E9 0%, #F5EAD8 55%, #F1B6A8 100%)",
          color: "#2E211A",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 6, textTransform: "uppercase", color: "#D89A3E" }}>
          GI Tag · Kinnaur, Himachal Pradesh
        </div>
        <div style={{ fontSize: 72, marginTop: 24, lineHeight: 1.05, fontWeight: 600 }}>Grown at 9,000 ft.</div>
        <div style={{ fontSize: 42, marginTop: 12, color: "#B5282D" }}>Hand-graded Kinnauri apples.</div>
        <div style={{ marginTop: 40, fontSize: 24, color: "#5C7A4A" }}>
          Direct from orchard · 5kg / 10kg / 15kg crates
        </div>
      </div>
    ),
    { ...size },
  );
}
