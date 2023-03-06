"use client";
import { useState } from "react";
import { CollectionCard } from "@/components/molecules/CollectionCard";
import { products } from "@/components/organisms/Tables/Product/ListTable/data";
import Header from "@/components/page-components/Collections/Header";
import ProductList from "@/components/page-components/Collections/ProductList";
import backgroundImageSrc from "@/assets/images/collection-card/collection-card-background-image.png";
import Description from "@/components/page-components/Collections/Description";
import Filters from "@/components/page-components/Collections/Filters";
import { GridType } from "@/components/molecules/IconButtonGroup";
import Footer from "@/components/layouts/Footer";

const CollectionsPage = () => {
  const [gridType, setGrid] = useState<GridType>('grid');
  const [isSelectable, setIsSelectable] = useState(false);

  return (
    <div>
      <Header />
      <div className="max-w-[1120px] mt-6 mx-auto">
        <div>
          <CollectionCard backgroundImageSrc={backgroundImageSrc} label="SS23" />
          <Description />
        </div>
        <Filters
          onGridChange={setGrid}
          gridType={gridType}
          onSelect={() => setIsSelectable(!isSelectable)}
        />
        <ProductList gridType={gridType} products={products} selectable={isSelectable} />
      </div>
      <Footer />
    </div>
  )
}

export default CollectionsPage;
