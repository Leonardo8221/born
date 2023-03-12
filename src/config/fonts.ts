export type TextSize = "xs" | "sm" | "md" | "base" | "lg" | "xl" | "2xl";
export type HeadingSize = "lg" | "base" | "md" | "sm";
export type fontWeights = "light" | "regular";

export const fonts = {
  text: {
    xs: "text-[8px] leading-[16px]",
    sm: "text-[10px] leading-[16px]",
    md: "text-[12px] leading-[16px]",
    base: "text-[14px] leading-[24px]",
    lg: "text-[16px] leading-[24px]",
    xl: "text-[18px] leading-[24px]",
    "2xl": "text-[24px] leading-[40px]",
  },
  headings: {
    lg: "text-[64px] leading-[80px]",
    base: "text-[40px] leading-[56px]",
    md: "text-[40px] leading-[48px]",
    sm: "text-[32px] leading-[48px]",
    xs: "text-[24px] leading-[40px]",
  },
  fontWeights: {
    light: "font-light",
    regular: "font-normal",
  },
};
