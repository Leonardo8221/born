import { FC, useState } from 'react';
import { CollectionCard } from '@/components/molecules/CollectionCard';
import bannerPlaceholder from '@/assets/images/placeholders/banner.png';
import Modal from '@/components/molecules/Modal';
import Description from '../Collections/Description';
import YourCollections from './YourCollections';
import SocialLinks from './SocialLinks';
import FileType from './FileType';
import { OrganizationGraphqlDto } from '@/generated/types';

interface StoryProps {
  onViewCollections: (e: any) => void;
  organization: OrganizationGraphqlDto;
}

const Story: FC<StoryProps> = ({ onViewCollections, organization }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [type, setType] = useState('');

  return (
    <div>
      <div className="mx-auto w-fit flex align-center mt-[7px] mb-[5px] text-[12px]">
        <div className="mr-16">
          <span className="text-neutral-600 mr-[32px]">Founded in</span>
          <span className="text-shades-black">{organization?.year_of_inception}</span>
        </div>
        <div className="mr-16">
          <span className="text-neutral-600 mr-[32px]">Origin</span>
          <span className="text-shades-black">{organization?.country_of_origin}</span>
        </div>
        <div>
          <span className="text-neutral-600 mr-[32px]">Currencies</span>
          <span className="text-shades-black">{organization?.city}</span>
        </div>
      </div>
      <CollectionCard
        backgroundImageSrc={organization?.banner_url || bannerPlaceholder}
        editBanner
        onEdit={(e: any) => e.preventDefault()}
      />
      <Description
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
      <Modal
        className="max-w-[736px] overflow-hidden"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Choose a file type"
      >
        <FileType onClick={setType} />
      </Modal>
    </div>
  );
};

export default Story;
