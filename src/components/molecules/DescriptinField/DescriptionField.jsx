import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { theme } from '../../../config/theme';
import styles from './DescriptionField.module.css';
function Input({ label, onChange, onError, value, placeholder }) {
	const [inputValue, setInputValue] = useState('');
	const handleChange = (event) => {
		const newValue = event.target.value;
		setInputValue(newValue);
		if (onChange) {
			onChange(newValue);
		}
		if (newValue.length === 10) {
			onError('Description is too long');
		} else {
			onError('');
		}
	};

	return (
		<div className="flex justify-center">
			<div className=" m-10">
				<div className="relative">
					<label className={styles.label}>{label}</label>
					<div className="border border-neutral-500 rounded h-[190px]  ">
						<textarea
							defaultValue={value}
							type="text"
							onChange={handleChange}
							placeholder={placeholder}
							className={clsx(
								`h-[188px] w-[356px] p-4 'text-shades-black' rounded focus:outline-none`,
								theme.fonts.text['base'],
							)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

Input.propTypes = {
	value: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onError: PropTypes.func,
};
Input.defaultProps = {
	value: '',
	label: 'Description',
	placeholder: 'Text here...',
	onChange: (event) => {
		console.log('Value changed:', event.target.value);
	},
	onError: (event) => {
		console.log('Error occurred:', event);
	},
};
export default Input;
