import { ChangeEvent, FC, useEffect, useState} from 'react';
import clsx from 'clsx';
import styles from './Underline.module.css';
import CheckIcon from '@/assets/svgs/dark/icon-check.svg';

export interface UnderLineInputProps {
  value: string;
  label: string;
  type?: string;
  name?: string;
  isActive: boolean;
  onChange: (event: string) => void;
}

const Underline: FC<UnderLineInputProps> = ({
  value,
  label,
  type,
  name,
  onChange,
  isActive
}) => {
  const [inputValue, setInputValue] = useState (value);
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue (newValue);
    if (onChange) {
      onChange (newValue);
    }
  };

  const clsUnderlineCard = clsx ({
    [styles.defaultForm__field]: isActive === false,
    [styles.activeForm__field]: isActive === true,
  });
  const clsLabelUnderlineCard = clsx ({
    [styles.defaultForm__label]: isActive === false,
    [styles.activeForm__label]: isActive === true,
  });
  useEffect (
    () => {
      setInputValue (value);
    },
    [value]
  );
  return (
    <div className="flex justify-center h-20">
      <div className={styles.form__group + ' ' + styles.field}>
        {isActive
          ? (
            <CheckIcon className={styles.check_icon} />
          )
          : ''}
        <input
          value={inputValue}
          type={type}
          name={name}
          className={clsUnderlineCard}
          placeholder="Name"
          id="name"
          onChange={handleChange}
          required
        />
        <label htmlFor="name" className={clsLabelUnderlineCard}>
          {label}
        </label>
      </div>
    </div>
  );
}

export default Underline;
