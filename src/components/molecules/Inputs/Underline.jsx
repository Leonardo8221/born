import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import styles from './Underline.module.css';
// import CheckIcon from '../../../assets/svgs/dark/icon-check.png';

import CheckIcon from '../../../assets/svgs/dark/icon-check.svg';
function Underline({value, label, type, name, onChange, onError, isActive}) {
  const [inputValue, setInputValue] = useState (value);
  const handleChange = event => {
    const newValue = event.target.value;
    setInputValue (newValue);
    if (onChange) {
      onChange (newValue);
    }
  };

  //   value !== '' ? (isActive = true) : (isActive = false);

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
          ? <img
              src={CheckIcon}
              alt="checkIcon"
              className={styles.check_icon}
            />
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

Underline.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
  onError: PropTypes.func,
};
Underline.defaultProps = {
  value: '',
  label: 'Company name',
  isActive: false,
  onChange: event => {
    console.log ('Value changed:', event.target.value);
  },
  onError: event => {
    console.log ('Error occurred:', event.target.value);
  },
};
export default Underline;
