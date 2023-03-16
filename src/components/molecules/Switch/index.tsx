import { FC, useEffect, useState } from "react";
import clsx from "clsx";
import { fonts } from "@/config/fonts";
import {
  defaultSwitchButtonClasses,
  defaultSwitchClasses,
  toggledButtonClasses,
  toggleSwitchClasses,
} from "./utils";

export interface SwitchProps {
  label?: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  position?: "start" | "end";
  classNameLabel?: string;
}

const Switch: FC<SwitchProps> = ({
  label,
  checked,
  onChange,
  position = "end",
  classNameLabel,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(!!checked);
  }, [checked]);

  const handleToggle = () => {
    onChange && onChange(!isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <div
      className={clsx(
        "inline-flex gap-x-3 items-center",
        position === "start" && "flex-row-reverse"
      )}
    >
      {label && (
        <label
          className={clsx(
            "inline-block mt-px text-shades-black",
            fonts.text.lg,
            classNameLabel
          )}
        >
          {label}
        </label>
      )}
      <div
        className={clsx(defaultSwitchClasses, isChecked && toggleSwitchClasses)}
        onClick={handleToggle}
      >
        <div
          className={clsx(
            defaultSwitchButtonClasses,
            isChecked && toggledButtonClasses
          )}
          style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}
        />
      </div>
    </div>
  );
};

export default Switch;
