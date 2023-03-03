import { FC } from "react";
import clsx from "clsx";
import { fonts } from "@/config/fonts";
import { TageSizes, TagSize, TagType, TagTypes } from "./utils";

export interface TagProps {
  label?: string;
  type?: TagTypes,
  size?: TageSizes,
  className?: string;
  children?: JSX.Element;
}

export const Tag: FC<TagProps> = ({
  label = "",
  type = TagType.DEFAULT,
  size = TagSize.DEFAULT,
  className = "",
  children,
  ...rest
}) => {
  const clsBaseStyle = {
    [TagType.DEFAULT]: "bg-neutral-200 text-shades-black",
    [TagType.STATUS]: "bg-accent-b-200 text-shades-black",
  };

  const clsFontSize = {
    [TagSize.DEFAULT]: clsx(fonts.text.md, fonts.fontWeights.regular),
    [TagSize.WIDER]: clsx(fonts.text.md, fonts.fontWeights.regular),
  };

  const clsPadding = {
    [TagSize.DEFAULT]: "px-4 py-[7px]",
    [TagSize.WIDER]: "px-[26px] py-[7px]",
  };

  return (
    <div
      className={clsx(
        "inline-block whitespace-nowrap rounded-[100px] tracking-[.06em]",
        clsBaseStyle[type],
        clsFontSize[size],
        clsPadding[size],

        className
      )}
      {...rest}
    >
      {label}
      {children}
    </div>
  );
};
