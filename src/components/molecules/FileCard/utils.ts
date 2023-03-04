import styles from "./FileCard.module.css";

export const variants = {
  circle: {
    clsWrapper:
      "group relative cursor-pointer h-[140px] w-[140px] rounded-full bg-neutral-200 flex items-center justify-center",
    clsContainer:
      "relative w-[122px] h-[122px] rounded-full flex items-center justify-center",
    clsOverlay: styles.circleVariant,
    clsFilledOverlay:
      "absolute w-full h-full z-[1] transition rounded-full group-hover:bg-shades-black group-hover:bg-opacity-20",
    clsImage: "h-full w-full object-cover rounded-[4px] rounded-full",
  },
  rectangle: {
    clsWrapper: "group relative cursor-pointer",
    clsContainer: "relative w-[268px] h-[117px]",
    clsOverlay: styles.bannerVariant,
    clsFilledOverlay:
      "absolute w-full h-full z-[1] transition rounded-[4px] group-hover:bg-shades-black group-hover:bg-opacity-20",
    clsImage: "h-full w-full object-cover rounded-[4px]",
  },
  product: {
    clsWrapper: "group relative cursor-pointer",
    clsContainer: "relative w-[120px] h-[77px]",
    clsOverlay: styles.bannerVariant,
    clsFilledOverlay:
      "absolute w-full h-full z-[1] transition rounded-[4px] group-hover:bg-shades-black group-hover:bg-opacity-20",
    clsImage: "h-full w-full object-cover rounded-[4px]",
  },
};
