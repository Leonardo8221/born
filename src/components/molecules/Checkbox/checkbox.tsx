import { FC } from 'react';
import clsx from 'clsx';
import style from './checkbox.module.css';

interface StyledCheckboxProps {
  children?: any;
  checked?: boolean;
  variant?: 'accent'
}

export const StyledCheckbox: FC<StyledCheckboxProps> = ({
  children,
  checked,
  variant,
  ...props
}) => {
  return (
    <div
      className={clsx(
        variant === 'accent' ? style.accentCheckbox : style.customCheckbox,
        checked ? (variant === 'accent' ? style.accent_styles : style.customCheckbox_checked) : 'z-[1] !bg-shades-white',
      )}
      {...props}
    >
      {children}
    </div>
  );
};
