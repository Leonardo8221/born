import { useState } from 'react';
import { useRouter } from 'next/router';
import { OrderResourceApi } from 'client/command';
import ProductList from '@/components/page-components/common/ProductList';
import Filters from '@/components/page-components/common/Filters';
import { GridType } from '@/components/molecules/IconButtonGroup';
import { useQuery } from '@apollo/client';
import { PRODUCTS_QUERY } from '@/queries/products';
import { apiConfig } from '@/utils/apiConfig';
import useDebounce from '@/utils/debounce';
import ErrorMessage from '../Error/ErrorMessage';
import Loading from '../Loading';
import Toast from '../Toast';

const Products = () => {
  const [gridType, setGrid] = useState<GridType>('grid');
  const [isSelectable, setIsSelectable] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<
    Array<string | number>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedValue = useDebounce(searchKeyword, 600);

  const router = useRouter();
  const id = router?.query?.id || '';
  const organizationId: number = +id;

  const { data, error, loading, refetch } = useQuery(PRODUCTS_QUERY, {
    variables: { organizationId, search: debouncedValue },
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

  const handleAddProdutsToDraftOrder = async () => {
    setIsLoading(true);
    try {
      const config: any = await apiConfig();
      const api = new OrderResourceApi(config);
      await api.apiOrderCreateNewDraftOrderPost(organizationId, {
        name: '',
        note: '',
        purchase_order: '',
        retailer: '',
        season: '',
        buyer_name: '',
        email_address: '',
        billing_address: '',
        delivery_address: '',
        payment_terms: '',
        discount: 0,
        surcharge: 0,
        pricing_condition: '',
        size: '',
        order_details: [
          ...selectedProducts.map((item) => ({
            product_id: Number(item),
            note: '',
            quantity: 0,
          })),
        ],
      });
      setIsLoading(false);
      setSuccessMessage(
        `Added ${selectedProducts.length} products to draft order sucessfully!!`
      );
      setSelectedProducts([]);
      setIsSelectable(false);
      refetch();
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(
        error?.message || 'Something went wrong, please try again!'
      );
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      console.error(error);
    }
  };

  const actions = [
    {
      name: 'Add to draft order',
      action: () => handleAddProdutsToDraftOrder(),
      disabled: isLoading || selectedProducts.length === 0,
    },
    {
      name: 'Add to collection',
      action: () => 'Added to collection!',
      disabled: isLoading || selectedProducts.length === 0,
    },
    {
      name: 'Delete',
      action: () => 'Deleted!',
      disabled: isLoading || selectedProducts.length === 0,
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

  return (
    <div>
      <div className="max-w-[1120px] mx-auto">
        <Filters
          onGridChange={setGrid}
          gridType={gridType}
          onSelect={() => setIsSelectable(!isSelectable)}
          searchKeyword={searchKeyword}
          onSearch={setSearchKeyword}
          isSelectable={isSelectable}
          filterTags={filterTags}
          actions={actions}
          selectedItems={selectedProducts}
        />
        {loading ? (
          <div className="mt-6">
            <Loading message="Loading products" />
          </div>
        ) : (
          <ProductList
            gridType={gridType}
            products={data?.productsBySearchAndOrganizationId?.content}
            selectable={isSelectable}
            selectedProducts={selectedProducts}
            onSelect={handleSelectedProducts}
          />
        )}
      </div>

      <Toast successMessage={successMessage} errorMessage={errorMessage} />
    </div>
  );
};

export default Products;
