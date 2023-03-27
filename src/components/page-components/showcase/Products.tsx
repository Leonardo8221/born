import { FC, useState } from 'react';
import { useRouter } from 'next/router';
import { CollectionResourceApi, ProductResourceApi } from 'client/command';
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
import { OrderList } from '@/components/page-components/order/OrdersList';
import { OrderGraphqlDto } from '@/generated/types';
import Notification from '../order/Notification';

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderGraphqlDto | null>(
    null
  );

  const router = useRouter();
  const id = router?.query?.id || '';
  const organizationId: number = +id;
  const { data, error, loading, refetch } = useQuery(PRODUCTS_QUERY, {
    variables: { organizationId, search: debouncedValue, rows: 50 },
    notifyOnNetworkStatusChange: true,
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
      await api.apiCollectionCreateNewCollectionPost(
        organizationId,
        newCollection
      );
      setIsLoading(false);
      setIsCreateModal(false);
      handleSuccessMesssage('New collection added successfully!');
    } catch (error) {
      handleErrorMesssage('Faild to add new collection!');
      console.error(error);
    }
  };

  const handleDeleteProducts = async () => {
    setIsLoading(true);
    try {
      const config: any = await apiConfig();
      const api = new ProductResourceApi(config);
      await api.apiProductDeleteProductsDelete(selectedProducts);
      refetch();
      setIsLoading(false);
      handleSuccessMesssage(
        `Deleted ${selectedProducts.length} products successfully!`
      );
      setSelectedProducts([]);
    } catch (error: any) {
      setIsLoading(false);
      handleErrorMesssage(
        error?.message || 'Failed to delete produts, please try again!'
      );
    }
  };

  const actions = [
    {
      name: 'Add to draft order',
      action: () => setIsModalVisible(true),
      disabled: isLoading || selectedProducts.length === 0,
    },
    {
      name: 'Add to collection',
      action: () => setIsAddCollections(true),
      disabled: isLoading || selectedProducts.length === 0,
    },
    {
      name: 'Delete',
      action: () => handleDeleteProducts(),
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
        {!data?.productsBySearchAndOrganizationId && loading ? (
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
      <OrderList
        setModalIsVisible={() => setIsModalVisible(!isModalVisible)}
        isModalVisible={isModalVisible}
        productIds={selectedProducts}
        resetProductIds={() => setSelectedProducts([])}
        setSelectedOrder={setSelectedOrder}
        selectedOrder={selectedOrder}
      />
      <Toast successMessage={successMessage} errorMessage={errorMessage} />
      {selectedOrder?.id && (
        <Notification
          order={selectedOrder}
          onCancel={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default Products;
