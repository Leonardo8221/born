import { ChangeEvent, FC } from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';
import CheckIcon from '@/assets/svgs/dark/icon-check.svg';

export interface InputProps {
  value: string;
  label: string;
  type: string;
  name: string;
  isValid: boolean;
  isError: boolean;
  onChange: (value: string) => void;
  onError: (message: string) => void;
}

const Input: FC<InputProps> = ({
  label,
  value,
  type,
  name,
  isValid,
  isError,
  onChange,
  onError,
}) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (onChange) {
      onChange (newValue);
    }
  };

  !isError && !isValid && onError ('Error');

  const clsInputFieldCard = clsx ({
    [styles.validInputFieldCard]: isValid === true,
    [styles.errorInputFieldCard]: isError === true,
    [styles.defaultInputFieldCard]: !isError && !isValid,
  });

  return (
    <div className="flex justify-center">
      <div className=" m-10">
        <div className="relative">
          <label className={styles.label}>{label}</label>
          <div
            className={
              `border  rounded flex h-[56px] w-[356px] ` + clsInputFieldCard
            }
          >
            <input
              defaultValue={value}
              type={type}
              name={name}
              className="w-full flex p-4 rounded text-shades-black"
              onChange={handleChange}
            />
            <div className="flex items-center ml-3 mr-4 my-[15px] w-6 h-6">
              {!isError &&
                (isValid ? <CheckIcon height={24} width={24} /> : null)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Input;
