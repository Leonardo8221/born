import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { CollectionCard } from '@/components/molecules/CollectionCard';
import placeholderImage from '@/assets/images/placeholders/collection-preview.png';
import { COLLECTIONS_QUERY } from '@/queries/collecitons';
import { CollectionGraphqlDto } from '@/generated/types';
import Loading from '../Loading';
import ErrorMessage from '../Error/ErrorMessage';
import { FC, useState } from 'react';
import Modal from '@/components/molecules/Modal';
import AddCollections from './AddCollections';
import CreateCollection from './CreateCollection';
import { apiConfig } from '@/utils/apiConfig';
import { CollectionResourceApi } from 'client/command';
import Toast from '../Toast';

interface CollectionsProps {
  addCollectionsModal?: boolean;
  toggleCollectionsModal?: (value: boolean) => void;
}

const Collections: FC<CollectionsProps> = ({
  addCollectionsModal,
  toggleCollectionsModal,
}) => {
  const router = useRouter();
  const id = router?.query?.id || '';
  const organizationId: number | null = id ? Number(id) : null;
  const [isCreateModal, setIsCreateModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { data, loading, error, refetch } = useQuery(COLLECTIONS_QUERY, {
    variables: { organizationId, rows: 50 },
    skip: organizationId === null,
    fetchPolicy: 'network-only',
  });

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
      setIsCreateModal(false);
    }, 3000);
  };

  const handleCreateCollection = async (newCollection: any) => {
    try {
      const config: any = await apiConfig();
      const api = new CollectionResourceApi(config);
      if(organizationId) {
        await api.apiCollectionCreateNewCollectionPost(
          organizationId,
          newCollection
        );
        await refetch();
        toggleCollectionsModal?.(false);
        handleSuccessMesssage('New collection added successfully!');
      }
    } catch (error) {
      handleErrorMesssage('Faild to add new collection!');
      console.error(error);
    }
  };

  const handleDeleteCollection = async (id: number, e: any) => {
    e?.preventDefault();
    try {
      const config: any = await apiConfig();
      const api = new CollectionResourceApi(config);
      await api.apiCollectionDeleteCollectionDelete(id);
      refetch();
      handleSuccessMesssage('Collection Deleted successfully!');
    } catch (error) {
      handleErrorMesssage('Faild to delete collection!');
      console.error(error);
    }
  }

  if (error) {
    return <ErrorMessage errorMessage={error?.message} />;
  }

  if (!data?.collectionsByOrganizationId && loading) {
    return <Loading message="Loading collecitons" />;
  }

  return (
    <div>
      <div>
        {data?.collectionsByOrganizationId?.map(
          (item: CollectionGraphqlDto) => (
            <div key={item.id} className="mb-[96px]">
              <Link
                href={`/organization/${organizationId}/discover/collections/${item.id}`}
              >
                <CollectionCard
                  backgroundImageSrc={item?.banner_url || placeholderImage}
                  label={item.name || ''}
                  images={item?.products?.map(
                    (product: any) => product?.attachments?.[0]?.small_image_url
                  )}
                  author={''}
                  editBanner
                  editButtonText="Delete"
                  onEdit={(e) => handleDeleteCollection(item.id, e)}
                />
              </Link>
              <div className="mt-8">
                <p className="max-w-[544px] mx-auto text-shades-black text-center text-[18px] tracking-[0.06em] leading-[32px]">
                  {item.description || ''}
                </p>
              </div>
            </div>
          )
        )}
      </div>
      <Modal
        isOpen={!!addCollectionsModal}
        onClose={() => toggleCollectionsModal?.(false)}
        title={isCreateModal ? 'Name this collection' : 'Choose collections'}
        className="!max-h-[417px] !max-w-[736px] overflow-x-hidden overflow-y-auto"
      >
        {isCreateModal ? (
          <CreateCollection
            handleSubmit={(newCollection) =>
              handleCreateCollection(newCollection)
            }
          />
        ) : (
          <AddCollections
            onSelect={() => {}}
            onAddCollection={() => setIsCreateModal(true)}
          />
        )}
      </Modal>
      <Toast successMessage={successMessage} errorMessage={errorMessage} />
    </div>
  );
};

export default Collections;
