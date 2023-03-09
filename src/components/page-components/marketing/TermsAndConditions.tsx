import DescriptionField from "@/components/molecules/DescriptionField/DescriptionField";
import React, { useState } from "react";

const TermsAndConditions = () => {
	const [queryDescription, setQueryDescription] = useState("");
	const [errorDescription, setErrorDescription] = useState("");
	const onErrorDescription = (message: string) => {
		if (message !== errorDescription) setErrorDescription(message);
	};

	return (
		<>
			<p className="text-shades-black leading-8 text-[18px] mb-2">
				Let buyer know how you typically transact by providing your
				ordering <br /> terms and conditions.
			</p>
			<DescriptionField
				label="Description"
				placeholder="Text..."
				value={queryDescription}
				onChange={setQueryDescription}
				isError={errorDescription.length > 0}
				onError={onErrorDescription}
				className="mr-auto"
			/>
		</>
	);
};

export default TermsAndConditions;
