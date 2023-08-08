import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import { fonts } from '../../../config/fonts';
import { StyledCheckbox } from './checkbox';

export interface CheckboxProps {
  label?: string;
  iconFirst?: boolean;
  checked?: boolean;
  onChange?: (value: boolean) => void;
  variant?: 'accent'
}

export const Checkbox: FC<CheckboxProps> = ({
  label,
  iconFirst = true,
  checked,
  onChange,
  variant,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (checked !== isChecked) {
      setIsChecked(!!checked);
    }
  }, [checked]);

  const handleChecked = () => {
    onChange && onChange(!isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <div
      className={clsx(
        'inline-flex gap-x-[13.25px] items-center',
        !iconFirst && 'flex-row-reverse'
      )}
    >
      <StyledCheckbox checked={isChecked} variant={variant}>
        <input
          type="checkbox"
          className="absolute top-0 left-0 h-full w-full opacity-0 z-[1] cursor-pointer m-0"
          checked={isChecked}
          onChange={handleChecked}
        />
      </StyledCheckbox>
      {label && (
        <label
          className={clsx(
            'inline-block mt-px text-shades-black',
            fonts.text.lg
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
};
