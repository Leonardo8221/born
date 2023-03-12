import { useState } from 'react';
import { CollectionCard } from '@/components/molecules/CollectionCard';
import { products } from '@/components/organisms/Tables/Product/ListTable/data';
import Header from '@/components/page-components/Collections/Header';
import ProductList from '@/components/page-components/common/ProductList';
import backgroundImageSrc from '@/assets/images/collection-card/collection-card-background-image.png';
import Description from '@/components/page-components/Collections/Description';
import Filters from '@/components/page-components/common/Filters';
import { GridType } from '@/components/molecules/IconButtonGroup';
import Footer from '@/components/layouts/Footer';

const CollectionPage = () => {
  const [gridType, setGrid] = useState<GridType>('grid');
  const [isSelectable, setIsSelectable] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<
    Array<string | number>
  >([]);

  const filterTags = [
    {
      label: 'Colours',
      size: 'default',
      type: 'default',
    },
    {
      label: 'Season',
      size: 'default',
      type: 'default',
    },
  ];

  const actions = [
    {
      name: 'Delete',
      action: () => 'Deleted!',
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
      <Header />
      <div className="max-w-[1120px] mt-6 mx-auto">
        <div className="mb-[64px]">
          <CollectionCard
            backgroundImageSrc={backgroundImageSrc}
            label="SS23"
            editBanner
            onEdit={(e) => e.preventDefault()}
          />
          <Description />
        </div>
        <Filters
          onGridChange={setGrid}
          gridType={gridType}
          onSelect={() => setIsSelectable(!isSelectable)}
          filterTags={filterTags}
          actions={actions}
          isSelectable={isSelectable}
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
      <Footer />
    </div>
  );
};

export default CollectionPage;
