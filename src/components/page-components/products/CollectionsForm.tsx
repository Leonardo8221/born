import { FC, useEffect, useState } from 'react';
import { ProductWithCollectionsGraphqlDto } from '@/generated/types';
import { Button } from '@/components/molecules/Button';
import { apiConfig } from '@/utils/apiConfig';
import Toast from '../Toast';
import { Badge } from '@/components/molecules/Badge';
import { Paragraph } from '@/components/molecules/Paragraph';
import { useQuery } from '@apollo/client';
import { COLLECTION_FILTER_QUERY } from '@/queries/collecitons';
import { useRouter } from 'next/router';
import CheckIcon from '@/assets/svgs/check.svg';
import clsx from 'clsx';
import { CollectionResourceApi } from 'client/command';
import Loading from '../Loading';

interface CollectionsFormProps {
  product: ProductWithCollectionsGraphqlDto;
}

const CollectionsForm: FC<CollectionsFormProps> = ({ product }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMesage] = useState('');
  const [selectedCollections, setSelectedCollections] = useState([]);

  const router = useRouter();
  const organizationId = router?.query?.id ? Number(router?.query?.id) : router?.query?.id;
  const { data, loading } = useQuery(COLLECTION_FILTER_QUERY, {
    variables: { organizationId },
    skip: organizationId === null,
  });

  useEffect(() => {
    setSelectedCollections((product?.collections as any) || []);
  }, [product]);

  const handleSave = async () => {
    setIsSubmitted(true);
    try {
      const config = await apiConfig();
      const api = new CollectionResourceApi(config);
      const promises = selectedCollections.map((item: any) =>
        api.apiCollectionAssociateProductsPut(item.id, [product.id])
      );
      await Promise.all(promises);
      setIsSubmitted(false);
      setSuccessMessage('Product updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setIsSubmitted(false);
      setErrorMesage('Failed to update product!');
      console.error(error);
    }
  };

  const handleCollections = (collection: string) => {
    setSelectedCollections(
      // @ts-ignore
      selectedCollections.map((item) => item.name).includes(collection.name)
        ? // @ts-ignore
          selectedCollections.filter((item) => item.name !== collection.name)
        : [...selectedCollections, collection]
    );
  };

  return (
    <div className="max-w-[736px]">
      <Paragraph size="xl" className="!text-shades-black !font-light !mb-4">
        Indicate the collections this product is included in
      </Paragraph>
      <div className="flex flex-wrap items-center gap-4">
        {loading ? (
          <Loading message="Loading collections..." />
        ) : (
          data?.collectionsByOrganizationId?.map((item: any) => (
            <Badge
              key={item.id}
              className={clsx(
                'cursor-pointer',
                // @ts-ignore
                selectedCollections
                  // @ts-ignore
                  .map((collection) => collection.name)
                  .includes(item?.name) && '!bg-shades-black !text-shades-white'
              )}
              onClick={() => handleCollections(item)}
            >
              {item.name}{' '}
              {
                // @ts-ignore
                selectedCollections
                  // @ts-ignore
                  .map((collection) => collection.name)
                  .includes(item?.name) && (
                  <CheckIcon
                    className="text-shades-white"
                    height={24}
                    width={24}
                  />
                )
              }
            </Badge>
          ))
        )}
      </div>
      <div className="mt-5 inline-flex">
        <Button onClick={handleSave} disabled={isSubmitted || loading}>
          Save
        </Button>
      </div>
      <Toast successMessage={successMessage} errorMessage={errorMessage} />
    </div>
  );
};

export default CollectionsForm;
