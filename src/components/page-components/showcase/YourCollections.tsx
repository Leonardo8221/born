import { FC, useState } from 'react';
import Link from 'next/link';
import { CollectionCard } from '@/components/molecules/CollectionCard';
import { Heading } from '@/components/molecules/Heading';
import { Button } from '@/components/molecules/Button';
import { Icon } from '@/components/molecules/Icon';
import bgImage1 from '@/assets/images/placeholders/collection-preview.png';
import InnerCardImage from '@/assets/images/collection-card/inner-collection-card-image.png';
import Modal from '@/components/molecules/Modal';
import CreateCollection from './CreateCollection';
import { apiConfig } from '@/utils/apiConfig';
import { CollectionResourceApi } from 'client/command';
import { useRouter } from 'next/router';
import Toast from '../Toast';

interface YourCollectionProps {
  collections?: any;
  onViewCollections: (e: any) => void;
}

const YourCollections: FC<YourCollectionProps> = ({
  onViewCollections,
  collections,
}) => {
  const router = useRouter();
  const organizationId = Number(router?.query?.id);
  const [isCreateCollection, setIsCreateCollection] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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
      setIsCreateCollection(false);
    }, 3000);
  };

  const handleCreateCollection = async (newCollection: any) => {
    try {
      const config: any = await apiConfig();
      const api = new CollectionResourceApi(config);
      await api.apiCollectionCreateNewCollectionPost(
        organizationId,
        newCollection
      );
      setIsCreateCollection(false);
      handleSuccessMesssage('New collection added successfully!');
    } catch (error) {
      handleErrorMesssage('Faild to add new collection!');
      console.error(error);
    }
  };

  const renderCollections = () => {
    return collections?.map(
      (item: any, index: number) =>
        item.id && (
          <Link
            key={item.id}
            href={`/organization/1/discover/collections/${item.id}`}
          >
            <CollectionCard
              backgroundImageSrc={bgImage1}
              imageSrc={item?.banner_url || InnerCardImage}
              label={item?.name || undefined}
              hasOverlay={index === 1}
              cardClasses="!h-[272px] !max-w-auto min-w-[736px]"
            />
          </Link>
        )
    );
  };

  return (
    <div>
      <div className="max-w-[1376px] mx-auto relative">
        <Button
          variant="outlined"
          className="absolute right-0 top-[6px]"
          onClick={() => setIsCreateCollection(true)}
        >
          Create Collection
        </Button>
      </div>
      <div className="max-w-[1120px] mx-auto">
        <Heading
          as="h3"
          size="sm"
          className="mt-[64px] !font-light text-shades-black text-center"
        >
          Your Collections
        </Heading>
        <div className="flex mt-10">{renderCollections()}</div>
        <div className="mt-48px">
          <Button
            onClick={onViewCollections}
            variant="link"
            className="!bg-shades-white !text-shades-black"
          >
            View all collections <Icon name="icon-arrow-right" />
          </Button>
        </div>
      </div>

      <Modal
        isOpen={isCreateCollection}
        onClose={() => setIsCreateCollection(false)}
        title={'Name this collection'}
        className="!max-h-[417px] !max-w-[736px] overflow-x-hidden overflow-y-auto"
      >
        <CreateCollection
          handleSubmit={(newCollection) =>
            handleCreateCollection(newCollection)
          }
        />
      </Modal>

      <Toast successMessage={successMessage} errorMessage={errorMessage} />
    </div>
  );
};

export default YourCollections;
