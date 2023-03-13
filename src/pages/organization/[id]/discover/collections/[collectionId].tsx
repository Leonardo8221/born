import { useState } from 'react';
import { CollectionCard } from '@/components/molecules/CollectionCard';
import Header from '@/components/page-components/Collections/Header';
import ProductList from '@/components/page-components/common/ProductList';
import backgroundImageSrc from '@/assets/images/collection-card/collection-card-background-image.png';
import Description from '@/components/page-components/Collections/Description';
import Filters from '@/components/page-components/common/Filters';
import { GridType } from '@/components/molecules/IconButtonGroup';
import Footer from '@/components/layouts/Footer';
import { useQuery } from '@apollo/client';
import {
  COLLECTION_QUERY,
  PRODUCTS_BY_COLLECTION_ID_QUERY,
} from '@/queries/collecitons';
import Loading from '@/components/page-components/Loading';
import { useRouter } from 'next/router';

const CollectionPage = () => {
  const router = useRouter();
  const collectionId = Number(router?.query?.collectionId);
  const [gridType, setGrid] = useState<GridType>('grid');
  const [isSelectable, setIsSelectable] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<
    Array<string | number>
  >([]);

  const { data: colleciton, loading } = useQuery(COLLECTION_QUERY, {
    variables: { collectionId },
  });

  const { data: productsCollection, loading: productsCollectionLoading } =
    useQuery(PRODUCTS_BY_COLLECTION_ID_QUERY, { variables: { collectionId } });

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
      <div className="min-h-[calc(100vh-185px)] max-w-[1120px] mt-6 mx-auto">
        <div className="mb-[64px]">
          {loading ? (
            <Loading message="Loading collections" />
          ) : (
            <>
              <CollectionCard
                backgroundImageSrc={backgroundImageSrc}
                label={colleciton?.name}
                editBanner
                onEdit={(e) => e.preventDefault()}
              />
              <Description />
            </>
          )}
        </div>
        {productsCollectionLoading ? (
          <Loading message="Loading collecton products" />
        ) : (
          <>
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
              products={productsCollection?.collectionByCollectionId || []}
              selectable={isSelectable}
              selectedProducts={selectedProducts}
              onSelect={handleSelectedProducts}
            />
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CollectionPage;
