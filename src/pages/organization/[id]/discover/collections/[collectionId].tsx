import { useEffect, useRef, useState } from 'react';
import { CollectionCard } from '@/components/molecules/CollectionCard';
import Header from '@/components/page-components/Collections/Header';
import ProductList from '@/components/page-components/common/ProductList';
import placeholderImage from '@/assets/images/placeholders/collection-preview.png';
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
import useDebounce from '@/utils/debounce';
import { apiConfig } from '@/utils/apiConfig';
import { CollectionResourceApi, ProductResourceApi } from 'client/command';
import EditCollection from '@/components/page-components/Collections/EditCollection';
import Toast from '@/components/page-components/Toast';
import { OrderList } from '@/components/page-components/order/OrdersList';
import {
  OrderGraphqlDto,
  ProductWithCollectionsGraphqlDto,
} from '@/generated/types';
import Notification from '@/components/page-components/order/Notification';
import { COLOUR_FAMILIES_BY_COLLECTION_ID_QUERY } from '@/queries/filters';
import InfiniteScroll from 'react-infinite-scroll-component';

const CollectionPage = () => {
  const router = useRouter();
  const collectionId = Number(router?.query?.collectionId);
  const [gridType, setGrid] = useState<GridType>('grid');
  const [isSelectable, setIsSelectable] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedValue = useDebounce(searchKeyword, 600);
  const [isEditModal, setIsEditModal] = useState(false);
  const [isAddToDraft, setIsAddToDraft] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderGraphqlDto | null>(
    null
  );
  const [selectedColours, setSelectedColours] = useState<string[]>([]);
  const [pageNo, setPageNo] = useState(0);
  const [rows] = useState(24);
  const [products, setProducts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(null);
  const collectionDetailRef = useRef<any>(null);
  const [gridPrevState, setGridPrevState] = useState<GridType>('grid');

  const handleScroll = () => {
    const doc: Document = document;
    const filters: any = doc.getElementById('filters');
    const detailHeight = collectionDetailRef?.current?.clientHeight;
    if(filters) {
      if(doc?.scrollingElement && doc?.scrollingElement?.scrollTop >= (detailHeight + 80)) {
        filters.style.position = 'fixed';
        filters.style.top = '114px';
      } else {
        filters.style.position = '';
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, [])

  const {
    data: collecitonData,
    loading,
    refetch: refetchCollection,
  } = useQuery(COLLECTION_QUERY, {
    variables: {
      collectionId,
    },
    notifyOnNetworkStatusChange: true,
  });

  const collection = collecitonData?.collectionByCollectionId;

  const {
    data: productsCollection,
    loading: productsCollectionLoading,
    refetch,
  } = useQuery(PRODUCTS_BY_COLLECTION_ID_QUERY, {
    variables: {
      collectionId,
      search: debouncedValue,
      colourFamilies: selectedColours,
      rows,
      start: pageNo,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const newProducts: any[] =
        productsCollection?.productsBySearchAndCollectionId?.content || [];

    if(!!searchKeyword || !!selectedColours.length) {
      setProducts(pageNo > 0 ? [...products, ...newProducts] : newProducts);
    } else if (!!newProducts.length) {
      setProducts([...products, ...newProducts]);
      !totalPages &&
        setTotalPages(
          productsCollection?.productsBySearchAndCollectionId?.total_pages
        );
    }
  }, [productsCollection]);

  useEffect(() => {
    window.onafterprint = () => {
      setGrid(gridPrevState);
    }
  }, []);

  const { data: colours } = useQuery(COLOUR_FAMILIES_BY_COLLECTION_ID_QUERY, {
    variables: { collectionId },
  });

  const filterTags = [
    {
      label: 'Colours',
      options: colours?.colourFamiliesByCollectionId?.map((item: string) => ({
        id: item,
        label: item,
      })),
      selectedItems: selectedColours,
      action: (e: { id: string | number; label: string }) => {
        setProducts([]);
        setPageNo(0);
        if (selectedColours.includes(e.label)) {
          setSelectedColours(selectedColours?.filter((c) => c !== e.label));
        } else {
          setSelectedColours([...selectedColours, e.label]);
        }
      },
      onReset: () => {
        setSelectedColours([]);
        setPageNo(0);
        setProducts([]);
      },
    },
    {
      label: 'Season',
      options: [],
      actions: () => {},
      selectedItems: [],
      onReset: () => {},
    }
  ];

  const handleErrorMesssage = (message: string) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const handleSuccessMesssage = (message: string) => {
    refetch();
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleRemoveProducts = async (id?: number) => {
    setIsLoading(true);
    try {
      const config: any = await apiConfig();
      const api = new CollectionResourceApi(config);
      await api.apiCollectionDisassociateProductsPut(
        collectionId,
        id ? [id] : selectedProducts
      );
      handleSuccessMesssage(
        `Removed ${selectedProducts.length} products from collections sucessfully!!`
      );
      setIsLoading(false);
      setSelectedProducts([]);
    } catch (error: any) {
      setIsLoading(false);
      handleErrorMesssage(
        error?.message || 'Failed to removed products, please try again!'
      );
      console.error(error);
    }
  };

  const handleDeleteProducts = async (id?: number) => {
    setIsLoading(true);
    try {
      const config: any = await apiConfig();
      const api = new ProductResourceApi(config);
      await api.apiProductDeleteProductsDelete(id ? [id] : selectedProducts);
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
      action: () => setIsAddToDraft(true),
      disabled: isLoading || !selectedProducts.length,
    },
    {
      name: 'Remove from collection',
      action: () => handleRemoveProducts(),
      disabled: isLoading || !selectedProducts.length,
    },
    {
      name: 'Delete',
      action: () => handleDeleteProducts(),
      disabled: isLoading || !selectedProducts.length,
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

  if (!collection && loading) {
    return <Loading message="Loading collections" />;
  }

  return (
    <div>
      <Header
        handlePrint={(e: GridType) => {
          setGridPrevState(gridType);
          setGrid(e);
        }}
        handleCreateOrder={() => {
          setSelectedProducts(
            productsCollection?.productsBySearchAndCollectionId?.content?.map(
              (item: ProductWithCollectionsGraphqlDto) => item.id
            )
          );
          setIsAddToDraft(true);
        }}
        handleErrorMessage={handleErrorMesssage}
      />
      <div
        className="min-h-[calc(100vh-185px)] max-w-[1120px] mx-auto"
        id="collection"
      >
        <div className="mb-[64px]" ref={collectionDetailRef}>
          <CollectionCard
            backgroundImageSrc={collection?.banner_url || placeholderImage}
            label={collection?.name}
            editBanner
            editButtonText="Edit Collection"
            onEdit={(e) => {
              e.preventDefault();
              setIsEditModal(true);
            }}
          />
          <Description
            lookbookName={collection?.lookbook_name || ''}
            lookbookUrl={collection?.lookbook_url || ''}
            linesheetName={collection?.linesheet_name || ''}
            linesheetUrl={collection?.linesheet_url || ''}
            description={collection?.description}
          />
        </div>
        <Filters
          onGridChange={setGrid}
          gridType={gridType}
          onSelect={() => setIsSelectable(!isSelectable)}
          filterTags={filterTags}
          actions={actions}
          isSelectable={isSelectable}
          selectedItems={selectedProducts}
          searchKeyword={searchKeyword}
          onSearch={setSearchKeyword}
        />
        {!products.length && productsCollectionLoading ? (
          <div className="my-10 min-h-[400px]">
            <Loading message="Loading collecton products" />
          </div>
        ) : (
          <>
            <InfiniteScroll
              dataLength={products.length}
              next={async () => {
                const start = pageNo + 1;
                totalPages && start <= totalPages && setPageNo(start);
              }}
              hasMore={!!totalPages && pageNo < totalPages}
              loader={
                pageNo > 1 &&
                totalPages &&
                pageNo < totalPages && (
                  <Loading message="Loading more products..." />
                )
              }
            >
              <ProductList
                gridType={gridType}
                products={products}
                selectable={isSelectable}
                selectedProducts={selectedProducts}
                onSelect={handleSelectedProducts}
                type="collection"
                hanldeAddToDraftOrder={(id) => {
                  setSelectedProducts([id]);
                  setIsAddToDraft(true);
                }}
                handleAddToCollection={(id) => {
                  handleRemoveProducts(id);
                }}
                handleDeleteProduct={(id) => {
                  handleDeleteProducts(id);
                }}
              />
            </InfiniteScroll>
          </>
        )}
      </div>
      <EditCollection
        isOpen={isEditModal}
        title="Edit collection details"
        collection={collection}
        toggleModal={setIsEditModal}
        handleSuccessMessage={handleSuccessMesssage}
        handleErrorMessage={handleErrorMesssage}
        refetch={refetchCollection}
      />
      <OrderList
        setModalIsVisible={() => setIsAddToDraft(!isAddToDraft)}
        isModalVisible={isAddToDraft}
        productIds={selectedProducts}
        resetProductIds={() => setSelectedProducts([])}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
      />
      <Toast successMessage={successMessage} errorMessage={errorMessage} />
      <Footer />

      {selectedOrder?.id && (
        <Notification
          order={selectedOrder}
          onCancel={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default CollectionPage;
