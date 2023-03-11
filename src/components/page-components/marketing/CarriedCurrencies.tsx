import Switch from "@/components/molecules/Switch";
import React from "react";

const CarriedCurrencies = () => {
	const currencies = [{ label: "USD" }, { label: "GBP" }, { label: "EUR" }];
	return (
		<>
			<p className="text-shades-black leading-8 text-[18px] mb-8">
				Indicate what are the currencies you typically transact in
			</p>
			{currencies?.length > 0 && (
				<div className="flex">
					{currencies.map((currency, index) => {
						return (
							<div
								className="mr-[26px]"
								key={`${index} currency`}
							>
								<Switch
									label={currency.label}
									classNameLabel="min-w-[0px]"
								/>
							</div>
						);
					})}
				</div>
			)}
		</>
	);
};

export default CarriedCurrencies;
