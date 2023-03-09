import { FC, useState } from "react";
import clsx from "clsx";

import {
  PillAppearance,
  PillSize,
  PillType,
} from "./utils";
import { fonts } from "../../../config/fonts";

export interface PillProps {
  label?: string;
  type?: typeof PillType[keyof typeof PillType],
  size?: typeof PillSize[keyof typeof PillSize],
  appearance?: typeof PillAppearance[keyof typeof PillAppearance],
  hasIcon?: boolean;
  isSelectable?: boolean;
  children?: JSX.Element;
}

const CheckIcon = (
  <svg
    width="11"
    height="8"
    viewBox="0 0 11 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      fill="white"
      d="M4.53033 7.46967C4.23743 7.76256 3.76256 7.76256 3.46967 7.46967L0.641243 4.64124C0.34835 4.34835 0.34835 3.87348 0.641242 3.58058C0.934136 3.28769 1.40901 3.28769 1.7019 3.58058L4 5.87868L9.12652 0.752155C9.41942 0.459262 9.89429 0.459262 10.1872 0.752155C10.4801 1.04505 10.4801 1.51992 10.1872 1.81282L4.53033 7.46967Z"
    />
  </svg>
);

export const Pill: FC<PillProps> = ({
  label = "",
  type = PillType.INACTIVE,
  size = PillSize.MD,
  appearance = PillAppearance.OUTLINED,
  isSelectable = false,
  children,
  hasIcon = false,
  ...rest
}) => {
  const clsBaseStyle = {
    [PillAppearance.FILLED]: "bg-neutral-200 text-shades-black",
  };

  const clsFontSize = {
    [PillSize.SM]: clsx(fonts.text.md, fonts.fontWeights.regular),
    [PillSize.MD]: clsx(fonts.text.md, fonts.fontWeights.regular),
  };
  const clsPadding = {
    [PillSize.SM]: "px-4 py-[7px]",
    [PillSize.MD]: "px-4 py-[11px]",
  };
  const clsAppearance = {
    [PillAppearance.OUTLINED]: {
      [PillType.ACTIVE]: "bg-shades-black text-shades-white",
      [PillType.INACTIVE]:
        "bg-shades-white text-neutral-700 border border-neutral-400",
    },
    [PillAppearance.FILLED]: {
      [PillType.ACTIVE]: "border border-shades-black",
    },
  };

  const [selected, setSelected] = useState(type);

  return (
    <div
      onClick={() => {
        if (isSelectable) {
          setSelected(
            selected === PillType.ACTIVE ? PillType.INACTIVE : PillType.ACTIVE
          );
        }
      }}
      className={clsx(
        "inline-block cursor-pointer select-none whitespace-nowrap rounded-[100px] tracking-[.06em]",
        clsBaseStyle[appearance],
        clsFontSize[size],
        clsPadding[size],
        clsAppearance[appearance]?.[selected],
        hasIcon ? "inline-flex items-center justify-center" : ""
      )}
      {...rest}
    >
      {label}
      {children}

      {selected === PillType.ACTIVE && !!hasIcon && (
        <div className="pl-2 text-shade-white flex items-center h-full ">
          {CheckIcon}
        </div>
      )}
    </div>
  );
};
