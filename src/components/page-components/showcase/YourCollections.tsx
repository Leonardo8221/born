import { FC } from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { CollectionCard } from '@/components/molecules/CollectionCard';
import { Heading } from '@/components/molecules/Heading';
import { Button } from '@/components/molecules/Button';
import { Icon } from '@/components/molecules/Icon';
import { COLLECTIONS_QUERY } from '@/queries/collecitons';
import { CollectionGraphqlDto } from '@/generated/types';
import bgImage1 from '@/assets/images/collection-card/collection-card-background-image.png';
import InnerCardImage from '@/assets/images/collection-card/inner-collection-card-image.png';
import { useRouter } from 'next/router';
import ErrorMessage from '../Error/ErrorMessage';

interface YourCollectionProps {
  onViewCollections: (e: any) => void;
}

const YourCollections: FC<YourCollectionProps> = ({ onViewCollections }) => {
  const router = useRouter();
  const id = router?.query?.id || '';
  const organizationId: number = +id;

  const { data, loading, error, refetch } = useQuery(COLLECTIONS_QUERY, {
    variables: { organizationId },
  });

  const renderCollections = () => {
    if (loading) {
      <div className="w-full text-center text-shades-black">
        Loading collections...
      </div>;
    }

    if (error) {
      return <ErrorMessage errorMessage={error?.message} refetch={refetch} />;
    }

    return data?.collectionsByOrganizationId?.map(
      (item: CollectionGraphqlDto, index: number) =>
        item.id && (
          <Link
            key={item.id}
            href={`/organization/1/discover/collections/${item.id}`}
          >
            <CollectionCard
              backgroundImageSrc={bgImage1}
              imageSrc={InnerCardImage}
              label="SS23"
              hasOverlay={index === 1}
              cardClasses="!h-[272px] !max-w-auto min-w-[736px]"
            />
          </Link>
        )
    );
  };

  return (
    <div className="max-w-[1120px] mx-auto">
      <Heading
        as="h3"
        size="sm"
        className="mt-[64px] !font-light text-shades-black text-center"
      >
        Your Collections
      </Heading>
      <div className="flex mt-10">{renderCollections()}</div>
      {!loading && !error && (
        <div className="mt-48px">
          <Button
            onClick={onViewCollections}
            variant="link"
            className="!bg-shades-white !text-shades-black"
          >
            View all collections <Icon name="icon-arrow-right" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default YourCollections;
