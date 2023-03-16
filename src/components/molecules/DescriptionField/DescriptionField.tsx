import { ChangeEvent, FC, useState } from 'react';
import clsx from 'clsx';
import { theme } from '@/config/theme';
import styles from './DescriptionField.module.css';

export interface DescriptionFieldProps {
  onError?: (message: string) => void;
  onChange?: (event: string) => void;
  label: string;
  value?: string;
  placeholder?: string;
  isError?: boolean;
  className?: string;
  inputClasses?: string;
}

const DescriptionField: FC<DescriptionFieldProps> = ({
  label,
  onChange,
  onError,
  value,
  placeholder,
  isError,
  className,
  inputClasses,
}) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    if (onChange) {
      onChange(newValue);
    }
    if (newValue.length > 254) {
      onError?.('Description is too long');
    } else {
      onError?.('');
    }
  };

  return (
    <div className={clsx('flex justify-center')}>
      <div className={clsx('flex-1', className)}>
        <div>
          <label className={styles.label}>{label}</label>
          <div
            className={clsx(
              'border w-full border-neutral-600 rounded h-[190px]',
              {
                [styles.errorTextarea]: isError === true,
              }
            )}
          >
            <textarea
              defaultValue={value}
              onChange={handleChange}
              placeholder={placeholder}
              className={clsx(
                styles.textarea,
                `h-[188px] !w-full p-4 'text-shades-black' rounded focus:outline-none`,
                theme.fonts.text['base'],
                inputClasses
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionField;
