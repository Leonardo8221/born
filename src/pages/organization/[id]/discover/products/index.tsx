import { useState } from "react";
import { products } from "@/components/organisms/Tables/Product/ListTable/data";
import ProductList from "@/components/page-components/common/ProductList";
import Filters from "@/components/page-components/common/Filters";
import ShowcaseLayout from "@/components/layouts/ShowcaseLayout";
import { GridType } from "@/components/molecules/IconButtonGroup";
import { PRODUCTS_QUERY } from "@/queries/products";
import { useQuery } from "@apollo/client";

const ProductsPage = () => {
  const [gridType, setGrid] = useState<GridType>("grid");
  const [isSelectable, setIsSelectable] = useState(false);

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

  const { data, error, loading } = useQuery(PRODUCTS_QUERY);
  console.log(data, error, loading);

  return (
    <ShowcaseLayout>
      <div className="max-w-[1120px] mt-6 mx-auto">
        <Filters
          onGridChange={setGrid}
          gridType={gridType}
          onSelect={() => setIsSelectable(!isSelectable)}
          filterTags={filterTags}
          actions={actions}
        />
        <ProductList
          gridType={gridType}
          products={products}
          selectable={isSelectable}
        />
      </div>
    </ShowcaseLayout>
  );
};

export default ProductsPage;
