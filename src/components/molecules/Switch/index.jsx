import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import clsx from "clsx";
import { fonts } from "../../../config/fonts";
import { defaultSwitchButtonClasses, defaultSwitchClasses, toggledButtonClasses, toggleSwitchClasses } from './utils';

const Switch = ({
  label,
  checked,
  onChange,
  position = 'end',
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(!!checked);
  }, []);

  const handleToggle = () => {
    onChange && onChange(!isChecked);
    setIsChecked(!isChecked);
  }

  return (
    <div className={clsx("inline-flex gap-x-3 items-center", position === 'start' && 'flex-row-reverse')}>
      {label && (
        <label className={clsx('inline-block min-w-[275px] mt-px text-shades-black', fonts.text.lg)}>{label}</label>
      )}
      <div className={clsx(defaultSwitchClasses, isChecked && toggleSwitchClasses)} onClick={handleToggle}>
        <div
          className={clsx(defaultSwitchButtonClasses, isChecked && toggledButtonClasses)}
          style={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)' }} />
      </div>
    </div>
  )
}

Switch.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  position: PropTypes.oneOf(['start', 'end']),
};

export default Switch;
