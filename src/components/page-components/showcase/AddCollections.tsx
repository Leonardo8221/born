import { FC } from 'react';
import clsx from 'clsx';
import { CollectionGraphqlDto } from '@/generated/types';
import PlusIcon from '@/assets/svgs/plus.svg';
import ImageText from '@/components/molecules/ImageText';
import ProductImage from '@/assets/images/product-image.png';
import { fonts } from '@/config/fonts';

interface AddCollectionsProps {
  collections: CollectionGraphqlDto[];
  onAddCollection?: (e: any) => void;
}

const AddCollections: FC<AddCollectionsProps> = ({
  collections,
  onAddCollection = () => {},
}) => {
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

      {collections.map((collection, index) => (
        <ImageText
          key={index}
          title={collection?.name || ''}
          imgSrc={collection?.banner_guid || ProductImage}
          altText={`${collection.name} logo`}
          variant="product"
        />
      ))}
    </div>
  );
};

export default AddCollections;
