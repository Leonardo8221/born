import clsx from "clsx";
import { createElement } from "react";
import { buttonSize, buttonVariants, outlinedButtonVariants } from "./utils";

export const StyledButton = ({
  as,
  rounded,
  variant,
  color,
  size,
  children,
  className = "",
  label = "",
  ...props
}) => {
  return createElement(
    as,
    {
      className: clsx(
        "flex w-full max-w-[352px] font-normal cursor-pointer items-center justify-center border-0 mx-auto my-0 gap-x-2",
        variant !== "outlined"
          ? buttonVariants[color || "black"]
          : outlinedButtonVariants[color || "black"],
        buttonSize[size || "lg"],
        rounded ? "rounded-[3rem]" : "rounded",
        className
      ),
      ...props,
    },
    <>
      {label}
      {children}
    </>
  );
};
