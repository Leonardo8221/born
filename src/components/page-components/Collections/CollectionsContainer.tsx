import { FC, useEffect, useRef, useState } from 'react';
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
import {
  AttachmentResourceApi,
  CollectionResourceApi,
  ProductResourceApi,
} from 'client/command';
import EditCollection from '@/components/page-components/Collections/EditCollection';
import Toast from '@/components/page-components/Toast';
import { OrderList } from '@/components/page-components/order/OrdersList';
import { OrderGraphqlDto } from '@/generated/types';
import Notification from '@/components/page-components/order/Notification';
import {
  COLOUR_FAMILIES_BY_COLLECTION_ID_QUERY,
  SEASONS_BY_COLLECTION_ID,
} from '@/queries/filters';
import InfiniteScroll from 'react-infinite-scroll-component';
import LinesheetUpload from '@/components/page-components/showcase/LinesheetUpload';
import useVariantSelect from '@/components/page-components/common/useVariantSelect';
import ToggleCollectionSection from '../common/ToggleCollectionSection';

interface CollectionsContainerProps {
  isCollectionSection: boolean;
  setIsCollectionSection: (value: boolean) => void;
  gridType: GridType;
  setGrid: (value: GridType) => void;
}

const CollectionsContainer: FC<CollectionsContainerProps> = ({
  isCollectionSection,
  setIsCollectionSection,
  gridType,
  setGrid,
}) => {
  const router = useRouter();
  const collectionId = router?.query?.collectionId
    ? Number(router?.query?.collectionId)
    : null;
  const [isSelectable, setIsSelectable] = useState(false);
  const {
    selectedRows,
    selectedVariants,
    setSelectedRows,
    resetSelectedRows,
    setSelectedVariants,
  } = useVariantSelect();
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
  const [selectedSeasons, setSelectedSeasons] = useState<string[]>([]);
  const [pageNo, setPageNo] = useState(0);
  const [rows] = useState(24);
  const [products, setProducts] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(null);
  const collectionDetailRef = useRef<any>(null);
  const [gridPrevState, setGridPrevState] = useState<GridType>('grid');
  const [isProductDelete, setIsProductDelete] = useState(false);
  const [isPdf, setIsPdf] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  const handleScroll = () => {
    const doc: Document = document;
    const filters: any = doc.getElementById('filters');
    const detailHeight = collectionDetailRef?.current?.clientHeight;
    if (filters) {
      if (
        doc?.scrollingElement &&
        doc?.scrollingElement?.scrollTop >= detailHeight + 80
      ) {
        filters.style.position = 'fixed';
        filters.style.top = '114px';
      } else {
        filters.style.position = '';
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
      collectionId: collectionId,
      search: debouncedValue,
      colourFamilies: selectedColours,
      seasons: selectedSeasons,
      rows,
      start: pageNo * rows,
    },
    fetchPolicy: 'network-only',
    skip: collectionId === null,
  });

  const { data: allProducts } = useQuery(PRODUCTS_BY_COLLECTION_ID_QUERY, {
    variables: {
      collectionId: collectionId,
      rows: 1000,
      start: 0,
    },
    fetchPolicy: 'network-only',
    skip: collectionId === null,
  });

  const collectionProducts =
    allProducts?.productsBySearchAndCollectionId?.content || [];

  useEffect(() => {
    const newProducts: any[] =
      productsCollection?.productsBySearchAndCollectionId?.content || [];
    if (!isProductDelete) {
      if (!!searchKeyword || !!selectedColours.length) {
        setProducts(
          pageNo !== 0 && pageNo > 0
            ? [...products, ...newProducts]
            : newProducts
        );
      } else if (!!newProducts.length) {
        setProducts(
          pageNo !== 0 && pageNo > 0
            ? [...products, ...newProducts]
            : newProducts
        );
        !totalPages &&
          setTotalPages(
            productsCollection?.productsBySearchAndCollectionId?.total_pages
          );
      }
    }
  }, [productsCollection]);

  useEffect(() => {
    window.onafterprint = () => {
      setGrid(gridPrevState);
      setIsPdf(false);
    };
  }, []);

  const { data: colours } = useQuery(COLOUR_FAMILIES_BY_COLLECTION_ID_QUERY, {
    variables: { collectionId },
    notifyOnNetworkStatusChange: true,
    skip: collectionId === null,
  });

  const { data: seasons } = useQuery(SEASONS_BY_COLLECTION_ID, {
    variables: { collectionId },
    notifyOnNetworkStatusChange: true,
    skip: collectionId === null,
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
      label: 'Seasons',
      options: seasons?.seasonsByCollectionId?.map((item: string) => ({
        id: item,
        label: item,
      })),
      selectedItems: selectedSeasons,
      action: (e: { id: string | number; label: string }) => {
        setProducts([]);
        setPageNo(0);
        if (selectedSeasons.includes(e.label)) {
          setSelectedSeasons(selectedSeasons?.filter((c) => c !== e.label));
        } else {
          setSelectedSeasons([...selectedSeasons, e.label]);
        }
      },
      onReset: () => {
        setSelectedSeasons([]);
        setPageNo(0);
        setProducts([]);
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
    refetch();
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleRemoveProducts = async (id?: number) => {
    setIsLoading(true);
    setIsProductDelete(true);
    try {
      const config: any = await apiConfig();
      const api = new CollectionResourceApi(config);
      const productIds = id ? [id] : selectedVariants;
      await api.apiCollectionDisassociateProductsPut(
        Number(collectionId),
        productIds
      );
      setProducts(products.filter((item) => !productIds.includes(item.id)));
      handleSuccessMesssage(
        `Removed ${
          selectedVariants.length || 1
        } products from collections sucessfully!!`
      );
      setIsLoading(false);
      setIsProductDelete(false);
      resetSelectedRows();
    } catch (error: any) {
      setIsLoading(false);
      setIsProductDelete(false);
      handleErrorMesssage(
        error?.message || 'Failed to removed products, please try again!'
      );
      console.error(error);
    }
  };

  const handleDeleteProducts = async (id?: number) => {
    setIsLoading(true);
    setIsProductDelete(true);
    try {
      const ids = id ? [id] : selectedVariants;
      const config: any = await apiConfig();
      const api = new ProductResourceApi(config);
      await api.apiProductDeleteProductsDelete(ids);
      setProducts(products.filter((item) => !ids.includes(item.id)));
      setIsLoading(false);
      handleSuccessMesssage(
        `Deleted ${selectedVariants.length || 1} products successfully!`
      );
      resetSelectedRows();
    } catch (error: any) {
      setIsLoading(false);
      handleErrorMesssage(
        error?.message || 'Failed to delete produts, please try again!'
      );
    }
  };

  const handleUploadFile = async ({
    fileType,
    file,
    name,
    onReset,
  }: {
    fileType: 'LINESHEET' | 'LOOKBOOK' | null;
    file: File | null;
    name: string;
    onReset: () => void;
  }) => {
    try {
      if (fileType && file) {
        const config = await apiConfig();
        const api = new AttachmentResourceApi(config);
        const collectionApi = new CollectionResourceApi(config);
        await api.apiAttachmentUploadCollectionAttachmentPost(
          collection.id,
          fileType,
          file,
          file.name
        );
        const payload = {
          ...collection,
          linesheet_name:
            (fileType === 'LINESHEET' ? name : collection.linesheet_name) || '',
          lookbook_name:
            (fileType === 'LOOKBOOK' ? name : collection.lookbook_name) || '',
        };
        await collectionApi.apiCollectionUpdateCollectionDetailsPut(
          collection.id,
          payload
        );
        handleSuccessMesssage('File uploaded successfully!');
        setIsUpload(false);
        onReset();
        refetchCollection();
      } else {
        handleErrorMesssage('File is required!');
      }
    } catch (error) {
      console.error(error);
      handleErrorMesssage('Failed to upload file, please try again!');
    }
  };

  const actions = [
    {
      name: 'Add to draft order',
      action: () => setIsAddToDraft(true),
      disabled: isLoading || !selectedRows.length,
    },
    {
      name: 'Remove from collection',
      action: () => handleRemoveProducts(),
      disabled: isLoading || !selectedRows.length,
    },
    {
      name: 'Delete',
      action: () => handleDeleteProducts(),
      disabled: isLoading || !selectedRows.length,
    },
  ];

  if (!collection && loading) {
    return <Loading message="Loading collections" />;
  }

  const renderProducts = (productList: any) => (
    <ProductList
      gridType={gridType}
      products={productList}
      selectable={isSelectable}
      selectedVariants={selectedVariants}
      selectedProducts={selectedRows}
      onSelect={setSelectedRows}
      type="collection"
      hanldeAddToDraftOrder={(id) => {
        setSelectedRows({ id, selectedVariant: id });
        setIsAddToDraft(true);
      }}
      handleAddToCollection={(id) => {
        handleRemoveProducts(id);
      }}
      handleDeleteProduct={(id) => {
        handleDeleteProducts(id);
      }}
    />
  );

  const handleSearch = (e: string) => {
    setPageNo(0);
    setSearchKeyword(e);
  };

  return (
    <div>
      <Header
        handlePrint={(e: GridType) => {
          setGridPrevState(gridType);
          setGrid(e);
          setIsPdf(true);
        }}
        handleCreateOrder={() => {
          setSelectedVariants(
            products?.map((item: any) => ({
              id: item.id,
              selectedVariant: item.id,
            }))
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
            linesheetGuid={collection?.linesheet_guid || ''}
            lookbookGuid={collection?.lookbook_guid || ''}
            description={collection?.description}
            onUpload={() => setIsUpload(true)}
          />
        </div>
        <Filters
          onGridChange={setGrid}
          gridType={gridType}
          onSelect={() => setIsSelectable(!isSelectable)}
          filterTags={filterTags}
          actions={actions}
          isSelectable={isSelectable}
          selectedItems={selectedRows}
          searchKeyword={searchKeyword}
          onSearch={handleSearch}
        >
          {gridType !== 'list' ? (
            <div className="flex items-center border-neutral-400 pr-4 mr-4 border-r gap-2">
              <ToggleCollectionSection
                showSection={isCollectionSection}
                onChange={setIsCollectionSection}
              />
            </div>
          ) : undefined}
        </Filters>
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
              className="print:hidden"
            >
              {renderProducts(products)}
            </InfiniteScroll>
            <div className="h-[0px] overflow-hidden opacity-0 invisible print:h-auto print:overflow-auto print:opacity-100 print:visible">
              {renderProducts(collectionProducts)}
            </div>
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
        productIds={selectedVariants}
        resetProductIds={() => resetSelectedRows()}
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
      <LinesheetUpload
        isOpen={isUpload}
        setIsOpen={setIsUpload}
        handleSubmit={handleUploadFile}
      />
    </div>
  );
};

export default CollectionsContainer;
