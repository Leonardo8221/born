import { FC, useEffect, useState } from 'react';
import DescriptionField from '@/components/molecules/DescriptionField/DescriptionField';
import Input from '@/components/molecules/Inputs/Input';
import Dropdown from '@/components/molecules/Dropdown';
import { FileUpload } from '@/components/molecules/FileUpload';
import { OrganizationGraphqlDto } from '@/generated/types';
import { Button } from '@/components/molecules/Button';
import { FileType, OrganizationRestDTO } from 'client/command';

interface ShowcaseFormProps {
  organization: OrganizationGraphqlDto;
  handleUpdateOrganizationDetails: (
    organizationRestDTO: OrganizationRestDTO
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
    currency_types: organization?.currency_types?.join(', ') || '',
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

  const isValidCompanyName = queryInputs.name.length > 0;

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
          <Dropdown
            label="Country of origin"
            isValid={false}
            selectedOption={{
              value: organization?.country_of_origin || '',
              name: 'String',
            }}
            options={[
              { value: 'string', name: 'String' },
              { value: 'hieros', name: 'Hieros' },
            ]}
            width={352}
            className="!mx-0 !h-[56px] !w-[352px] [&>div]:!w-full"
            onChange={() => {}}
          />
          <Dropdown
            label="City"
            className="mt-6 !mx-0 !h-[56px] !w-[352px] [&>div]:!w-full"
            isValid={false}
            selectedOption={{
              value: organization?.city || '',
              name: 'String',
            }}
            options={[
              { value: 'hieros', name: 'Hieros' },
              { value: 'test', name: 'Test' },
            ]}
            width={352}
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
            label="Carried currency"
            value={queryInputs?.currency_types}
            onChange={changeQueryInputs('currency_types')}
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
            handleUpdateOrganizationDetails({
              ...queryInputs,
              currency_types: new Set(
                queryInputs?.currency_types?.split(', ')
              ) as Set<string>,
            });
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
