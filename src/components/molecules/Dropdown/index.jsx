import {Fragment, useState, useRef, useEffect} from 'react';
import {Listbox, Transition} from '@headlessui/react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {theme} from '@/config/theme';
import DropDownDownIcon from '@/assets/svgs/dark/icon-dropdown-down.svg';
import DropDownUpIcon from '@/assets/svgs/dark/icon-dropdown-up.svg';
import CheckIcon from '@/assets/svgs/dark/icon-check.svg';
import styles from './Dropdown.module.css';

export default function Dropdown({label, onChange, options, isValid}) {
  const [selected, setSelected] = useState (options[0]);
  const [isExpand, setIsExpand] = useState (false);

  const clsDropDownCard = clsx ({
    [styles.defaultDropDownCard]: !isExpand === true,
    [styles.expandedDropDownCard]: isExpand === true,
    [styles.validDropDownCard]: !isExpand && isValid,
  });
  const handleChange = event => {
    setSelected (event);
    if (onChange) {
      onChange (selected);
    }
  };
  const dropdownRef = useRef (null);
  const handleClick = event => {
    setIsExpand (!isExpand);
    if (event.target.getAttribute ('data-headlessui-state') === 'disabled') {
      setIsExpand (true);
    }
  };
  function handleDocumentClick (event) {
    if (dropdownRef.current && !dropdownRef.current.contains (event.target)) {
      setIsExpand (false);
    }
  }

  useEffect (() => {
    document.addEventListener ('click', handleDocumentClick);
    return () => {
      document.removeEventListener ('click', handleDocumentClick);
    };
  }, []);

  return (
    <div ref={dropdownRef}>
      <div
        className={clsx (`flex justify-center m-10 `, theme.fonts.text['base'])}
      >
        <div onClick={handleClick}>
          <Listbox value={selected} onChange={handleChange}>
            <div className={styles.container}>
              <Listbox.Button
                className={
                  `relative w-full rounded-t text-left focus:outline-none focus-visible:border-shades-black px-4 pt-4  text-shades-black flex justify-between ` +
                    clsDropDownCard
                }
              >
                <span className={styles.label}>{label}</span>
                <span className={styles.name}>{selected.name}</span>
                <span className="flex items-center">
                  {isValid
                    ? <CheckIcon className="mx-3" alt="check" />
                    : null
                  }
                  {isExpand
                    ? <DropDownUpIcon />
                    : <DropDownDownIcon />
                  }
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="w-full rounded-b border-r border-l border-b border-shades-black">
                  {options
                    .filter (option => option !== selected)
                    .map ((option, personIdx) => (
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
}
Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf (
    PropTypes.shape ({
      value: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
};
Dropdown.defaultProps = {
  label: 'Select Category',
  isValid: false,
  onChange: event => {
    console.log ('Option changed:', event);
  },
  options: {value: '0', name: 'Clothing'},
};
