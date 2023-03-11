import { FC } from "react";
import clsx from "clsx";
import {
  ProductCard,
  ProductCardProps,
} from "@/components/molecules/Cards/Product";
import { GridType } from "@/components/molecules/IconButtonGroup";
import ListTable from "@/components/organisms/Tables/Product/ListTable";
import { ProductGraphqlDto } from "@/generated/types";
import productPlaceholderImage from '@/assets/images/product-placeholder.webp';

interface ProductListProps {
  products: ProductCardProps[];
  gridType?: GridType;
  selectable: boolean;
  selectedProducts: Array<number | string>;
  onSelect: (value: string | number) => void;
}

const ProductList: FC<ProductListProps> = ({
  products,
  gridType = "grid",
  selectable,
  selectedProducts,
  onSelect,
}) => {
  if (gridType === "list") {
    return (
      <div className="mb-8 mt-8">
        <ListTable products={products} />
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "grid mb-8 mt-8 gap-4",
        gridType === "smallGrid" ? "grid-cols-6" : "grid-cols-3"
      )}
    >
      {products?.map((item: ProductGraphqlDto, index: number) => (
        <ProductCard
          key={index}
          size={gridType === "smallGrid" ? "sm" : "lg"}
          isSelectable={selectable}
          isSelected={!!selectedProducts?.includes(index)}
          onSelect={() => onSelect(index)}
          imageUrl={productPlaceholderImage}
          {...item}
        />
      ))}
    </div>
  );
};

export default ProductList;
