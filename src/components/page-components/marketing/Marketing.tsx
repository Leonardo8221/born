import { Pill } from '@/components/atoms/Pill';
import { FileUpload } from '@/components/molecules/FileUpload';
import { OrganizationGraphqlDto } from '@/generated/types';
import { apiConfig } from '@/utils/apiConfig';
import { AttachmentResourceApi } from 'client/command';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import Toast from '../Toast';

interface MarketingProps {
  organization: OrganizationGraphqlDto;
}

const Marketing: FC<MarketingProps> = ({ organization }) => {
  const router = useRouter();
  const [activeCollectionId, setActiveCollectionId] = useState<null | number>(
    null
  );
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isBrandUpload, setIsBrandUpload] = useState(false);
  const [isCollectionUpload, setIsCollectionUplaod] = useState(false);

  const id = router?.query?.id || '';
  const organizationId: number = +id;

  const changeActiveCollectionId = (id: number) => () => {
    if (activeCollectionId !== id) {
      setActiveCollectionId(id);
    } else {
      setActiveCollectionId(null);
    }
  };

  const collections = organization?.collections;

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

  const handleUploadOrganizationAttachment = async (file: File) => {
    setIsBrandUpload(true);
    try {
      const config: any = await apiConfig();
      const api = new AttachmentResourceApi(config);
      await api.apiAttachmentUploadOrganizationAttachmentPost(
        'LOOKBOOK',
        organizationId,
        file,
        file.name
      );
      handleSuccessMesssage(`Saved data sucessfully!!`);
      setIsBrandUpload(false);
    } catch (error: any) {
      handleErrorMesssage(
        error?.message || 'Something went wrong, please try again!'
      );
      setIsBrandUpload(false);
      console.error(error);
    }
  };

  const handleUploadCollectionAttachment = async (
    collectionId: number,
    file: File
  ) => {
    setIsCollectionUplaod(true);
    try {
      const config: any = await apiConfig();
      const api = new AttachmentResourceApi(config);
      await api.apiAttachmentUploadCollectionAttachmentPost(
        collectionId,
        'LOOKBOOK',
        file,
        file.name
      );
      handleSuccessMesssage(`Saved data sucessfully!!`);
      setIsCollectionUplaod(false);
    } catch (error: any) {
      handleErrorMesssage(
        error?.message || 'Something went wrong, please try again!'
      );
      setIsCollectionUplaod(false);
      console.error(error);
    }
  };

  return (
    <div className="max-w-[800px]">
      <p className="text-shades-black leading-8 text-[18px] mb-4">
        Add your brand&#8217;s linesheet and lookbook to your profile, or add
        them to a <br></br> specific collection.
      </p>
      <h2 className="mb-6 text-[24px] leading-10 font-light">Brand Profile</h2>
      <FileUpload
        idInput="uploadOrganizationAttachment"
        handleUpload={(file) => {
          if (handleUploadOrganizationAttachment) {
            handleUploadOrganizationAttachment(file);
          }
        }}
        acceptedFileTypes={['application/pdf']}
        labelText="Lookbook | PDF only (25 MB max)"
        className="mb-8"
        disabled={isBrandUpload}
      />
      <h2 className="text-[24px] leading-10 font-light">Collections</h2>
      <p className="text-shades-black leading-8 text-[18px] mb-6">
        Choose a collection, and upload the desired content.
      </p>
      <div className="mb-6">
        {collections &&
          collections?.length > 0 &&
          collections.map((collection, index) => {
            if (!collection?.name || !collection?.id) {
              return null;
            }
            return (
              <Pill
                label={collection?.name || ''}
                key={`${index} collection`}
                isSelectable={false}
                type={
                  activeCollectionId === collection?.id ? 'active' : 'inactive'
                }
                onClick={changeActiveCollectionId(collection.id)}
                className="mr-4 mb-4"
              />
            );
          })}
      </div>
      <FileUpload
        idInput="uploadCollectionAttachment"
        handleUpload={(file) => {
          if (handleUploadCollectionAttachment && activeCollectionId) {
            handleUploadCollectionAttachment(activeCollectionId, file);
          }
        }}
        disabled={!activeCollectionId || isCollectionUpload}
        acceptedFileTypes={['application/pdf']}
        labelText="Lookbook | PDF only (25 MB max)"
        className="mb-8"
      />

      <Toast successMessage={successMessage} errorMessage={errorMessage} />
    </div>
  );
};

export default Marketing;
