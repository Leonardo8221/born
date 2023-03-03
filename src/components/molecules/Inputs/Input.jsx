import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Input.module.css';
import CheckIcon from '../../../assets/svgs/dark/icon-check.svg';

function Input({
  label,
  value,
  type,
  name,
  isValid,
  isError,
  onChange,
  onError,
}) {
  const handleChange = event => {
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
                (isValid ? <img src={CheckIcon} alt="checkIcon" /> : null)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Input.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  isValid: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  onError: PropTypes.func,
};
Input.defaultProps = {
  value: '',
  label: 'Enter name',
  type: 'text',
  name: 'brand',
  isValid: false,
  isError: true,
  onChange: event => {
    console.log ('Value changed:', event.target.value);
  },
  onError: event => {
    console.log ('Error occurred:', event);
  },
};
export default Input;
