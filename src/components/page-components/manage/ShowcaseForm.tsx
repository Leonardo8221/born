import { FC, useEffect, useState } from 'react';
import DescriptionField from '@/components/molecules/DescriptionField/DescriptionField';
import Input from '@/components/molecules/Inputs/Input';
import { FileUpload } from '@/components/molecules/FileUpload';
import { OrganizationGraphqlDto } from '@/generated/types';
import { Button } from '@/components/molecules/Button';
import { FileType, OrganizationRequestDTO } from 'client/command';

interface ShowcaseFormProps {
  organization: OrganizationGraphqlDto;
  handleUpdateOrganizationDetails: (
    organizationRestDTO: OrganizationRequestDTO
  ) => void;
  handleUploadAttachment: ({
    type,
    file,
  }: {
    type: FileType;
    file: File;
  }) => void;
  isSubmitting?: boolean;
  isBannerUpload?: boolean;
  isLogoUpload?: boolean;
}

const ShowcaseForm: FC<ShowcaseFormProps> = ({
  organization,
  handleUpdateOrganizationDetails,
  isSubmitting,
  handleUploadAttachment,
  isBannerUpload,
  isLogoUpload,
}) => {
  const initialQueries = {
    name: organization?.name || '',
    year_of_inception: organization?.year_of_inception || '',
    description: organization?.description || '',
    address: organization?.address || '',
    website_link: organization?.website_link || '',
    instagram_link: organization?.instagram_link || '',
    city: organization?.city || '',
    country_of_origin: organization?.country_of_origin || '',
  };

  useEffect(() => {
    if (organization) {
      setQueryInputs(initialQueries);
    }
  }, [organization]);

  const [queryInputs, setQueryInputs] = useState(initialQueries);
  const changeQueryInputs =
    (input: keyof typeof queryInputs) => (value: string) =>
      setQueryInputs((prev) => ({
        ...prev,
        [input]: value,
      }));

  const isValidAdress = queryInputs.address.length > 0;
  const isValidInstagramLink = queryInputs.instagram_link.length > 0;
  const isValidWebsiteLink = queryInputs.website_link.length > 0;
  const isValidYearOfInception = queryInputs.year_of_inception.length > 0;
  const isValidCountryOfOrigin = queryInputs.country_of_origin.length > 0;
  const isValidCompanyName = queryInputs.name.length > 0;
  const isValidCity = queryInputs.city.length > 0;

  const [errorDescription, setErrorDescription] = useState('');

  const onErrorDescription = (message: string) => {
    if (message !== errorDescription) setErrorDescription(message);
  };

  return (
    <div>
      <div className="flex">
        <div className="w-[352px] mr-[32px]">
          <Input
            label="Company name"
            isRequired={true}
            value={queryInputs.name}
            onChange={changeQueryInputs('name')}
            isValid={isValidCompanyName}
            isError={!isValidCompanyName}
            className="w-full"
          />
          <Input
            label="Year of inception"
            value={queryInputs.year_of_inception}
            onChange={changeQueryInputs('year_of_inception')}
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
            inputClasses="!w-full"
            className='!w-full'
          />
          <Input
            label="Country of origin"
            value={queryInputs.country_of_origin}
            onChange={changeQueryInputs('country_of_origin')}
            isValid={isValidCountryOfOrigin}
            className="w-full"
          />
          <Input
            label="City"
            value={queryInputs.city}
            onChange={changeQueryInputs('city')}
            isValid={isValidCity}
            className="w-full"
          />
          <Input
            label="Address"
            value={queryInputs.address}
            onChange={changeQueryInputs('address')}
            isValid={isValidAdress}
            className="w-full"
          />
        </div>
        <div className="w-[352px]">
          <FileUpload
            handleUpload={(e) =>
              handleUploadAttachment({ type: 'LOGO', file: e })
            }
            variant="circle"
            acceptedFileTypes={['image/jpeg', 'image/png', 'image/heic']}
            labelText="Company logo"
            className="mt-3"
            idInput='company_logo'
            disabled={isLogoUpload}
            imageUrl={organization?.logo_url || ''}
          />
          <FileUpload
            handleUpload={(e) =>
              handleUploadAttachment({ type: 'BANNER', file: e })
            }
            acceptedFileTypes={['image/jpeg', 'image/png', 'image/heic']}
            labelText="Banner image"
            className="mt-[29px] mb-3"
            idInput='banner_image'
            disabled={isBannerUpload}
            imageUrl={organization?.banner_url || ''}
          />
          <Input
            className="mr-auto"
            label="Instagram link"
            value={queryInputs.instagram_link}
            onChange={changeQueryInputs('instagram_link')}
            isValid={isValidInstagramLink}
          />
          <Input
            className="mr-auto"
            label="Website link"
            value={queryInputs.website_link}
            onChange={changeQueryInputs('website_link')}
            isValid={isValidWebsiteLink}
          />
        </div>
      </div>
      <Button
        onClick={() => {
          if (handleUpdateOrganizationDetails) {
            handleUpdateOrganizationDetails(queryInputs);
          }
        }}
        disabled={
          !isValidCompanyName || errorDescription.length > 0 || isSubmitting
        }
        className="ml-0 w-auto mt-[20px]"
      >
        Save
      </Button>
    </div>
  );
};

export default ShowcaseForm;
