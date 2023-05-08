import { FC, HTMLProps, useRef, useState } from 'react';
import clsx from 'clsx';
import { theme } from '@/config/theme';
import styles from './Input.module.css';
import { Icon } from '../Icon';

interface InputProps extends HTMLProps<HTMLInputElement> {
  label: string;
  value: string;
  editMode?: boolean;
  inputType?: string;
  className?: string;
  options?: string[];
  handleSelect?: (item: string) => void;
}

const Input: FC<InputProps> = ({
  value,
  label,
  editMode = false,
  inputType,
  className,
  options,
  handleSelect,
  ...props
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const inputRef = useRef<any>(null);

  const focusInput = () => {
    if (inputType === 'dropdown') {
      setIsDropdownOpen(!isDropdownOpen);
    } else {
      inputRef.current && inputRef?.current?.focus?.();
    }
  };

  return (
    <div className={clsx('flex-1', className)}>
      {editMode ? (
        <>
          <div className="relative flex items-center">
            <div
              className={clsx(
                inputType === 'textarea'
                  ? 'h-[140px]'
                  : 'h-[28px] items-center',
                label === 'Season'
                  ? '!cursor-pointer [&>*]:cursor-pointer'
                  : '',
                'relative flex cursor-text border border-[#D8D8D8] rounded w-full p-2 overflow-hidden',
                isDropdownOpen ? 'rounded-bl-none rounded-br-none' : ''
              )}
              onClick={focusInput}
            >
              <label className="block cursor-text text-[#999999] font-light leading-tight mr-4 min-w-[132px] max-w-[132px]:">
                {label}
              </label>
              {inputType === 'textarea' ? (
                <>
                  <textarea
                    {...(props as any)}
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
                  value={value}
                  ref={inputRef}
                  readOnly={inputType === 'dropdown'}
                />
              )}
              {inputType === 'dropdown' && <Icon name="icon-chevron-down" />}
            </div>
            {isDropdownOpen && (
              <div className="absolute w-full top-[28px] z-[2] bg-shades-white border border-t-0 border-neutral-500 rounded-bl rounded-br">
                {options?.map((item) => (
                  <div
                    key={item}
                    className="cursor-pointer flex items-center p-2"
                    onClick={() => {
                      handleSelect?.(item);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <div className="w-[132px] mr-4"></div>
                    <div key={item}>{item}</div>
                  </div>
                ))}
              </div>
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
