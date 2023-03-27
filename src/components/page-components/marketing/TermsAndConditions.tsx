import { Button } from '@/components/molecules/Button';
import DescriptionField from '@/components/molecules/DescriptionField/DescriptionField';
import { apiConfig } from '@/utils/apiConfig';
import { OrganizationResourceApi, OrganizationRequestDTO } from 'client/command';
import { useRouter } from 'next/router';
// import { OrganizationProps } from "@/pages/organization/[id]/manage/marketing";
import React, { FC, useEffect, useState } from 'react';
import Toast from '../Toast';

const TermsAndConditions: FC<any> = ({ organization, refetch }) => {
  const router = useRouter();
  const organizationId = Number(router?.query?.id);

  //messages
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [queryDescription, setQueryDescription] = useState('');
  const [errorDescription, setErrorDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleErrorMesssage = (message: string) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const handleSuccessMesssage = (message: string) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const onErrorDescription = (message: string) => {
    if (message !== errorDescription) setErrorDescription(message);
  };

  const handleUpdateOrganizationDetails = async (
    organizationRestDTO: OrganizationRequestDTO
  ) => {
    setIsLoading(true);
    try {
      const config: any = await apiConfig();
      const api = new OrganizationResourceApi(config);
      await api.apiOrganizationUpdateOrganizationDetailsPut(
        organizationId,
        organizationRestDTO
      );
      refetch();
      handleSuccessMesssage(`Saved data sucessfully!!`);
      setIsLoading(false);
    } catch (error: any) {
      handleErrorMesssage(
        error?.message || 'Something went wrong, please try again!'
      );
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (organization?.terms_and_conditions) {
      setQueryDescription(organization.terms_and_conditions);
    }
  }, [organization]);

  return (
    <>
      <p className="max-w-[672px] text-shades-black font-light leading-8 text-[18px] mb-2">
        Let buyer know how you typically transact by providing your ordering terms and conditions.
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
          handleUpdateOrganizationDetails({
            terms_and_conditions: queryDescription,
          });
        }}
        disabled={errorDescription.length > 0 || isLoading}
        className="ml-0 w-auto mt-[20px]"
      >
        Save
      </Button>
      <Toast successMessage={successMessage} errorMessage={errorMessage} />
    </>
  );
};

export default TermsAndConditions;
