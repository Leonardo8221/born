import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import {
  AttachmentResourceApi,
  FileType,
  OrganizationResourceApi,
  OrganizationRestDTO,
} from 'client/command';
import { apiConfig } from '@/utils/apiConfig';
import Toast from '@/components/page-components/Toast';
import ShowcaseForm from '../manage/ShowcaseForm';

interface ShowcaseProps {
  organization: any;
  refetch?: () => void;
}

const Showcase: FC<ShowcaseProps> = ({ organization, refetch }) => {
  const router = useRouter();
  const organizationId = Number(router?.query?.id);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState(false);

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

  const handleUpdateOrganizationDetails = async (
    organizationRestDTO: OrganizationRestDTO
  ) => {
    setIsSubmitting(true);
    try {
      const config: any = await apiConfig();
      const api = new OrganizationResourceApi(config);
      await api.apiOrganizationUpdateOrganizationDetailsPut(
        organizationId,
        organizationRestDTO
      );
      handleSuccessMesssage(`Saved data sucessfully!!`);
      setIsSubmitting(false);
      refetch?.();
    } catch (error: any) {
      setIsSubmitting(false);
      handleErrorMesssage(
        error?.message || 'Something went wrong, please try again!'
      );
      console.error(error);
    }
  };

  const handleUploadAttachment = async ({
    type,
    file,
  }: {
    type: FileType;
    file: File;
  }) => {
    type === 'BANNER' ? setIsUploadingBanner(true) : setIsUploadingLogo(true);
    try {
      const config = await apiConfig();
      const api = new AttachmentResourceApi(config);
      await api.apiAttachmentUploadOrganizationAttachmentPost(
        type,
        organizationId,
        file,
        file.name
      );
      type === 'BANNER'
        ? setIsUploadingBanner(false)
        : setIsUploadingLogo(false);
      handleSuccessMesssage('File uploaded successfully!');
      refetch?.();
    } catch (error) {
      type === 'BANNER'
        ? setIsUploadingBanner(false)
        : setIsUploadingLogo(false);
      handleErrorMesssage('File failed to upload!');
    }
  };

  return (
    <>
      <ShowcaseForm
        organization={organization}
        handleUpdateOrganizationDetails={handleUpdateOrganizationDetails}
        isSubmitting={isSubmitting}
        handleUploadAttachment={handleUploadAttachment}
        isBannerUpload={isUploadingBanner}
        isLogoUpload={isUploadingLogo}
      />
      <Toast errorMessage={errorMessage} successMessage={successMessage} />
    </>
  );
};

export default Showcase;
