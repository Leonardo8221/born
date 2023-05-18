import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import {
  ProductCard,
  ProductCardProps,
} from '@/components/molecules/Cards/Product';
import { GridType } from '@/components/molecules/IconButtonGroup';
import ListTable from '@/components/organisms/Tables/Product/ListTable';
import { ProductWithCollectionsGraphqlDto } from '@/generated/types';
import { Icon } from '@/components/molecules/Icon';

interface ProductListProps {
  products: ProductCardProps[];
  gridType?: GridType;
  selectable: boolean;
  selectedProducts: Array<number | string>;
  selectedVariants?: number[];
  onSelect: ({
    id,
    selectedVariant,
  }: {
    id: number;
    selectedVariant: number;
  }) => void;
  hanldeAddToDraftOrder?: (id: number) => void;
  handleAddToCollection?: (id: number) => void;
  handleDeleteProduct?: (id: number) => void;
  type?: 'products' | 'collection';
}

const ProductList: FC<ProductListProps> = ({
  products,
  gridType = 'grid',
  selectable,
  selectedProducts,
  onSelect,
  handleAddToCollection,
  handleDeleteProduct,
  hanldeAddToDraftOrder,
  type,
  selectedVariants,
}) => {
  if (!products?.length) {
    return (
      <div className="min-h-[300px] mt-20 mb-8 text-center">
        <Icon
          name="icon-info-circle"
          className="mx-auto text-shades-black"
          height={32}
          width={32}
        />
        <p className="mt-2 mb-8 text-center text-shades-black text-[24px]">
          No products founds!!
        </p>
      </div>
    );
  }

  if (gridType === 'list') {
    return (
      <div className="mb-[100px]">
        <ListTable
          products={products}
          handleAddToCollection={handleAddToCollection}
          hanldeAddToDraftOrder={hanldeAddToDraftOrder}
          handleDeleteProduct={handleDeleteProduct}
          isSelectable={selectable}
          selectedProducts={selectedProducts}
          onSelect={onSelect}
          type={type}
          selectedVariants={selectedVariants}
        />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'grid mb-8 gap-8 pint:mb-4 print:gap-2 print:place-items-center print:!grid-cols-3 print:sm:!grid-cols-4',
        gridType === 'smallGrid' ? 'grid-cols-6' : 'grid-cols-3'
      )}
    >
      {products?.map((item: ProductWithCollectionsGraphqlDto) => (
        <ProductCard
          key={`${item?.id}`}
          size={gridType === 'smallGrid' ? 'sm' : 'lg'}
          isSelectable={selectable}
          isSelected={!!selectedProducts?.includes(item.id)}
          selectedVariants={selectedVariants}
          onSelect={onSelect}
          imageUrl={
            (gridType === 'grid'
              ? item?.attachments?.[0]?.large_image_url
              : item?.attachments?.[0]?.medium_image_url) || ''
          }
          {...item}
        />
      ))}
    </div>
  );
};

export default ProductList;
