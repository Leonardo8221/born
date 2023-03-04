import { ChangeEvent, FC, useState } from 'react';
import clsx from 'clsx';
import { theme } from '@/config/theme';
import styles from './DescriptionField.module.css';

export interface DescriptionFieldProps extends HTMLTextAreaElement {
	onError?: (message: string) => void;
	onChange?: (event: string) => void;
	label: string;
}

const DescriptionField: FC<DescriptionFieldProps> = ({
	label,
	onChange,
	onError,
	value,
	placeholder
}) => {
	const [inputValue, setInputValue] = useState('');
	const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const newValue = event.target.value;
		
		setInputValue(newValue);
		if (onChange) {
			onChange(newValue);
		}
		if (newValue.length === 10) {
			onError?.('Description is too long');
		} else {
			onError?.('');
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

export default DescriptionField;
