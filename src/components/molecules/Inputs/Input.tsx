import { ChangeEvent, FC } from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';
import CheckIcon from '@/assets/svgs/dark/icon-check.svg';

export interface InputProps {
  value: string | number;
  label: string;
  type?: string;
  name?: string;
  isValid?: boolean;
  isError?: boolean;
  isRequired?: boolean;
  className?: string;
  placeholder?: string;
  isEditMode?: boolean;
  onChange: (value: any) => void;
  onError?: (message: string) => void;
  inputWrapperClasses?: string;
  disabled?: boolean;
  min?: number;
}

const Input: FC<InputProps> = ({
  label,
  value,
  type = 'text',
  name,
  isEditMode = false,
  isValid = false,
  isError = false,
  isRequired = false,
  className = '',
  placeholder,
  onChange,
  onError,
  inputWrapperClasses,
  disabled,
  min,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (onChange) {
      onChange(newValue);
    }
  };

  !isError && !isValid && onError && onError('Error');

  const clsInputFieldCard = clsx({
    [styles.validInputFieldCard]: isValid === true,
    [styles.errorInputFieldCard]: isError === true,
    [styles.defaultInputFieldCard]: !isError && !isValid,
  });

  return (
    <div className={clsx('flex justify-center w-full')}>
      <div
        className={clsx(
          'my-3 w-full',
          disabled &&
            '!cursor-not-allowed !opacity-[0.5] [&>*]:!pointer-events-none',
          className
        )}
      >
        <div className="relative h-[56px]">
          <label className={styles.label}>
            {label}
            {isRequired && (
              <span className="text-neutral-600"> | Required</span>
            )}
          </label>
          {isEditMode ? null : (
            <div
              className={clsx(
                `border rounded flex `,
                clsInputFieldCard,
                inputWrapperClasses
              )}
            >
              <input
                value={value}
                key={value}
                placeholder={placeholder}
                type={type}
                min={min}
                name={name}
                className={clsx(
                  'my-input w-full flex p-3 rounded text-shades-black',
                  styles.resetOutline
                )}
                onChange={handleChange}
                disabled={disabled}
              />
              <div className="flex items-center ml-3 mr-4 my-[15px] w-6">
                {!isError &&
                  (isValid ? <CheckIcon height={24} width={24} /> : null)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Input;
