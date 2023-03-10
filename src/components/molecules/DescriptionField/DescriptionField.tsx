import { ChangeEvent, FC, useState } from "react";
import clsx from "clsx";
import { theme } from "@/config/theme";
import styles from "./DescriptionField.module.css";

export interface DescriptionFieldProps {
  onError?: (message: string) => void;
  onChange?: (event: string) => void;
  label: string;
  value?: string;
  placeholder?: string;
  isError?: boolean;
  className?: string;
}

const DescriptionField: FC<DescriptionFieldProps> = ({
  label,
  onChange,
  onError,
  value,
  placeholder,
  isError,
  className,
}) => {
  // const [inputValue, setInputValue] = useState("");
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;

    // setInputValue(newValue);
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
    <div className={clsx('flex justify-center', styles.container)}>
      <div className={clsx('my-3', className)}>
        <div className="relative">
          <label className={styles.label}>{label}</label>
          <div
            className={clsx('border border-neutral-500 rounded h-[190px]', {
              [styles.errorTextarea]: isError === true,
            })}
          >
            <textarea
              defaultValue={value}
              onChange={handleChange}
              placeholder={placeholder}
              className={clsx(
                styles.textarea,
                `h-[188px] w-[356px] p-4 'text-shades-black' rounded focus:outline-none`,
                theme.fonts.text['base']
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DescriptionField;
