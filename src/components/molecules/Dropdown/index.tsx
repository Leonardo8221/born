import { Fragment, useState, useRef, useEffect, FC } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { theme } from '@/config/theme';
import DropDownDownIcon from '@/assets/svgs/dark/icon-dropdown-down.svg';
import DropDownUpIcon from '@/assets/svgs/dark/icon-dropdown-up.svg';
import CheckIcon from '@/assets/svgs/dark/icon-check.svg';
import styles from './Dropdown.module.css';

type Option = {
  value: string;
  name: string;
  isDisabled?: boolean;
};

export interface DropdownProps {
  label: string;
  isValid: boolean;
  onChange: (value?: Option) => void;
  options: Option[];
  className?: string;
  selectedOption?: Option;
  width?: number;
}

const Dropdown: FC<DropdownProps> = ({
  label,
  onChange,
  options,
  isValid,
  className,
  selectedOption,
  width,
}) => {
  const [isDropdownSelected, setIsDropdownSelected] = useState(false);
  const [selected, setSelected] = useState(selectedOption);
  const [isExpand, setIsExpand] = useState(false);

  useEffect(() => {
    !isDropdownSelected && setSelected(selectedOption);
  }, [selectedOption])

  const clsDropDownCard = clsx({
    [styles.defaultDropDownCard]: !isExpand === true,
    [styles.expandedDropDownCard]: isExpand === true,
    [styles.validDropDownCard]: !isExpand && isValid,
  });

  const handleChange = (event: Option) => {
    setIsDropdownSelected(true);
    setSelected(event);
    if (onChange) {
      onChange(event);
    }
  };
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: any) => {
    setIsExpand(!isExpand);
    if (event.target.getAttribute('data-headlessui-state') === 'disabled') {
      setIsExpand(true);
    }
  };
  function handleDocumentClick(event: any) {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsExpand(false);
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <div
        className={clsx(
          `relative flex justify-center my-3 mx-2`,
          theme.fonts.text['base'],
          className
        )}
      >
        <div className="w-full" onClick={handleClick}>
          <Listbox value={selected} onChange={handleChange}>
            <div className={styles.container}>
              <Listbox.Button
                className={
                  `mu-input h-full relative w-full rounded-t text-left focus:outline-none focus-visible:border-shades-black px-4 pt-4  text-shades-black flex justify-between ` +
                  clsDropDownCard
                }
              >
                <span className={styles.label}>{label}</span>
                <span className={styles.name}>{selected?.name || ''}</span>
                <span className="flex items-center">
                  {selected?.value && isValid ? (
                    <CheckIcon className="mx-3" alt="check" />
                  ) : null}
                  {isExpand ? <DropDownUpIcon /> : <DropDownDownIcon />}
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options
                  className={clsx(
                    'rounded-b  border-r border-l border-b border-[#CCCCCC] absolute z-10 bg-shades-white',
                    width ? `!w-[${width}px]` : '!w-full'
                  )}
                >
                  {options
                    .filter((option) => option.value !== selected?.value)
                    .map((option, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={styles.option}
                        value={option}
                        disabled={option.isDisabled}
                      >
                        {option.name}
                      </Listbox.Option>
                    ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
