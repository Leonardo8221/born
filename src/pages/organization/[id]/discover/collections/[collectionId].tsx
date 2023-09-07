import { GridType } from '@/components/molecules/IconButtonGroup';
import CollectionsContainer from '@/components/page-components/Collections/CollectionsContainer';
import CollectionSectionsContainer from '@/components/page-components/Collections/CollectionSectionsContainer';
import ProductDetailsPage from '@/components/page-components/products/ProductDetails';
import ShowcaseLogo from '@/components/page-components/showcase/Logo';
import { ORGANIZATION_QUERY } from '@/queries/organizations';
import useDebounce from '@/utils/debounce';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CollectionPage = () => {
  const router = useRouter();
  const [isCollectionSection, setIsCollectionSection] = useState(true);
  const [gridType, setGrid] = useState<GridType>('grid');
  const [productId, setProductId] = useState<null | number>(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedValue = useDebounce(searchKeyword, 600);
  const [selectedColours, setSelectedColours] = useState<string[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);

  const { data } = useQuery(ORGANIZATION_QUERY, {
    variables: { organizationId: Number(router?.query?.id) },
    fetchPolicy: 'cache-and-network',
    skip: !router?.query?.id,
  });
  const organization = data?.organizationByOrganizationId || {};

  useEffect(() => {
    const product_id: any = router?.query?.product_id || null;
    setProductId(product_id);
  }, [router]);

  const renderProductDetails = productId && <ProductDetailsPage />;

  const renderBrandDetails = (
    <div className="hidden print:block mb-10">
      <ShowcaseLogo
        logoUrl={organization?.logo_url}
        name={organization?.name || ''}
        headingSize="sm"
      />
    </div>
  );

  if (isCollectionSection && gridType !== 'list') {
    return (
      <>
        {renderBrandDetails}
        <CollectionSectionsContainer
          isCollectionSection={isCollectionSection}
          setIsCollectionSection={setIsCollectionSection}
          gridType={gridType}
          setGrid={setGrid}
          debouncedValue={debouncedValue}
          selectedColours={selectedColours}
          selectedSeasons={selectedSeasons}
          setSelectedColours={setSelectedColours}
          setSelectedSeasons={setSelectedSeasons}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
        />
        {renderProductDetails}
      </>
    );
  }

  return (
    <>
      {renderBrandDetails}
      <CollectionsContainer
        isCollectionSection={isCollectionSection}
        setIsCollectionSection={setIsCollectionSection}
        gridType={gridType}
        setGrid={setGrid}
        debouncedValue={debouncedValue}
        selectedColours={selectedColours}
        selectedSeasons={selectedSeasons}
        setSelectedColours={setSelectedColours}
        setSelectedSeasons={setSelectedSeasons}
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
      />
      {renderProductDetails}
    </>
  );
};

export default CollectionPage;
