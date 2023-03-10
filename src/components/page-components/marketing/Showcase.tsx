import DescriptionField from "@/components/molecules/DescriptionField/DescriptionField";
import Input from "@/components/molecules/Inputs/Input";
import Dropdown from "@/components/molecules/Dropdown";
import React, { useState } from "react";
import { FileUpload } from "@/components/molecules/FileUpload";
import { Button } from "@/components/molecules/Button";

const Showcase = () => {
	const [queryInputs, setQueryInputs] = useState({
		companyName: "",
		yearOfInception: "",
		description: "",
		address: "",
		currencies: "",
		websiteLink: "",
		instagramLink: "",
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
	const isValidInstagramLink = queryInputs.instagramLink.length > 0;
	const isValidWebsiteLink = queryInputs.websiteLink.length > 0;

    return (
      <>
        <div className="flex">
          <div className="w-[352px] mr-[32px]">
            <Input
              label="Company name"
              isRequired={true}
              value={queryInputs.companyName}
              onChange={changeQueryInputs('companyName')}
              isValid={isValidCompanyName}
              isError={!isValidCompanyName}
              className="w-full"
            />
            <Input
              label="Year of inception"
              value={queryInputs.yearOfInception}
              onChange={changeQueryInputs('yearOfInception')}
              isValid={isValidYearOfInception}
              className="w-full"
            />
            <DescriptionField
              label="Description"
              placeholder="Text..."
              value={queryInputs.description}
              onChange={changeQueryInputs('description')}
              isError={errorDescription.length > 0}
              onError={onErrorDescription}
            />
            <Dropdown
              label="Country of origin"
              isValid={false}
              options={[
                { value: 'hieros', name: 'Hieros' },
                { value: 'test', name: 'Test' },
              ]}
              onChange={() => {}}
            />
            <Dropdown
              label="City"
              className="mt-6"
              isValid={false}
              options={[
                { value: 'hieros', name: 'Hieros' },
                { value: 'test', name: 'Test' },
              ]}
              onChange={() => {}}
            />
            <Input
              label="Address"
              value={queryInputs.address}
              onChange={changeQueryInputs('address')}
              isValid={isValidAdress}
              className="w-full"
            />
            <Input
              label="Carried currencies"
              value={queryInputs.currencies}
              onChange={changeQueryInputs('currencies')}
              isValid={isValidCurrencies}
              className="w-full"
            />
          </div>
          <div className="w-[352px]">
            <FileUpload
              variant="circle"
              acceptedFileTypes={['image/jpeg', 'image/png', 'image/heic']}
              labelText="Company logo"
              className="mt-3"
            />
            <FileUpload
              acceptedFileTypes={['image/jpeg', 'image/png', 'image/heic']}
              labelText="Banner image"
              className="mt-[29px] mb-3"
            />
            <Input
              className="mr-auto"
              label="Instagram link"
              value={queryInputs.instagramLink}
              onChange={changeQueryInputs('instagramLink')}
              isValid={isValidInstagramLink}
            />
            <Input
              className="mr-auto"
              label="Website link"
              value={queryInputs.websiteLink}
              onChange={changeQueryInputs('websiteLink')}
              isValid={isValidWebsiteLink}
            />
          </div>
        </div>
        <Button
          disabled={!isValidCompanyName || errorDescription.length > 0}
          className="ml-0 w-auto mt-[20px]"
        >
          Save
        </Button>
      </>
    );
};

export default Showcase;
