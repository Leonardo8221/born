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
  const [pageNo, setPageNo] = useState(0);
  const [rows] = useState(24);
  const [products, setProducts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(null);
  const [isProductDelete, setIsProductDelete] = useState(false);
  const [productId, setProductId] = useState<null | number>(null);

  const router = useRouter();
  const id = router?.query?.id || '';
  const organizationId: number = +id;

  useEffect(() => {
    const product_id: any = router?.query?.product_id || null;
    setProductId(product_id);
  }, [router]);

  const { data, error, loading, refetch }: any = useQuery(PRODUCTS_QUERY, {
    variables: {
      organizationId,
      search: debouncedValue.toString().toLowerCase(),
      collectionNames: selectedCollections,
      colourFamilies: selectedColours,
      seasons: selectedSeasons,
      rows: rows,
      start: pageNo * rows,
    },
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    const newProducts: any[] =
      data?.productsBySearchAndOrganizationId?.content || [];
    if (!isProductDelete) {
      if (
        !!searchKeyword ||
        !!selectedCollections.length ||
        !!selectedColours.length
      ) {
        setProducts(
          pageNo !== 0 && pageNo > 0
            ? [...products, ...newProducts]
            : newProducts
        );
      } else if (!!newProducts.length) {
        const newProducts: any[] =
          data?.productsBySearchAndOrganizationId?.content || [];
        setProducts(pageNo !== 0 ? [...products, ...newProducts] : newProducts);
        !totalPages &&
          setTotalPages(data?.productsBySearchAndOrganizationId?.total_pages);
      }
    }
  }, [data]);

  const { data: collections } = useQuery(COLLECTION_FILTER_QUERY, {
    variables: { organizationId },
    fetchPolicy: 'network-only',
  });

  const { data: colourFamilies } = useQuery(COLOUR_FAMILIES_QUERY, {
    variables: { organizationId },
    notifyOnNetworkStatusChange: true,
  });

  const { data: seasons } = useQuery(SEASONS_BY_ORGANIZATION_ID, {
    variables: { organizationId },
    notifyOnNetworkStatusChange: true,
  });

  const handleFilterCollections = (e: Item) => {
    setProducts([]);
    setPageNo(0);
    if (selectedCollections.includes(e.label)) {
      setSelectedCollections(selectedCollections?.filter((c) => c !== e.label));
    } else {
      setSelectedCollections([...selectedCollections, e.label]);
    }
  };

  const handleFilterColours = (e: Item) => {
    setProducts([]);
    setPageNo(0);
    if (selectedColours.includes(e.label)) {
      setSelectedColours(selectedColours?.filter((c) => c !== e.label));
    } else {
      setSelectedColours([...selectedColours, e.label]);
    }
  };

  const handleFilterSeasons = (e: Item) => {
    setProducts([]);
    setPageNo(0);
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
        setProducts([]);
        setPageNo(0);
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
        setProducts([]);
        setPageNo(0);
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
        // setProducts([]);
        setPageNo(0);
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
      const res: any = await api.apiCollectionCreateNewCollectionPost(
        organizationId,
        newCollection
      );
      await handleAddToCollection(res?.data?.id);
      setIsLoading(false);
      setIsCreateModal(false);
      handleSuccessMesssage('New collection added successfully!');
    } catch (error) {
      handleErrorMesssage('Faild to add new collection!');
      console.error(error);
    }
  };

  const handleDeleteProducts = async (id?: number) => {
    setIsProductDelete(true);
    setIsLoading(true);
    const productIds = id ? [id] : selectedVariants;
    try {
      const config: any = await apiConfig();
      const api = new ProductResourceApi(config);
      await api.apiProductDeleteProductsDelete(id ? [id] : selectedVariants);
      // await refetch();
      setIsLoading(false);
      handleSuccessMesssage(
        selectedVariants.length > 0
          ? `Deleted ${selectedVariants.length} products successfully!`
          : 'Deleted product successfully!'
      );
      resetSelectedRows();
      setIsProductDelete(false);
      setProducts(products?.filter((item) => !productIds.includes(item.id)));
    } catch (error: any) {
      setIsLoading(false);
      handleErrorMesssage(
        error?.message || 'Failed to delete produts, please try again!'
      );
      setIsProductDelete(false);
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
              setPageNo(0);
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
                const start = pageNo + 1;
                totalPages && start < totalPages && setPageNo(start);
              }}
              hasMore={!!totalPages && pageNo < totalPages}
              loader={
                pageNo + 1 !== totalPages && (
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
