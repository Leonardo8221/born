import clsx from 'clsx';
import PropTypes from 'prop-types';
import { theme } from '../../../config/theme';
import styles from './Toggle.module.css';

export default function Toggle({ currencies, onChange }) {
	const handleToggleChange = (param) => (event) => {
		if (onChange) {
			onChange(param + ' is ' + event.target.checked);
		}
	};

	return (
		<div className="flex justify-center p-4">
			{currencies.map((currency, index) => (
				<div key={index} className="flex mr-4">
					<div
						className={clsx(
							`flex items-center text-shades-black mr-2`,
							theme.fonts.text['base'],
						)}
					>
						{currency}
					</div>
					<div className={`flex items-center`}>
						<input
							type="checkbox"
							id={currency}
							onChange={handleToggleChange(currency)}
						/>
						<label htmlFor={currency} className={styles.label}>
							{currency}
						</label>
					</div>
				</div>
			))}
		</div>
	);
}
Toggle.propTypes = {
	currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
	onChange: PropTypes.func,
};
Toggle.defaultProps = {
	currencies: ['USD'],
	onChange: (event) => {
		console.log('Value changed:', event.target.checked);
	},
};
