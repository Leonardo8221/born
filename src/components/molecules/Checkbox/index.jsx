import React, { useEffect, useState } from "react";
import { PropTypes } from 'prop-types';
import clsx from "clsx";
import { fonts } from "../../../config/fonts";
import { StyledCheckbox } from "./checkbox";

export const Checkbox = ({ label, iconFirst = true, checked, onChange }) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChecked = () => {
    onChange && onChange(!isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <div className={clsx("inline-flex gap-x-[13.25px] items-center", !iconFirst && 'flex-row-reverse')}>
      <StyledCheckbox checked={isChecked}>
        <input
          type="checkbox"
          className="absolute top-0 left-0 h-full w-full opacity-0 z-[1] cursor-pointer m-0"
          checked={isChecked}
          onClick={handleChecked}
          />
      </StyledCheckbox>
      {label && <label className={clsx('inline-block mt-px text-shades-black', fonts.text.lg)}>{label}</label>}
    </div>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string,
  iconFirst: PropTypes.bool,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};
