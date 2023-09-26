import { FC, useEffect, useState } from 'react';
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
import { COLLECTION_FILTER_QUERY } from '@/queries/collecitons';
import { Item } from '@/components/molecules/DropdownFilter';
import { COLOUR_FAMILIES_QUERY } from '@/queries/colourFamiles';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SEASONS_BY_ORGANIZATION_ID } from '@/queries/filters';
import useVariantSelect from '../common/useVariantSelect';
import ProductDetailsPage from '../products/ProductDetails';

const Products: FC = () => {
  const [gridType, setGrid] = useState<GridType>('grid');
  const [isSelectable, setIsSelectable] = useState(false);
  const { selectedRows, selectedVariants, setSelectedRows, resetSelectedRows } =
    useVariantSelect();
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
  const [selectedCollections, setSelectedCollections] = useState<string[]>([]);
  const [selectedColours, setSelectedColours] = useState<string[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [productId, setProductId] = useState<null | number>(null);

  const router = useRouter();
  const id = router?.query?.id || null;
  const organizationId: number | null = id ? Number(id) : null;

  useEffect(() => {
    const product_id: any = router?.query?.product_id || null;
    setProductId(product_id);
  }, [router]);

  const { data, error, loading, refetch, fetchMore }: any = useQuery(
    PRODUCTS_QUERY,
    {
      variables: {
        organizationId,
        search: debouncedValue.toString().toLowerCase(),
        collectionNames: selectedCollections,
        colourFamilies: selectedColours,
        seasons: selectedSeasons,
        rows: 24,
        start: 0,
      },
      fetchPolicy: 'network-only',
      skip: organizationId === null,
    }
  );
  const products = data?.productsBySearchAndOrganizationId?.content || [];
  const totalItems = data?.productsBySearchAndOrganizationId?.total_elements;

  const { data: collections } = useQuery(COLLECTION_FILTER_QUERY, {
    variables: { organizationId },
    skip: organizationId === null,
    fetchPolicy: 'network-only',
  });

  const { data: colourFamilies } = useQuery(COLOUR_FAMILIES_QUERY, {
    variables: { organizationId },
    skip: organizationId === null,
    notifyOnNetworkStatusChange: true,
  });

  const { data: seasons } = useQuery(SEASONS_BY_ORGANIZATION_ID, {
    variables: { organizationId },
    skip: organizationId === null,
    notifyOnNetworkStatusChange: true,
  });

  const handleFilterCollections = (e: Item) => {
    if (selectedCollections.includes(e.label)) {
      setSelectedCollections(selectedCollections?.filter((c) => c !== e.label));
    } else {
      setSelectedCollections([...selectedCollections, e.label]);
    }
  };

  const handleFilterColours = (e: Item) => {
    if (selectedColours.includes(e.label)) {
      setSelectedColours(selectedColours?.filter((c) => c !== e.label));
    } else {
      setSelectedColours([...selectedColours, e.label]);
    }
  };

  const handleFilterSeasons = (e: Item) => {
    if (selectedSeasons.includes(e.label)) {
      setSelectedSeasons(selectedSeasons?.filter((c) => c !== e.label));
    } else {
      setSelectedSeasons([...selectedSeasons, e.label]);
    }
  };

  const filterTags = [
    {
      label: 'Collections',
      options: collections?.collectionsByOrganizationId?.map(
        (item: { id: number; name: string }) => ({
          id: item.id,
          label: item.name,
        })
      ),
      action: handleFilterCollections,
      selectedItems: selectedCollections,
      onReset: () => {
        setSelectedCollections([]);
      },
    },
    {
      label: 'Colours',
      options:
        colourFamilies?.colourFamiliesByOrganizationId?.map((item: string) => ({
          id: item,
          label: item,
        })) || [],
      action: handleFilterColours,
      selectedItems: selectedColours,
      onReset: () => {
        setSelectedColours([]);
      },
    },
    {
      label: 'Season',
      options:
        seasons?.seasonsByOrganizationId?.map((item: string) => ({
          id: item,
          label: item,
        })) || [],
      action: handleFilterSeasons,
      selectedItems: selectedSeasons,
      onReset: () => {
        setSelectedSeasons([]);
        //
      },
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
        selectedVariants
      );
      handleSuccessMesssage(
        selectedVariants.length > 0
          ? `Added ${selectedVariants.length} products to collection sucessfully!!`
          : 'Added product to collection successfully!!'
      );
      setIsAddCollections(false);
      setIsCreateModal(false);
      setIsLoading(false);
      resetSelectedRows();
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
      if(organizationId) {
        const res: any = await api.apiCollectionCreateNewCollectionPost(
          organizationId,
          newCollection
        );
        await handleAddToCollection(res?.data?.id);
        handleSuccessMesssage('New collection added successfully!');
        setIsCreateModal(false);
      }
      setIsLoading(false);
    } catch (error) {
      handleErrorMesssage('Faild to add new collection!');
      console.error(error);
    }
  };

  const handleDeleteProducts = async (id?: number) => {
    setIsLoading(true);
    try {
      const config: any = await apiConfig();
      const api = new ProductResourceApi(config);
      await api.apiProductDeleteProductsDelete(id ? [id] : selectedVariants);
      await refetch();
      setIsLoading(false);
      handleSuccessMesssage(
        selectedVariants.length > 0
          ? `Deleted ${selectedVariants.length} products successfully!`
          : 'Deleted product successfully!'
      );
      resetSelectedRows();
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
      disabled: isLoading || selectedRows.length === 0,
    },
    {
      name: 'Add to collection',
      action: () => setIsAddCollections(true),
      disabled: isLoading || selectedRows.length === 0,
    },
    {
      name: 'Delete',
      action: () => handleDeleteProducts(),
      disabled: isLoading || selectedRows.length === 0,
    },
  ];

  if (error) {
    return <ErrorMessage errorMessage={error?.message} refetch={refetch} />;
  }

  const handleFetchMore = () => {
    fetchMore({
      variables: { start: products.length },
      updateQuery: (prev: any, { fetchMoreResult }: any) => {
        const prevItems =
          prev?.productsBySearchAndOrganizationId?.content || [];
        const nextItems =
          fetchMoreResult?.productsBySearchAndOrganizationId?.content || [];
        if (!fetchMoreResult) return prev;
        return {
          productsBySearchAndOrganizationId: {
            ...fetchMoreResult?.productsBySearchAndOrganizationId,
            content: [...prevItems, ...nextItems],
          },
        };
      },
    });
  };

  const handleDragItems = async(items: { [key: string]: number }) => {
    try {
      const config: any = await apiConfig();
      const api = new ProductResourceApi(config);
      await api.apiProductUpdateProductPositionsPut(items);
      handleSuccessMesssage('Successfully updated product position!');
    } catch (error: any) {
      handleErrorMesssage(
        error?.message || 'Failed to change product position!'
      );
    }
  }

  return (
    <div>
      <div className="relative max-w-[1120px] mx-auto">
        <div>
          <Filters
            onGridChange={setGrid}
            gridType={gridType}
            onSelect={() => setIsSelectable(!isSelectable)}
            searchKeyword={searchKeyword}
            onSearch={(keyword: string) => {
              setSearchKeyword(keyword);
            }}
            isSelectable={isSelectable}
            filterTags={filterTags}
            actions={actions}
            selectedItems={selectedRows}
            onDeselect={resetSelectedRows}
          />
          {!products.length && loading ? (
            <div className="mt-6 min-h-[400px]">
              <Loading message="Loading products" />
            </div>
          ) : (
            <InfiniteScroll
              dataLength={products.length}
              next={async () => {
                totalItems > products.length && handleFetchMore();
              }}
              hasMore={totalItems > products.length}
              loader={
                totalItems > products.length && (
                  <Loading message="Loading more products..." />
                )
              }
            >
              <ProductList
                gridType={gridType}
                products={products}
                selectable={isSelectable}
                selectedProducts={selectedRows}
                selectedVariants={selectedVariants}
                handleDragItems={handleDragItems}
                hanldeAddToDraftOrder={(id) => {
                  setSelectedRows({
                    id,
                    selectedVariant: id,
                    isVariant: selectedRows.includes(id) ? true : false,
                    isNew: true,
                  });
                  setIsModalVisible(true);
                }}
                handleAddToCollection={(id) => {
                  setSelectedRows({
                    id,
                    selectedVariant: id,
                    isNew: true,
                  });
                  setIsAddCollections(true);
                }}
                handleDeleteProduct={(id) => {
                  handleDeleteProducts(id);
                }}
                onSelect={setSelectedRows}
              />
            </InfiniteScroll>
          )}
        </div>
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
        productIds={selectedVariants}
        resetProductIds={resetSelectedRows}
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
      {productId && <ProductDetailsPage />}
    </div>
  );
};

export default Products;
