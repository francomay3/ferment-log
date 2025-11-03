import {
  hex2hsl,
  hex2oklab,
  hex2rgb,
  hsl2hex,
  oklab2hex,
  scheme,
} from "colorizr";
import swatch from "./swatch";

export function createColorVars(scale: Record<string, string>, name: string) {
  const result: Record<string, string> = {};
  for (const [shade, hex] of Object.entries(scale)) {
    const { r, g, b } = hex2rgb(hex);
    result[`--color-${name}-${shade}`] = `${r} ${g} ${b}`;
  }
  return result;
}

const errorSeed = "#f00a15";
const successSeed = "#23cf1d";
const warningSeed = "#e89002";
const infoSeed = "#0da6f2";

function mixOKLAB(c1: string, c2: string, ratio = 0.5) {
  const a = hex2oklab(c1);
  const b = hex2oklab(c2);

  const l = a.l * (1 - ratio) + b.l * ratio;
  const A = a.a * (1 - ratio) + b.a * ratio;
  const B = a.b * (1 - ratio) + b.b * ratio;

  return oklab2hex({ l, a: A, b: B });
}

const slightlyTint = (hex1: string, hex2: string) => mixOKLAB(hex1, hex2, 0.2);

const normalizeLum = (hex: string) => {
  const { h, s } = hex2hsl(hex);
  return hsl2hex({ h, s, l: 50 });
};

export const getVars = (seed: string) => {
  const primary = normalizeLum(seed);
  const secondary = scheme(seed, "analogous")[1];
  const tertiary = scheme(seed, "complementary")[1];
  const error = slightlyTint(errorSeed, seed);
  const success = slightlyTint(successSeed, seed);
  const warning = slightlyTint(warningSeed, seed);
  const info = slightlyTint(infoSeed, seed);

  if (!primary || !secondary || !tertiary) {
    throw new Error("Invalid seed");
  }

  const primarySwatchLight = swatch(primary, {
    maxL: 0.702,
    minL: 0.0314,
    variant: "deep",
  });
  const secondarySwatchLight = swatch(secondary, {
    maxL: 0.9922,
    minL: 0.6157,
    variant: "neutral",
  });
  const tertiarySwatchLight = swatch(tertiary, {
    maxL: 0.9804,
    minL: 0.2,
    variant: "vibrant",
    lightnessFactor: 1.7,
  });
  const errorSwatchLight = swatch(error, {
    maxL: 0.9549,
    minL: 0.2,
    variant: "base",
  });
  const successSwatchLight = swatch(success, {
    maxL: 0.9471,
    minL: 0.151,
    variant: "base",
  });
  const warningSwatchLight = swatch(warning, {
    maxL: 0.9804,
    minL: 0.2,
    variant: "base",
  });
  const infoSwatchLight = swatch(info, {
    maxL: 0.9608,
    minL: 0.1157,
    variant: "base",
  });
  const typographySwatchLight = swatch(primary, {
    maxL: 0.998,
    minL: 0.0902,
    variant: "subtle",
  });
  const outlineSwatchLight = swatch(primary, {
    maxL: 0.9941,
    minL: 0.0961,
    variant: "subtle",
  });
  const backgroundSwatchLight = swatch(primary, {
    maxL: 1,
    minL: 0.0706,
    variant: "subtle",
  });

  const primarySwatchDark = swatch(primary, {
    minL: 0.9902,
    maxL: 0.651,
    variant: "deep",
    lightnessFactor: 1.8,
  });
  const secondarySwatchDark = swatch(secondary, {
    minL: 0.6431,
    maxL: 0.0784,
    variant: "neutral",
  });
  const tertiarySwatchDark = swatch(tertiary, {
    minL: 0.9804,
    maxL: 0.2,
    variant: "vibrant",
  });
  const errorSwatchDark = swatch(error, {
    minL: 0.9549,
    maxL: 0.2,
    variant: "base",
  });
  const successSwatchDark = swatch(success, {
    minL: 0.9471,
    maxL: 0.151,
    variant: "base",
  });
  const warningSwatchDark = swatch(warning, {
    minL: 0.9804,
    maxL: 0.2,
    variant: "base",
  });
  const infoSwatchDark = swatch(info, {
    minL: 0.9608,
    maxL: 0.1157,
    variant: "base",
  });
  const typographySwatchDark = swatch(primary, {
    minL: 0.998,
    maxL: 0.2,
    variant: "subtle",
    lightnessFactor: 1.2,
  });
  const outlineSwatchDark = swatch(primary, {
    minL: 0.99,
    maxL: 0.2,
    variant: "subtle",
    lightnessFactor: 1,
  });
  const backgroundSwatchDark = swatch(primary, {
    minL: 1,
    maxL: 0.07,
    variant: "subtle",
    lightnessFactor: 0.8,
  });

  return {
    light: {
      ...createColorVars(primarySwatchLight, "primary"),
      ...createColorVars(secondarySwatchLight, "secondary"),
      ...createColorVars(tertiarySwatchLight, "tertiary"),
      ...createColorVars(typographySwatchLight, "typography"),
      ...createColorVars(outlineSwatchLight, "outline"),
      ...createColorVars(backgroundSwatchLight, "background"),
      ...createColorVars(errorSwatchLight, "error"),
      ...createColorVars(successSwatchLight, "success"),
      ...createColorVars(warningSwatchLight, "warning"),
      ...createColorVars(infoSwatchLight, "info"),
    },
    dark: {
      ...createColorVars(primarySwatchDark, "primary"),
      ...createColorVars(secondarySwatchDark, "secondary"),
      ...createColorVars(tertiarySwatchDark, "tertiary"),
      ...createColorVars(typographySwatchDark, "typography"),
      ...createColorVars(outlineSwatchDark, "outline"),
      ...createColorVars(backgroundSwatchDark, "background"),
      ...createColorVars(errorSwatchDark, "error"),
      ...createColorVars(successSwatchDark, "success"),
      ...createColorVars(warningSwatchDark, "warning"),
      ...createColorVars(infoSwatchDark, "info"),
    },
  };
};
