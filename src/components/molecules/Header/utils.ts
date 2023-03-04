import clsx from "clsx";
import { fonts } from "@/config/fonts";

export const variations = {
  header1: {
    clsNav:
      "mx-auto max-w-[1440px] w-full h-[72px] bg-shades-white flex items-center justify-between",
    clsNavItem: clsx(
      "pl-4 last:pr-4",
      fonts.fontWeights.light,
      fonts.text.lg,
      "text-shades-black"
    ),
    clsSocialItemsWrapper: clsx("flex items-center h-full px-8"),
  },
};
