import { parseCSS } from "colorizr";
import { describe, expect, it } from "vitest";
import swatch from "./swatch";

function getLightness(value: string): number {
  // Parse as oklch to get lightness; parseCSS can accept any CSS color string
  const lch = parseCSS(value, "oklch");
  return lch.l;
}

function getChroma(value: string): number {
  const lch = parseCSS(value, "oklch");
  return lch.c;
}

describe("swatch", () => {
  it("generates all expected tone keys", () => {
    const result = swatch("#32a852");
    console.log(result);
    const keys = Object.keys(result)
      .map(Number)
      .sort((a, b) => a - b);
    expect(keys).toEqual([
      0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
    ]);
  });

  it("uses 0 as lightest and 950 as darkest with default bounds", () => {
    const result = swatch("#ff0000");
    const l0 = getLightness(result[0]);
    const l950 = getLightness(result[950]);
    expect(l0).toBeGreaterThan(l950);
  });

  it("uses 0 as darkest and 950 as lightest with inverted bounds", () => {
    const result = swatch("#ff0000", { maxL: 0.2, minL: 0.97 });
    const l0 = getLightness(result[0]);
    const l950 = getLightness(result[950]);
    expect(l0).toBeLessThan(l950);
  });

  it("keeps lightness within provided bounds (non-inverted)", () => {
    const bounds = { maxL: 0.9, minL: 0.3 } as const;
    const result = swatch("rgb(10, 200, 100)", bounds);
    const values = Object.values(result);
    const EPS = 5e-3;
    for (const v of values) {
      const l = getLightness(v);
      expect(l).toBeGreaterThanOrEqual(bounds.minL - EPS);
      expect(l).toBeLessThanOrEqual(bounds.maxL + EPS);
    }
  });

  it("keeps lightness within provided bounds (inverted)", () => {
    const bounds = { maxL: 0.25, minL: 0.95 } as const;
    const result = swatch("oklch(0.6 0.2 30)", bounds);
    const lo = Math.min(bounds.maxL, bounds.minL);
    const hi = Math.max(bounds.maxL, bounds.minL);
    const values = Object.values(result);
    const EPS = 5e-3;
    for (const v of values) {
      const l = getLightness(v);
      expect(l).toBeGreaterThanOrEqual(lo - EPS);
      expect(l).toBeLessThanOrEqual(hi + EPS);
    }
  });

  it("preserves hex format for hex inputs", () => {
    const result = swatch("#3366ff");
    expect(result[500].startsWith("#")).toBe(true);
  });

  it("preserves non-hex input model (rgb)", () => {
    const result = swatch("rgb(20, 30, 40)");
    expect(result[500].startsWith("rgb")).toBe(true);
  });

  it("preserves non-hex input model (oklch)", () => {
    const result = swatch("oklch(0.6 0.1 120)");
    expect(result[500].startsWith("oklch")).toBe(true);
  });

  it("applies lightnessFactor (>1 keeps mid-tones lighter with normal bounds)", () => {
    const base = swatch("#3366ff", { maxL: 0.97, minL: 0.2, lightnessFactor: 1 });
    const moreLight = swatch("#3366ff", {
      maxL: 0.97,
      minL: 0.2,
      lightnessFactor: 2,
    });
    // Compare around the middle (500 tone is a good proxy here)
    expect(getLightness(moreLight[500])).toBeGreaterThan(getLightness(base[500]));
  });

  it("applies lightnessFactor with inverted bounds (>1 keeps mid-tones closer to start)", () => {
    // Inverted: start near 0.2 and go towards 0.97
    const invBase = swatch("#ff3366", { maxL: 0.2, minL: 0.97, lightnessFactor: 1 });
    const invMore = swatch("#ff3366", { maxL: 0.2, minL: 0.97, lightnessFactor: 2 });
    // With inverted bounds, the sequence climbs; higher factor should keep mid-tones
    // closer to the starting value (maxL=0.2), thus a lower lightness at mid.
    expect(getLightness(invMore[500])).toBeLessThan(getLightness(invBase[500]));
  });

  it("applies variant chroma scaling (vibrant > base)", () => {
    const base = swatch("#3366ff", { variant: "base" });
    const vib = swatch("#3366ff", { variant: "vibrant" });
    expect(getChroma(vib[500])).toBeGreaterThan(getChroma(base[500]));
  });

  it("applies variant chroma scaling (deep < base)", () => {
    const base = swatch("#3366ff", { variant: "base" });
    const deep = swatch("#3366ff", { variant: "deep" });
    expect(getChroma(deep[500])).toBeLessThan(getChroma(base[500]));
  });

  it("applies variant chroma scaling ordering: subtle < pastel < neutral < base < vibrant", () => {
    const subtle = swatch("#0fa", { variant: "subtle" });
    const pastel = swatch("#0fa", { variant: "pastel" });
    const neutral = swatch("#0fa", { variant: "neutral" });
    const base = swatch("#0fa", { variant: "base" });
    const vibrant = swatch("#0fa", { variant: "vibrant" });

    const cSubtle = getChroma(subtle[500]);
    const cPastel = getChroma(pastel[500]);
    const cNeutral = getChroma(neutral[500]);
    const cBase = getChroma(base[500]);
    const cVibrant = getChroma(vibrant[500]);

    expect(cSubtle).toBeLessThan(cPastel);
    expect(cPastel).toBeLessThan(cNeutral);
    expect(cNeutral).toBeLessThan(cBase);
    expect(cBase).toBeLessThan(cVibrant);
  });
});
