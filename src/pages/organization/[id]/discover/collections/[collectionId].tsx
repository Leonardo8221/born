import { useState } from 'react';
import { CollectionCard } from '@/components/molecules/CollectionCard';
import Header from '@/components/page-components/Collections/Header';
import ProductList from '@/components/page-components/common/ProductList';
import backgroundImageSrc from '@/assets/images/collection-card/collection-card-background-image.png';
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
import Toast from '@/components/page-components/Toast';
import { OrderList } from '@/components/page-components/order/OrdersList';

const CollectionPage = () => {
  const router = useRouter();
  const collectionId = Number(router?.query?.collectionId);
  const [gridType, setGrid] = useState<GridType>('grid');
  const [isSelectable, setIsSelectable] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedValue = useDebounce(searchKeyword, 600);

  const { data: colleciton, loading } = useQuery(COLLECTION_QUERY, {
    variables: { collectionId },
  });

  const {
    data: productsCollection,
    loading: productsCollectionLoading,
    refetch,
  } = useQuery(PRODUCTS_BY_COLLECTION_ID_QUERY, {
    variables: { collectionId, search: debouncedValue },
  });

  const filterTags = [
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

  const handleRemoveProducts = async () => {
    setIsLoading(true);
    try {
      const config: any = await apiConfig();
      const api = new CollectionResourceApi(config);
      await api.apiCollectionDisassociateProductsPut(
        collectionId,
        selectedProducts
      );
      refetch();
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
      action: () => console.log('added to draft order'),
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

  if (loading) {
    return <Loading message="Loading collections" />;
  }

  return (
    <div>
      <Header handleCreateOrder={() => setIsModalVisible(!isModalVisible)} />
      <div className="min-h-[calc(100vh-185px)] max-w-[1120px] mt-6 mx-auto">
        <div className="mb-[64px]">
          <CollectionCard
            backgroundImageSrc={backgroundImageSrc}
            label={colleciton?.collectionByCollectionId?.name}
            editBanner
            onEdit={(e) => e.preventDefault()}
          />
          <Description />
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
        {productsCollectionLoading ? (
          <div className="my-10 min-h-[400px]">
            <Loading message="Loading collecton products" />
          </div>
        ) : (
          <>
            <ProductList
              gridType={gridType}
              products={
                productsCollection?.productsBySearchAndCollectionId?.content ||
                []
              }
              selectable={isSelectable}
              selectedProducts={selectedProducts}
              onSelect={handleSelectedProducts}
            />
          </>
        )}
      </div>
      <OrderList
        setModalIsVisible={() => setIsModalVisible(!isModalVisible)}
        isModalVisible={isModalVisible}
      />
      <Toast successMessage={successMessage} errorMessage={errorMessage} />
      <Footer />
    </div>
  );
};

export default CollectionPage;
