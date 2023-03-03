import style from "./checkbox.module.css";
import clsx from "clsx";

export const StyledCheckbox = ({ children, checked, ...props }) => {
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
