import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { CollectionResourceApi, OrderResourceApi } from 'client/command';
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
import Modal from '@/components/molecules/Modal';
import CreateCollection from './CreateCollection';
import AddCollections from './AddCollections';

const Products: FC = () => {
  const [gridType, setGrid] = useState<GridType>('grid');
  const [isSelectable, setIsSelectable] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedValue = useDebounce(searchKeyword, 600);
  const [isAddCollections, setIsAddCollections] = useState(false);
  const [isCreateModal, setIsCreateModal] = useState(false);

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

  const handleErrorMesssage = (message: string) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const handleSuccessMesssage = (message: string) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

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
        productIds: selectedProducts,
      });
      setIsLoading(false);
      handleSuccessMesssage(
        `Added ${selectedProducts.length} products to draft order sucessfully!!`
      );
      setSelectedProducts([]);
      setIsSelectable(false);
      refetch();
    } catch (error: any) {
      setIsLoading(false);
      handleErrorMesssage(
        error?.message || 'Something went wrong, please try again!'
      );
      console.error(error);
    }
  };

  const handleAddToCollection = async (collectionId: any) => {
    setIsLoading(true);
    try {
      const config: any = await apiConfig();
      const api = new CollectionResourceApi(config);
      await api.apiCollectionAssociateProductsPut(
        collectionId,
        selectedProducts
      );
      handleSuccessMesssage(
        `Added ${selectedProducts.length} products to collections sucessfully!!`
      );
      setIsAddCollections(false);
      setIsCreateModal(false);
      setIsLoading(false);
      setSelectedProducts([]);
    } catch (error: any) {
      setIsLoading(false);
      handleErrorMesssage(
        error?.message || 'Something went wrong, please try again!'
      );
      console.error(error);
    }
  };

  const handleAddCollections = async (newCollection: any) => {
    setIsLoading(true);
    try {
      const config: any = await apiConfig();
      const api = new CollectionResourceApi(config);
      await api.apiCollectionCreateNewCollectionPost(organizationId, newCollection);
      setIsLoading(false);
      setIsCreateModal(false);
      handleSuccessMesssage('New collection added successfully!');
    } catch (error) {
      handleErrorMesssage('Faild to add new collection!');
      console.error(error);
    }
  }

  const actions = [
    {
      name: 'Add to draft order',
      action: () => handleAddProdutsToDraftOrder(),
      disabled: isLoading || selectedProducts.length === 0,
    },
    {
      name: 'Add to collection',
      action: () => setIsAddCollections(true),
      disabled: isLoading || selectedProducts.length === 0,
    },
    {
      name: 'Delete',
      action: () => 'Deleted!',
      disabled: isLoading || selectedProducts.length === 0,
    },
  ];

  const handleSelectedProducts = (id: number) => {
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

      <Modal
        isOpen={isAddCollections}
        onClose={() => {
          setIsAddCollections(false);
          setIsCreateModal(false);
        }}
        title={isCreateModal ? 'Name this collection' : 'Choose collections'}
        className="!max-h-[417px] !max-w-[736px] overflow-x-hidden overflow-y-auto"
      >
        {isCreateModal ? (
          <CreateCollection
            handleSubmit={(newCollection) => {
              handleAddCollections(newCollection);
            }}
          />
        ) : (
          <AddCollections
            isSelect
            onAddCollection={() => {
              setIsCreateModal(true);
            }}
            onSelect={(id) => handleAddToCollection(id)}
          />
        )}
      </Modal>

      <Toast successMessage={successMessage} errorMessage={errorMessage} />
    </div>
  );
};

export default Products;
