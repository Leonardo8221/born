import ProductDetails from '@/components/organisms/ProductDetails';
import ProductHeader from '@/components/organisms/ProductHeader';
import ProductList from '@/components/page-components/common/ProductList';
import { Icon } from '@/components/molecules/Icon';
import Link from 'next/link';
import Footer from '@/components/layouts/Footer';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import {
  GET_PRODUCTS_BY_COLLECTION_ID,
  GET_PRODUCT_BY_ID,
} from '@/queries/products';
import ErrorMessage from '@/components/page-components/Error/ErrorMessage';
import Loading from '@/components/page-components/Loading';
import { OrderList } from '@/components/page-components/order/OrdersList';
import { useState } from 'react';
import { OrderGraphqlDto } from '@/generated/types';
import Notification from '@/components/page-components/order/Notification';

const ProductPage = () => {
  const router = useRouter();
  const productIdQuery = router?.query?.productId || '';
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderGraphqlDto | null>(
    null
  );

  const {
    data: product,
    error: productError,
    loading,
    refetch: productRefectch,
  } = useQuery(GET_PRODUCT_BY_ID, {
    variables: {
      productId: Number(productIdQuery),
    },
  });

  const currentProduct = product?.productByProductId;

  const collectionId = product?.productByProductId?.collections?.[0]?.id || '';

  const { data: collectionProducts, loading: collectionProductsLoading } =
    useQuery(GET_PRODUCTS_BY_COLLECTION_ID, {
      variables: { collectionId: Number(collectionId), start: 0, rows: 3 },
    });

  const content = collectionProducts?.productsBySearchAndCollectionId?.content;

  const specifications = [
    {
      label: 'Made in',
      value: currentProduct?.country_of_origin,
    },
    {
      label: 'Style',
      value: currentProduct?.style_number,
    },
    {
      label: 'Composition',
      value: currentProduct?.compositions?.join(', '),
    },
    {
      label: 'Material',
      value: currentProduct?.materials?.join(', '),
    },
    {
      label: 'Measurements',
      value: currentProduct?.measurements?.join(', '),
    },
    {
      label: 'Colors',
      value: currentProduct?.colour_name,
    },
    {
      label: 'Color Code',
      value: currentProduct?.colour_code,
    },
    {
      label: 'Color Family',
      value: currentProduct?.colour_families?.join(', '),
    },
    {
      label: 'Delivery start',
      value: currentProduct?.delivery_window_start_date,
    },
    {
      label: 'Delivery end',
      value: currentProduct?.delivery_window_start_date,
    },
  ];

  if (productError) {
    return (
      <ErrorMessage
        errorMessage={productError?.message}
        refetch={productRefectch}
      />
    );
  }

  return (
    <>
      <ProductHeader
        productRefectch={productRefectch}
        currentProduct={currentProduct}
        title={currentProduct?.style_name}
        onDraftOrder={() => setIsModalVisible(true)}
        hrefBack={`/organization/${router.query.id}/discover?tab=products`}
        containerClassName="mt-[42px] mb-[64px]"
        srcLogo={currentProduct?.attachments?.[0]?.medium_image_url || ''}
      />
      <div className="min-h-[calc(100vh-225px)]">
        <div className="max-w-[1200px] mx-auto">
          {loading ? (
            <Loading message="Loading product details..." />
          ) : (
            <ProductDetails
              attachments={currentProduct?.attachments || []}
              productImages={currentProduct?.attachments || []}
              associated_prices={currentProduct?.associated_prices}
              description={currentProduct?.description}
              colors={currentProduct?.colour_families}
              tags={[
                {
                  title: 'Season',
                  list: [currentProduct?.season],
                },
                {
                  title: 'Collections',
                  list:
                    currentProduct?.collections?.map(
                      (collection: any) => collection.name
                    ) || [],
                },
                {
                  title: 'Keywords',
                  list: currentProduct?.keywords || [],
                },
              ]}
              specifications={specifications}
            />
          )}
          <div className="flex justify-between mt-[70px] mb-[40px]">
            <h2 className="text-[32px]">From this collection</h2>
            <Link
              href={`/organization/1/discover/collections/${collectionId}`}
              className="flex align-center"
            >
              View More <Icon className="ml-[6px]" name="icon-arrow-right" />
            </Link>
          </div>
          {!content && collectionProductsLoading ? (
            <Loading message="Loading collecitons" />
          ) : (
            <ProductList
              gridType={'grid'}
              products={content || []}
              selectable={false}
              onSelect={() => {}}
              selectedProducts={[]}
            />
          )}
        </div>
        <OrderList
          setModalIsVisible={() => setIsModalVisible(!isModalVisible)}
          isModalVisible={isModalVisible}
          productIds={[currentProduct?.id]}
          resetProductIds={() => {}}
          setSelectedOrder={setSelectedOrder}
          selectedOrder={selectedOrder}
        />

        {selectedOrder?.id && (
          <Notification
            order={selectedOrder}
            onCancel={() => setSelectedOrder(null)}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
