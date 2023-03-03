import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { theme } from '../../../config/theme';
function OrderDetails({ column1, column2, column3 }) {
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

OrderDetails.propType = {
	column1: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string,
			value: PropTypes.string,
		}),
	).isRequired,
	column2: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string,
			value: PropTypes.string,
		}),
	).isRequired,
	column3: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string,
			value: PropTypes.string,
		}),
	).isRequired,
};

OrderDetails.defaultProps = {
	column1: { key: 'Purchase order', value: '092356' },
	column2: {
		key: 'Billing address',
		value: `Yox Net-A-Porter Group SPA (DC4)
  C/O Class S.P.A NET-A-PORTER
  Inbound Stock
  Via Privata Paolo Baffi, 2
  Landriano (Pavia), 27015
  Italy`,
	},
	column3: { key: 'Payment terms', value: 'Net 60' },
};

export default OrderDetails;
