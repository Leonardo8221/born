import DescriptionField from "@/components/molecules/DescriptionField/DescriptionField";
import Input from "@/components/molecules/Inputs/Input";
import Dropdown from "@/components/molecules/Dropdown";
import React, { useState } from "react";

const Showcase = () => {
	const [queryInputs, setQueryInputs] = useState({
		companyName: "",
		yearOfInception: "",
		description: "",
		address: "",
		currencies: "",
	});
	const changeQueryInputs =
		(input: keyof typeof queryInputs) => (value: string) =>
			setQueryInputs((prev) => ({
				...prev,
				[input]: value,
			}));

	const isValidCompanyName = queryInputs.companyName.length > 0;
	const isValidYearOfInception = queryInputs.yearOfInception.length > 0;
	const [errorDescription, setErrorDescription] = useState("");
	const onErrorDescription = (message: string) => {
		if (message !== errorDescription) setErrorDescription(message);
	};
	const isValidAdress = queryInputs.address.length > 0;
	const isValidCurrencies = queryInputs.currencies.length > 0;

	return (
		<div className="flex">
			<div className="w-[352px] mr-[32px]">
				<Input
					label="Company name"
					isRequired={true}
					value={queryInputs.companyName}
					onChange={changeQueryInputs("companyName")}
					isValid={isValidCompanyName}
					isError={!isValidCompanyName}
					className="w-full"
				/>
				<Input
					label="Year of inception"
					value={queryInputs.yearOfInception}
					onChange={changeQueryInputs("yearOfInception")}
					isValid={isValidYearOfInception}
					className="w-full"
				/>
				<DescriptionField
					label="Description"
					value={queryInputs.yearOfInception}
					onChange={changeQueryInputs("description")}
					isError={errorDescription.length > 0}
					onError={onErrorDescription}
				/>
				<Dropdown
					label="Country of origin"
					isValid={false}
					options={[
						{ value: "hieros", name: "Hieros" },
						{ value: "test", name: "Test" },
					]}
					onChange={() => {}}
				/>
				<Dropdown
					label="City"
					className="mt-6"
					isValid={false}
					options={[
						{ value: "hieros", name: "Hieros" },
						{ value: "test", name: "Test" },
					]}
					onChange={() => {}}
				/>
				<Input
					label="Address"
					value={queryInputs.address}
					onChange={changeQueryInputs("address")}
					isValid={isValidAdress}
					className="w-full"
				/>
				<Input
					label="Carried currencies"
					value={queryInputs.currencies}
					onChange={changeQueryInputs("currencies")}
					isValid={isValidCurrencies}
					className="w-full"
				/>
			</div>
		</div>
	);
};

export default Showcase;
