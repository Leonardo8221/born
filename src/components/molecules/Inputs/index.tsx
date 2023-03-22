import { FC, HTMLProps, useRef, useState } from 'react';
import clsx from 'clsx';
import { theme } from '@/config/theme';
import styles from './Input.module.css';

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string;
  value: string;
  editMode?: boolean;
  inputType?: string;
  className?: string;
}

const Input: FC<InputProps> = ({
  value,
  label,
  editMode = false,
  inputType,
  className,
  ...props
}) => {
  const inputRef = useRef<any>(null)

  const focusInput = () => {
    inputRef.current && inputRef?.current?.focus?.()
  }

  return (
    <div className={clsx('flex-1', className)}>
      {editMode ? (
        <>
          <div
            className={`${
              inputType === 'textarea' ? 'h-[140px]' : 'h-[28px] items-center'
            } flex cursor-text border border-[#D8D8D8] rounded w-full p-2 overflow-hidden`}
            onClick={focusInput}
          >
            <label className="block cursor-text text-[#999999] font-light leading-tight mr-4 min-w-[132px] max-w-[132px]:">
              {label}
            </label>
            {inputType === 'textarea' ? (
              <>
                <textarea
                  {...props as any}
                  rows={4}
                  cols={50}
                  className="w-full text-[#666666] font-light leading-tight focus:outline-none focus:shadow-outline h-full"
                  ref={inputRef}
                >
                  {value}
                </textarea>
              </>
            ) : (
              <input
                {...props}
                className="w-full text-[#666666] font-light leading-tight focus:outline-none focus:shadow-outline h-full"
                id="username"
                defaultValue={value}
                ref={inputRef}
              />
            )}
          </div>
        </>
      ) : (
        <>
          <span className={styles.label}>{label}</span>
          <input
            {...props}
            className={clsx(
              'h-[56px] w-full p-4 text-shades-black border border-neutral-500 rounded',
              theme.fonts.text['base']
            )}
          />
        </>
      )}
    </div>
  );
};

export default Input;
