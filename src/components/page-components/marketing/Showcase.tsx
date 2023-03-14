import DescriptionField from "@/components/molecules/DescriptionField/DescriptionField";
import Input from "@/components/molecules/Inputs/Input";
import Dropdown from "@/components/molecules/Dropdown";
import React, { FC, useEffect, useState } from "react";
import { FileUpload } from "@/components/molecules/FileUpload";
import { Button } from "@/components/molecules/Button";
import { OrganizationProps } from "@/pages/organization/[id]/manage/marketing";

const Showcase: FC<OrganizationProps> = ({organization, handleUpdateOrganizationDetails}) => {
  const initialQueries = {
    name: organization?.name || "",
    year_of_inception: organization?.year_of_inception || "",
    description: organization?.description || "",
    address: organization?.address || "",
    currency_types: organization?.currency_types?.join(", ") || "",
    website_link: organization?.website_link || "",
    instagram_link: organization?.instagram_link || "",
  };
	const [queryInputs, setQueryInputs] = useState(initialQueries);
	const changeQueryInputs =
		(input: keyof typeof queryInputs) => (value: string) =>
			setQueryInputs((prev) => ({
				...prev,
				[input]: value,
			}));

	const isValidCompanyName = queryInputs.name.length > 0;
	const isValidYearOfInception = queryInputs.year_of_inception.length > 0;
	const [errorDescription, setErrorDescription] = useState("");
	const onErrorDescription = (message: string) => {
		if (message !== errorDescription) setErrorDescription(message);
	};
	const isValidAdress = queryInputs.address.length > 0;
	const isValidCurrencies = queryInputs.currency_types.length > 0;
	const isValidInstagramLink = queryInputs.instagram_link.length > 0;
	const isValidWebsiteLink = queryInputs.website_link.length > 0;

  useEffect(() => {
    if(organization){
      setQueryInputs(initialQueries)
    }
  }, [organization])
  

    return (
      <>
        <div className="flex">
          <div className="w-[352px] mr-[32px]">
            <Input
              label="Company name"
              isRequired={true}
              value={queryInputs.name}
              onChange={changeQueryInputs("name")}
              isValid={isValidCompanyName}
              isError={!isValidCompanyName}
              className="w-full"
            />
            <Input
              label="Year of inception"
              value={queryInputs.year_of_inception}
              onChange={changeQueryInputs("year_of_inception")}
              isValid={isValidYearOfInception}
              className="w-full"
            />
            <DescriptionField
              label="Description"
              placeholder="Text..."
              value={queryInputs.description}
              onChange={changeQueryInputs("description")}
              isError={errorDescription.length > 0}
              onError={onErrorDescription}
            />
            <Dropdown
              label="Country of origin"
              isValid={false}
              selectedOption={{
                value: organization?.country_of_origin || "",
                name: "String",
              }}
              options={[
                { value: "string", name: "String" },
                { value: "hieros", name: "Hieros" },
              ]}
              onChange={() => {}}
            />
            <Dropdown
              label="City"
              className="mt-6"
              isValid={false}
              selectedOption={{
                value: organization?.city || "",
                name: "String",
              }}
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
              value={queryInputs.currency_types}
              onChange={changeQueryInputs("currency_types")}
              isValid={isValidCurrencies}
              className="w-full"
            />
          </div>
          <div className="w-[352px]">
            <FileUpload
              handleAcceptedFiles={(e) => console.log(e)}
              variant="circle"
              acceptedFileTypes={["image/jpeg", "image/png", "image/heic"]}
              labelText="Company logo"
              className="mt-3"
            />
            <FileUpload
              acceptedFileTypes={["image/jpeg", "image/png", "image/heic"]}
              labelText="Banner image"
              className="mt-[29px] mb-3"
            />
            <Input
              className="mr-auto"
              label="Instagram link"
              value={queryInputs.instagram_link}
              onChange={changeQueryInputs("instagram_link")}
              isValid={isValidInstagramLink}
            />
            <Input
              className="mr-auto"
              label="Website link"
              value={queryInputs.website_link}
              onChange={changeQueryInputs("website_link")}
              isValid={isValidWebsiteLink}
            />
          </div>
        </div>
        <Button
          onClick={() => {
            if (handleUpdateOrganizationDetails) {
              const currency_types = 
                queryInputs.currency_types.split(", ")
              handleUpdateOrganizationDetails({
                ...queryInputs,
                currency_types: currency_types as any,
              });
            }
          }}
          disabled={!isValidCompanyName || errorDescription.length > 0}
          className="ml-0 w-auto mt-[20px]"
        >
          Save
        </Button>
      </>
    );
};

export default Showcase;
