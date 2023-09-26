import { FC, useEffect } from 'react';
import clsx from 'clsx';
import { CollectionGraphqlDto } from '@/generated/types';
import PlusIcon from '@/assets/svgs/plus.svg';
import ImageText from '@/components/molecules/ImageText';
import { fonts } from '@/config/fonts';
import { COLLECTIONS_QUERY } from '@/queries/collecitons';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Loading from '../Loading';

interface AddCollectionsProps {
  onAddCollection?: (e: any) => void;
  onSelect: (collectionId: any) => void;
  isSelect?: boolean;
}

const AddCollections: FC<AddCollectionsProps> = ({
  onAddCollection = () => {},
  onSelect,
  isSelect,
}) => {
  const router = useRouter();
  const id = router?.query?.id || '';
  const organizationId: number | null = id ? Number(id) : null;

  const { data, loading, refetch } = useQuery(COLLECTIONS_QUERY, {
    variables: { organizationId },
    skip: organizationId === null,
  });

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center gap-x-4">
        <div className="flex h-[80px] w-[80px] cursor-pointer items-center justify-center bg-neutral-100 border border-neutral-400 rounded">
          <div className="inline-flex" onClick={onAddCollection}>
            <PlusIcon height={43} width={43} className="text-shades-black" />
          </div>
        </div>
        <h3
          className={clsx(fonts.text.xl, 'text-shades-black tracking-[0.06em]')}
        >
          New collection
        </h3>
      </div>
      {loading ? (
        <Loading message="Loading collections" />
      ) : (
        data?.collectionsByOrganizationId?.map(
          (collection: CollectionGraphqlDto) => (
            <div
              key={collection?.id}
              className={isSelect ? 'cursor-pointer' : ''}
              onClick={() => onSelect(collection?.id)}
            >
              <ImageText
                key={collection?.id}
                title={collection?.name || ''}
                imgSrc={collection?.banner_url || ''}
                altText={`${collection.name} logo`}
                variant="product"
              />
            </div>
          )
        )
      )}
    </div>
  );
};

export default AddCollections;
