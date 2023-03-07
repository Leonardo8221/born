import { useState } from "react";
import { products } from "@/components/organisms/Tables/Product/ListTable/data";
import ProductList from "@/components/page-components/common/ProductList";
import Filters from "@/components/page-components/common/Filters";
import { GridType } from "@/components/molecules/IconButtonGroup";
import Footer from "@/components/layouts/Footer";
import { useQuery } from "@apollo/client";
import { PRODUCTS_BY_SEARCH_AND_ORGANIZATION_QUERY } from "@/queries/Products";

const ProductsPage = () => {
  const [gridType, setGrid] = useState<GridType>('grid');
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
  ]

  const actions = [
    {
      name: 'Add to draft order',
      action: () => 'Draft order added!',
    },
    {
      name: 'Add to collection',
      action: () => 'Added to collection!',
    },
    {
      name: 'Delete',
      action: () => 'Deleted!',
    },
  ]

  const { data, error, loading } = useQuery(PRODUCTS_BY_SEARCH_AND_ORGANIZATION_QUERY);
  console.log(data, error, loading);

  return (
    <div>
      <div className="max-w-[1120px] mt-6 mx-auto">
        <Filters
          onGridChange={setGrid}
          gridType={gridType}
          onSelect={() => setIsSelectable(!isSelectable)}
          filterTags={filterTags}
          actions={actions}
        />
        <ProductList gridType={gridType} products={products} selectable={isSelectable} />
      </div>
      <Footer />
    </div>
  )
}

export default ProductsPage;
