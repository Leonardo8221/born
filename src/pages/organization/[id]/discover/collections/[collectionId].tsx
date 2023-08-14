import { GridType } from '@/components/molecules/IconButtonGroup';
import CollectionsContainer from '@/components/page-components/Collections/CollectionsContainer';
import CollectionSectionsContainer from '@/components/page-components/Collections/CollectionSectionsContainer';
import ProductDetailsPage from '@/components/page-components/products/ProductDetails';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CollectionPage = () => {
  const router = useRouter();
  const [isCollectionSection, setIsCollectionSection] = useState(true);
  const [gridType, setGrid] = useState<GridType>('grid');
  const [productId, setProductId] = useState<null | number>(null);

  useEffect(() => {
    const product_id: any = router?.query?.product_id || null;
    setProductId(product_id);
  }, [router])

  const renderProductDetails = productId && (
    <ProductDetailsPage />
  )

  if (isCollectionSection && gridType !== 'list') {
    return (
      <>
        <CollectionSectionsContainer
          isCollectionSection={isCollectionSection}
          setIsCollectionSection={setIsCollectionSection}
          gridType={gridType}
          setGrid={setGrid}
        />
        {renderProductDetails}
      </>
    );
  }

  return (
    <>
      <CollectionsContainer
        isCollectionSection={isCollectionSection}
        setIsCollectionSection={setIsCollectionSection}
        gridType={gridType}
        setGrid={setGrid}
      />
      {renderProductDetails}
    </>
  );
};

export default CollectionPage;
