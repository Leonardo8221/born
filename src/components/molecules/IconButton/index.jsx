import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import { IconButtonSize, IconButtonColor } from "./utils";

export const IconButton = React.forwardRef(
  (
    {
      size = IconButtonSize.SM,
      icon = null,
      disabled = false,
      className = "",
      classNameIcon = "",
      color = IconButtonColor.WHITE,
      onClick = () => {},
      rounded = false,

      type,
      ...rest
    },
    ref
  ) => {
    const clsButtonSize = {
      [IconButtonSize.SM]: "h-8 w-8",
      [IconButtonSize.MD]: "h-10 w-10",
    };
    const clsIconSize = {
      [IconButtonSize.SM]: "[&>svg]:!h-6 [&>svg]:!w-6",
      [IconButtonSize.MD]: "[&>svg]:!h-8 [&>svg]:!w-8",
    };
    const clsButtonColor = {
      [IconButtonColor.WHITE]: "border border-neutral-600 bg-shades-white",
      [IconButtonColor.BLACK]: "bg-shades-black border border-shades-black",
    };
    const clsIconColor = {
      [IconButtonColor.WHITE]: "text-shades-black",
      [IconButtonColor.BLACK]: "!text-shades-white",
    };

    return (
      <button
        className={clsx(
          "inline-flex shrink-0 items-center justify-center",
          disabled ? "cursor-default" : "cursor-pointer",
          rounded ? "rounded-full" : "rounded-[4px]",
          clsButtonColor[color],
          clsButtonSize[size],
          clsIconColor[color],
          className
        )}
        onClick={onClick}
        ref={ref}
        type={type}
        {...rest}
      >
        {icon &&
          React.cloneElement(
            icon,
            {
              className: clsx(
                'flex',
                clsIconSize[size],
                clsIconColor[color],
                classNameIcon
              ),
            },
            null
          )}
      </button>
    );
  }
);

IconButton.propTypes = {
  size: PropTypes.oneOf(Object.values(IconButtonSize)),
  color: PropTypes.oneOf(Object.values(IconButtonColor)),
  rounded: PropTypes.bool,
  icon: PropTypes.func,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  className: PropTypes.string,
  classNameIcon: PropTypes.string,
  type: PropTypes.string,
};
