import { FC } from 'react';
import clsx from 'clsx';
import {
  ProductCard,
  ProductCardProps,
} from '@/components/molecules/Cards/Product';
import { GridType } from '@/components/molecules/IconButtonGroup';
import ListTable from '@/components/organisms/Tables/Product/ListTable';
import { ProductGraphqlDto } from '@/generated/types';
import { Icon } from '@/components/molecules/Icon';

interface ProductListProps {
  products: ProductCardProps[];
  gridType?: GridType;
  selectable: boolean;
  selectedProducts: Array<number | string>;
  onSelect: (value: number) => void;
  hanldeAddToDraftOrder?: (id: number) => void;
  handleAddToCollection?: (id: number) => void;
  handleDeleteProduct?: (id: number) => void;
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
      <div className="mb-8 mt-8">
        <ListTable
          products={products}
          handleAddToCollection={handleAddToCollection}
          hanldeAddToDraftOrder={hanldeAddToDraftOrder}
          handleDeleteProduct={handleDeleteProduct}
        />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        'grid mb-8 mt-8 gap-4',
        gridType === 'smallGrid' ? 'grid-cols-6' : 'grid-cols-3'
      )}
    >
      {products?.map((item: ProductGraphqlDto) => (
        <ProductCard
          key={`${item?.id}`}
          size={gridType === 'smallGrid' ? 'sm' : 'lg'}
          isSelectable={selectable}
          isSelected={!!selectedProducts?.includes(item.id)}
          onSelect={() => onSelect(item.id)}
          imageUrl={item?.attachments?.[0]?.medium_image_url || ''}
          {...item}
        />
      ))}
    </div>
  );
};

export default ProductList;
