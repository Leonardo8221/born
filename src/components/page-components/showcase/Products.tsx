import { useState } from 'react';
import { useRouter } from 'next/router';
import ProductList from '@/components/page-components/common/ProductList';
import Filters from '@/components/page-components/common/Filters';
import { GridType } from '@/components/molecules/IconButtonGroup';
import { useQuery } from '@apollo/client';
import { PRODUCTS_QUERY } from '@/queries/products';
import Loading from '../Loading';
import ErrorMessage from '../Error/ErrorMessage';
import { Icon } from '@/components/molecules/Icon';

const Products = () => {
  const [gridType, setGrid] = useState<GridType>('grid');
  const [isSelectable, setIsSelectable] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<
    Array<string | number>
  >([]);

  const router = useRouter();
  const id = router?.query?.id || '';
  const organizationId: number = +id;

  const { data, error, loading, refetch } = useQuery(PRODUCTS_QUERY, {
    variables: { organizationId },
  });

  const filterTags = [
    {
      label: 'collections',
      size: 'default',
      type: 'default',
    },
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
  ];

  const handleSelectedProducts = (id: string | number) => {
    if (selectedProducts.includes(id)) {
      const newProducts = [...selectedProducts];
      setSelectedProducts(newProducts.filter((item) => item !== id));
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  if (error) {
    return <ErrorMessage errorMessage={error?.message} refetch={refetch} />;
  }

  if (loading) {
    return <Loading message="Loading products" />;
  }

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
          products={data?.productsBySearchAndOrganizationId?.content}
          selectable={isSelectable}
          selectedProducts={selectedProducts}
          onSelect={handleSelectedProducts}
        />
      </div>
    </div>
  );
};

export default Products;
