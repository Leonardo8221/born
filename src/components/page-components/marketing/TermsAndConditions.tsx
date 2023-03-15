import { Button } from "@/components/molecules/Button";
import DescriptionField from "@/components/molecules/DescriptionField/DescriptionField";
// import { OrganizationProps } from "@/pages/organization/[id]/manage/marketing";
import React, { FC, useEffect, useState } from "react";

const TermsAndConditions: FC<any> = ({
  organization,
  handleUpdateOrganizationDetails,
}) => {
  const [queryDescription, setQueryDescription] = useState("");
  const [errorDescription, setErrorDescription] = useState("");
  const onErrorDescription = (message: string) => {
    if (message !== errorDescription) setErrorDescription(message);
  };

  useEffect(() => {
    if (organization?.terms_and_conditions) {
      setQueryDescription(organization.terms_and_conditions);
    }
  }, [organization]);

  return (
    <>
      <p className="text-shades-black leading-8 text-[18px] mb-2">
        Let buyer know how you typically transact by providing your ordering{" "}
        <br /> terms and conditions.
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
      <Button
        onClick={() => {
          if (handleUpdateOrganizationDetails) {
            handleUpdateOrganizationDetails({
              terms_and_conditions: queryDescription,
            });
          }
        }}
        disabled={errorDescription.length > 0}
        className="ml-0 w-auto mt-[20px]"
      >
        Save
      </Button>
    </>
  );
};

export default TermsAndConditions;
