import { FC } from 'react';
import clsx from 'clsx';
import { theme } from '@/config/theme';

type Column = {
	key: string;
	value: string;
}

export interface OrderDetailsProps {
	column1: Column[];
	column2: Column[];
	column3: Column[];
}

const OrderDetails: FC<OrderDetailsProps> = ({ column1, column2, column3 }) => {
	return (
		<div
			className={clsx(
				'flex flex-col lg:flex-row font-light tracking-[.06em]',
				theme.fonts.text['md'],
			)}
		>
			<div className="container mx-auto p-10">
				{column1.map((item, index) => (
					<div key={index} className="flex">
						<div className="text-neutral-600 w-[132px] mx-2 my-1.5">
							{item.key}
						</div>
						<div className="text-shades-black w-[300px] mx-2 my-1.5">
							{item.value}
						</div>
					</div>
				))}
			</div>
			<div className="container mx-auto p-10">
				{column2.map((item, index) => (
					<div key={index} className="flex">
						<div className="text-neutral-600 w-[132px] mx-2 my-1.5">
							{item.key}
						</div>
						<div className="text-neutral-700 w-[300px] mx-2 my-1.5">
							{item.value}
						</div>
					</div>
				))}
			</div>
			<div className="container mx-auto p-10">
				{column3.map((item, index) => (
					<div key={index} className="flex">
						<div className="text-neutral-600 w-[132px] mx-2 my-1.5">
							{item.key}
						</div>
						<div className="text-shades-black w-[300px] mx-2 my-1.5">
							{item.value}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default OrderDetails;
