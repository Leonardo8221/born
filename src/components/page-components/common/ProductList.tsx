import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import {
  ProductCard,
  ProductCardProps,
} from '@/components/molecules/Cards/Product';
import { GridType } from '@/components/molecules/IconButtonGroup';
import ListTable from '@/components/organisms/Tables/Product/ListTable';
import { Icon } from '@/components/molecules/Icon';
import DraggableCards from '@/components/organisms/DraggableCards';
import SortableItem from '@/components/organisms/DraggableCards/SortableItem';
import { getGridType } from '@/utils/constants';

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
  handleDragItems?: (items: { [key: string]: number}) => void;
  productId?: null | number;
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
  handleDragItems,
  productId
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
          isSelectable={true}
          selectedProducts={selectedProducts}
          onSelect={onSelect}
          type={type}
          selectedVariants={selectedVariants}
        />
      </div>
    );
  }

  return (
    <DraggableCards
      list={products}
      onDragEnd={(items) => handleDragItems?.(items)}
      renderChilds={(items: any) => (
        <div
          className={clsx(
            'grid mb-8 gap-8 pint:mb-4 print:gap-5 print:justify-center print:!grid-cols-6',
            getGridType(productId, gridType)
          )}
        >
          {items?.map((item: any) => (
            <SortableItem key={item?.id} id={item?.id}>
              <ProductCard
                key={`${item?.id}`}
                size={gridType === 'smallGrid' ? 'sm' : 'lg'}
                isSelectable={selectable}
                isSelected={!!selectedProducts?.includes(item.id)}
                selectedVariants={selectedVariants}
                onSelect={onSelect}
                isCollection={type === 'collection'}
                imageUrl={
                  (gridType === 'grid'
                    ? item?.attachments?.[0]?.large_image_url
                    : item?.attachments?.[0]?.medium_image_url) || ''
                }
                {...item}
              />
            </SortableItem>
          ))}
        </div>
      )}
      activeElement={(item: any) => (
        <ProductCard
          key={`${item?.id}`}
          size={gridType === 'smallGrid' ? 'sm' : 'lg'}
          isSelectable={selectable}
          isSelected={!!selectedProducts?.includes(item.id)}
          selectedVariants={selectedVariants}
          onSelect={onSelect}
          isCollection={type === 'collection'}
          imageUrl={
            (gridType === 'grid'
              ? item?.attachments?.[0]?.large_image_url
              : item?.attachments?.[0]?.medium_image_url) || ''
          }
          {...item}
        />
      )}
    />
  );
};

export default ProductList;
