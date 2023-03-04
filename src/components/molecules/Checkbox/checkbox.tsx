import { FC } from "react";
import clsx from "clsx";
import style from "./checkbox.module.css";

interface StyledCheckboxProps {
  children?: any;
  checked?: boolean;
}

export const StyledCheckbox: FC<StyledCheckboxProps> = ({ children, checked, ...props }) => {
  return (
    <div
      className={clsx(
        style.customCheckbox,
        checked ? style.customCheckbox_checked : ""
      )}
      {...props}
    >
      {children}
    </div>
  );
};
