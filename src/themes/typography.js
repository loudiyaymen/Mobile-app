const BASE_TEXT_SIZE_OPTIONS = [14, 16, 18, 20, 22, 24];
const DEFAULT_TEXT_SIZE_INDEX = 1;

const BASE_STYLES = {
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontFamily: "Metropolis-Bold",
  },
  h2: {
    fontSize: 24,
    lineHeight: 31.2,
    fontFamily: "Metropolis-SemiBold",
  },
  h3: {
    fontSize: 20,
    lineHeight: 27,
    fontFamily: "Metropolis-SemiBold",
  },
  h4: {
    fontSize: 18,
    lineHeight: 25.2,
    fontFamily: "Metropolis-SemiBold",
  },
  h5: {
    fontSize: 16,
    lineHeight: 22.4,
    fontFamily: "Metropolis-Medium",
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Metropolis-Regular",
  },
  caption: {
    fontSize: 12,
    lineHeight: 15.6,
    fontFamily: "Metropolis-Regular",
  },
  secondaryH3: {
    fontSize: 20,
    lineHeight: 27,
    fontFamily: "Arial",
    fontWeight: "700",
  },
  secondaryH4: {
    fontSize: 18,
    lineHeight: 25.2,
    fontFamily: "Arial",
    fontWeight: "600",
  },
  secondaryH5: {
    fontSize: 16,
    lineHeight: 22.4,
    fontFamily: "Arial",
    fontWeight: "600",
  },
  secondaryBody: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: "Arial",
    fontWeight: "400",
  },
  secondaryCaption: {
    fontSize: 12,
    lineHeight: 16.8,
    fontFamily: "Arial",
    fontWeight: "400",
  },
};

let currentTextSizeIndex = DEFAULT_TEXT_SIZE_INDEX;

function getScaleFromIndex(index) {
  const safeIndex = Math.max(
    0,
    Math.min(BASE_TEXT_SIZE_OPTIONS.length - 1, index),
  );
  const selectedSize =
    BASE_TEXT_SIZE_OPTIONS[safeIndex] ||
    BASE_TEXT_SIZE_OPTIONS[DEFAULT_TEXT_SIZE_INDEX];
  const baseSize = BASE_TEXT_SIZE_OPTIONS[DEFAULT_TEXT_SIZE_INDEX];
  return selectedSize / baseSize;
}

function scaleValue(value, scale) {
  return Math.round(value * scale * 10) / 10;
}

function buildStyle(style) {
  const scale = getScaleFromIndex(currentTextSizeIndex);
  return {
    ...style,
    fontSize: scaleValue(style.fontSize, scale),
    lineHeight: scaleValue(style.lineHeight, scale),
  };
}

export function setTypographyTextSizeIndex(index) {
  currentTextSizeIndex = Number.isInteger(index)
    ? index
    : DEFAULT_TEXT_SIZE_INDEX;
}

export function getTypographyTextSizeIndex() {
  return currentTextSizeIndex;
}

export const typography = {};

Object.keys(BASE_STYLES).forEach((key) => {
  Object.defineProperty(typography, key, {
    enumerable: true,
    get() {
      return buildStyle(BASE_STYLES[key]);
    },
  });
});
