import { FC, useState } from 'react';
import { CollectionCard } from '@/components/molecules/CollectionCard';
import bannerPlaceholder from '@/assets/images/placeholders/banner.png';
import Description from '../Collections/Description';
import YourCollections from './YourCollections';
import SocialLinks from './SocialLinks';
import { OrganizationGraphqlDto } from '@/generated/types';
import { useRouter } from 'next/router';
import LinesheetUpload from './LinesheetUpload';
import { AttachmentResourceApi, OrganizationResourceApi } from 'client/command';
import Toast from '../Toast';
import { apiConfig } from '@/utils/apiConfig';

interface StoryProps {
  onViewCollections: (e: any) => void;
  organization: OrganizationGraphqlDto;
  refetch: () => void;
}

const Story: FC<StoryProps> = ({
  onViewCollections,
  organization,
  refetch,
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleUploadFile = async ({
    fileType,
    file,
    name,
    onReset,
  }: {
    fileType: 'LINESHEET' | 'LOOKBOOK' | null;
    file: File | null;
    name: string;
    onReset: () => void;
  }) => {
    try {
      if (fileType && file) {
        const config = await apiConfig();
        const api = new AttachmentResourceApi(config);
        const organizationApi = new OrganizationResourceApi(config);
        await api.apiAttachmentUploadOrganizationAttachmentPost(
          fileType,
          organization.id,
          file,
          file.name
        );
        const payload = {
          linesheet_name:
            (fileType === 'LINESHEET' ? name : organization.linesheet_name) ||
            '',
          lookbook_name:
            (fileType === 'LOOKBOOK' ? name : organization.lookbook_name) || '',
        };
        await organizationApi.apiOrganizationUpdateOrganizationDetailsPut(
          organization.id,
          payload
        );
        setSuccessMessage('File uploaded successfully');
        setTimeout(() => setSuccessMessage(''), 3000);
        setIsOpen(false);
        onReset();
        refetch();
      } else {
        setErrorMessage('File is required!');
        setTimeout(() => setErrorMessage(''), 3000);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Something went wrong. Please try again!');
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  return (
    <div>
      <div className="mx-auto w-fit flex align-center mt-[7px] mb-[5px] text-[12px]">
        <div className="mr-16">
          <span className="text-neutral-600 mr-[32px]">Founded in</span>
          <span className="text-shades-black">
            {organization?.year_of_inception}
          </span>
        </div>
        <div className="mr-16">
          <span className="text-neutral-600 mr-[32px]">Origin</span>
          <span className="text-shades-black">
            {organization?.country_of_origin}
          </span>
        </div>
        <div>
          <span className="text-neutral-600 mr-[32px]">Currencies</span>
          <span className="text-shades-black">
            {organization?.currency_types?.join(' / ')}
          </span>
        </div>
      </div>
      <CollectionCard
        backgroundImageSrc={organization?.banner_url || bannerPlaceholder}
        editBanner
        editButtonText="Edit marketing"
        onEdit={(e: any) =>
          router.push(`/organization/${organization?.id}/manage/profile`)
        }
      />
      <Description
        lookbookName={organization?.lookbook_name || ''}
        lookbookUrl={organization?.lookbook_url || ''}
        linesheetName={organization?.linesheet_name || ''}
        linesheetUrl={organization?.linesheet_url || ''}
        description={organization?.description || ''}
        onUpload={() => setIsOpen(true)}
      />
      {organization?.collections?.length && (
        <YourCollections
          collections={organization?.collections}
          onViewCollections={onViewCollections}
        />
      )}
      <SocialLinks />
      <LinesheetUpload
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleSubmit={handleUploadFile}
      />
      <Toast errorMessage={errorMessage} successMessage={successMessage} />
    </div>
  );
};

export default Story;
