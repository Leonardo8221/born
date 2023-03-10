import { useState } from "react";
import { products } from "@/components/organisms/Tables/Product/ListTable/data";
import ProductList from "@/components/page-components/common/ProductList";
import Filters from "@/components/page-components/common/Filters";
import { GridType } from "@/components/molecules/IconButtonGroup";
import { useQuery } from "@apollo/client";
import { PRODUCTS_QUERY } from "@/queries/products";

const Products = () => {
  const [gridType, setGrid] = useState<GridType>("grid");
  const [isSelectable, setIsSelectable] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<
    Array<string | number>
  >([]);

  const { data, error, loading } = useQuery(PRODUCTS_QUERY);
  console.log(data, error, loading);

  const filterTags = [
    {
      label: "collections",
      size: "default",
      type: "default",
    },
    {
      label: "Colours",
      size: "default",
      type: "default",
    },
    {
      label: "Season",
      size: "default",
      type: "default",
    },
  ];

  const actions = [
    {
      name: "Add to draft order",
      action: () => "Draft order added!",
    },
    {
      name: "Add to collection",
      action: () => "Added to collection!",
    },
    {
      name: "Delete",
      action: () => "Deleted!",
    },
  ];

  const handleSelectedProducts = (id: string | number) => {
    if (selectedProducts.includes(id)) {
      const newProducts = [...selectedProducts];
      setSelectedProducts(newProducts.filter((item) => item !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  return (
    <div>
      <div className="max-w-[1120px] mx-auto">
        <Filters
          onGridChange={setGrid}
          gridType={gridType}
          onSelect={() => setIsSelectable(!isSelectable)}
          isSelectable={isSelectable}
          filterTags={filterTags}
          actions={actions}
          selectedItems={selectedProducts}
        />
        <ProductList
          gridType={gridType}
          products={products}
          selectable={isSelectable}
          selectedProducts={selectedProducts}
          onSelect={handleSelectedProducts}
        />
      </div>
    </div>
  );
};

export default Products;
