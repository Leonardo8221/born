import { FC, HTMLProps } from 'react';
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
  return (
    <div className={clsx('flex-1', className)}>
      {editMode ? (
        <>
          <div
            className={`${
              inputType === 'textarea' ? 'h-auto' : 'h-7 items-center'
            } flex border border-[#D8D8D8] rounded mx-2 my-1 w-full p-2 overflow-hidden`}
          >
            <label className="block text-[#999999] font-light leading-tight mr-4 min-w-[132px] max-w-[132px]:">
              {label}
            </label>
            {inputType === 'textarea' ? (
              <>
                <textarea
                  rows={4}
                  cols={50}
                  className="w-full text-[#666666] font-light leading-tight focus:outline-none focus:shadow-outline h-full"
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
