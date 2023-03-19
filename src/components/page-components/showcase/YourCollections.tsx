import { FC } from 'react';
import Link from 'next/link';
import { CollectionCard } from '@/components/molecules/CollectionCard';
import { Heading } from '@/components/molecules/Heading';
import { Button } from '@/components/molecules/Button';
import { Icon } from '@/components/molecules/Icon';
import bgImage1 from '@/assets/images/placeholders/collection-preview.png';
import InnerCardImage from '@/assets/images/collection-card/inner-collection-card-image.png';

interface YourCollectionProps {
  collections?: any;
  onViewCollections: (e: any) => void;
}

const YourCollections: FC<YourCollectionProps> = ({
  onViewCollections,
  collections,
}) => {
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
  );
};

export default YourCollections;
