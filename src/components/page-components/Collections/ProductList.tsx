import { FC } from "react";
import clsx from "clsx";
import { ProductCard, ProductCardProps } from "@/components/molecules/Cards/Product";
import { GridType } from "@/components/molecules/IconButtonGroup";
import ListTable from "@/components/organisms/Tables/Product/ListTable";

interface ProductListProps {
  products: ProductCardProps[];
  gridType?: GridType;
  selectable: boolean;
}

const ProductList: FC<ProductListProps> = ({ products, gridType = 'grid', selectable }) => {

  if(gridType === 'list') {
    return (
      <div className="mt-8">
        <ListTable products={products} />
      </div>
    )
  }

  return (
    <div className={clsx('grid mt-8 gap-4', gridType === 'smallGrid' ? 'grid-cols-6' : 'grid-cols-3')}>
      {
        products?.map((item: ProductCardProps, index) => (
          <ProductCard
            key={index}
            size={gridType === 'smallGrid' ? 'sm' : 'lg'}
            isSelectable={selectable}
            {...item}
          />
        ))
      }
    </div>
  )
}

export default ProductList;
