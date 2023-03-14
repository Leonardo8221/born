import { FC } from 'react';
import clsx from 'clsx';
import {
  ProductCard,
  ProductCardProps,
} from '@/components/molecules/Cards/Product';
import { GridType } from '@/components/molecules/IconButtonGroup';
import ListTable from '@/components/organisms/Tables/Product/ListTable';
import { ProductGraphqlDto } from '@/generated/types';
import productPlaceholderImage from '@/assets/images/product-image.png';
import { Icon } from '@/components/molecules/Icon';

interface ProductListProps {
  products: ProductCardProps[];
  gridType?: GridType;
  selectable: boolean;
  selectedProducts: Array<number | string>;
  onSelect: (value: number) => void;
}

const ProductList: FC<ProductListProps> = ({
  products,
  gridType = 'grid',
  selectable,
  selectedProducts,
  onSelect,
}) => {
  if (!products?.length) {
    return (
      <div className="mt-20 text-center">
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
        <ListTable products={products} />
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
          key={item?.id}
          size={gridType === 'smallGrid' ? 'sm' : 'lg'}
          isSelectable={selectable}
          isSelected={!!selectedProducts?.includes(item.id)}
          onSelect={() => onSelect(item.id)}
          imageUrl={productPlaceholderImage}
          {...item}
        />
      ))}
    </div>
  );
};

export default ProductList;
