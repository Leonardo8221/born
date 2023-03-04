import { FC } from 'react';
import clsx from 'clsx';
import { theme } from '@/config/theme';
import styles from './Toggle.module.css';

export interface ToggleProps {
	currencies: string[];
	onChange: (e: any) => void;
}

const Toggle: FC<ToggleProps> = ({ currencies, onChange }) => {
	const handleToggleChange = (param: any) => (event: any) => {
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
};

export default Toggle;
