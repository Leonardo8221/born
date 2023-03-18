import { ChangeEvent, FC } from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';
import CheckIcon from '@/assets/svgs/dark/icon-check.svg';

export interface InputProps {
  value: string;
  label: string;
  type?: string;
  name?: string;
  isValid?: boolean;
  isError?: boolean;
  isRequired?: boolean;
  className?: string;
  placeholder?: string;
  isEditMode?: boolean;
  onChange: (value: string) => void;
  onError?: (message: string) => void;
  inputWrapperClasses?: string;
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
    <div className="flex justify-center">
      <div className={clsx('my-3 w-full', className)}>
        <div className="relative">
          <label className={styles.label}>
            {label}
            {isRequired && (
              <span className="text-neutral-600"> | Required</span>
            )}
          </label>
          {isEditMode ? null : (
            <div
              className={clsx(
                `border rounded flex h-[56px] `,
                clsInputFieldCard,
                inputWrapperClasses
              )}
            >
              <input
                defaultValue={value}
                placeholder={placeholder}
                type={type}
                name={name}
                className={clsx(
                  'my-input w-full flex p-4 rounded text-shades-black',
                  styles.resetOutline
                )}
                onChange={handleChange}
              />
              <div className="flex items-center ml-3 mr-4 my-[15px] w-6 h-6">
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
