import { FC, HTMLProps } from 'react';
import clsx from 'clsx';
import { theme } from '@/config/theme';
import styles from './Input.module.css';

interface InputProps extends HTMLProps<HTMLInputElement> {
	label: string;
	value: string;
}

const Input: FC<InputProps> = ({ value, label, ...props }) => {
	return (
		<div className="flex justify-center">
			<div className="w-full relative">
				<span className={styles.label}>{label}</span>
				<input
					{...props}
					type="text"
					className={clsx(
						'h-[56px] w-full p-4 text-shades-black border border-neutral-500 rounded',
						theme.fonts.text['base'],
					)}
				/>
			</div>
		</div>
	);
}

export default Input;
