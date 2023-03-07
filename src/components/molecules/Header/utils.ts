import clsx from "clsx";
import { fonts } from "@/config/fonts";

export const variations = {
  header1: {
    clsNav:
      "mx-auto max-w-[1440px] w-full h-[72px] flex items-center justify-between px-8",
    clsNavItem: clsx(
      "pl-4 last:pr-4",
      fonts.fontWeights.light,
      fonts.text.lg,
      "text-shades-black"
    ),
    clsSocialItemsWrapper: clsx("flex items-center h-full"),
  },
};
