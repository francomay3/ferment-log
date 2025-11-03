import {
  extractColorParts,
  formatCSS,
  isHex,
  parseCSS,
  type ColorType,
  type LCH,
} from "colorizr";

export type CustomSwatchTokens =
  | 0
  | 50
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900
  | 950;

export type CustomSwatch = { [key in CustomSwatchTokens]: string };

export interface CustomSwatchOptions {
  /** Upper bound for the lightest shade (0..1). Default: 0.97 */
  maxL?: number;
  /** Lower bound for the darkest shade (0..1). Default: 0.2 */
  minL?: number;
  /** Swatch chroma variant. */
  variant?: "base" | "deep" | "neutral" | "pastel" | "subtle" | "vibrant";
  /**
   * Lightness tuning factor.
   * 1 = linear; >1 emphasizes lighter tones; <1 emphasizes darker tones. Default: 1.5
   */
  lightnessFactor?: number;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function shadeColor(base: LCH, lightness: number): LCH {
  const { c, h } = base;
  const chromaScale = c === 0 ? 1 : 4 * lightness * (1 - lightness);
  const chroma = clamp(c * chromaScale, 0, 0.4);
  return { l: lightness, c: chroma, h };
}

const TONES: readonly CustomSwatchTokens[] = [
  0, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
] as const;

export default function swatch(
  input: string,
  options: CustomSwatchOptions = {}
): CustomSwatch {
  const {
    maxL = 0.97,
    minL = 0.2,
    variant = "base",
    lightnessFactor = 1.5,
  } = options;

  // Allow inverted bounds to support 0 as darkest and 950 as lightest.
  // Only enforce that both values are within [0,1].
  if (!(maxL >= 0 && maxL <= 1 && minL >= 0 && minL <= 1)) {
    throw new Error("maxL and minL must be within [0,1].");
  }

  const lch = parseCSS(input, "oklch");

  // Adjust chroma based on variant inspiration from colorizr swatch
  const chromaScale = {
    base: 1,
    deep: 0.8,
    neutral: 0.5,
    pastel: 0.3,
    subtle: 0.2,
    vibrant: 1.25,
  }[variant];
  lch.c *= chromaScale;

  // Preserve input format unless it is hex (then keep hex)
  const colorFormat: ColorType = isHex(input)
    ? "hex"
    : extractColorParts(input).model;

  const steps = TONES.length; // 12

  const lightnessAtIndex = (index: number): number => {
    const t = index / (steps - 1);
    return maxL - (maxL - minL) * Math.pow(t, lightnessFactor);
  };

  // Build swatch
  const out = {} as CustomSwatch;
  TONES.forEach((tone, index) => {
    const l = lightnessAtIndex(index);
    const color = shadeColor(lch, l);
    out[tone] = formatCSS(color, { format: colorFormat });
  });

  return out;
}
