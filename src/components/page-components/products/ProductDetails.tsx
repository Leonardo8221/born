import ProductDetails from '@/components/organisms/ProductDetails';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import {
  GET_PRODUCTS_BY_COLLECTION_ID,
  GET_PRODUCT_BY_ID,
} from '@/queries/products';
import ErrorMessage from '@/components/page-components/Error/ErrorMessage';
import Loading from '@/components/page-components/Loading';
import { OrderList } from '@/components/page-components/order/OrdersList';
import { useEffect, useState } from 'react';
import {
  OrderGraphqlDto,
  ProductWithCollectionsGraphqlDto,
} from '@/generated/types';
import Notification from '@/components/page-components/order/Notification';
import moment from 'moment';
import { ORGANIZATION_QUERY } from '@/queries/organizations';
import ProductListItem from './ProductListItem';
import ProductHeader from '@/components/organisms/ProductHeader/ProductHeader';
import ProductInfo from './ProductInfo';
import ProductImagePreview from './ProductImagePreview';

const ProductDetailsPage = () => {
  const router = useRouter();
  const productIdQuery = router?.query?.product_id || null;
  const organizationId = router?.query?.id || null;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderGraphqlDto | null>(
    null
  );
  const [isAttachmentsPreivew, setIsAttachmentsPreivew] = useState(false);

  // useEffect(() => {
  //   document.body.style.overflow = 'hidden';
  //   return () => {
  //     document.body.style.overflow = 'auto';
  //   };
  // }, []);

  const {
    data: product,
    error: productError,
    loading,
    refetch: productRefectch,
  } = useQuery(GET_PRODUCT_BY_ID, {
    variables: {
      productId: Number(productIdQuery),
    },
    fetchPolicy: 'network-only',
    skip: productIdQuery === null,
  });

  const { data: currentOrganization } = useQuery(ORGANIZATION_QUERY, {
    variables: {
      organizationId: Number(organizationId),
    },
    skip: organizationId === null,
    fetchPolicy: 'cache-and-network',
  });

  const currentProduct = product?.productByProductId;

  const collectionId = product?.productByProductId?.collections?.[0]?.id || null;

  const { data: collectionProducts, loading: collectionProductsLoading } =
    useQuery(GET_PRODUCTS_BY_COLLECTION_ID, {
      variables: { collectionId: Number(collectionId), start: 0, rows: 3 },
      skip: collectionId === null,
    });

  const content = collectionProducts?.productsBySearchAndCollectionId?.content;

  const specifications = [
    {
      label: 'Country of origin',
      value: currentProduct?.country_of_origin,
    },
    {
      label: 'Style',
      value: currentProduct?.style_number,
    },
    {
      label: 'Sizing',
      value: currentProduct?.size_options?.join(', '),
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
      label: 'Category',
      value: currentProduct?.third_category,
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
      value: currentProduct?.delivery_window_start_date
        ? moment(currentProduct?.delivery_window_start_date).format(
            'DD/MM/YYYY'
          )
        : '',
    },
    {
      label: 'Delivery end',
      value: currentProduct?.delivery_window_end_date
        ? moment(currentProduct?.delivery_window_end_date).format('DD/MM/YYYY')
        : '',
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
    <div>
      <div className="fixed top-0 right-0 h-screen w-full max-w-[513px] z-[999] bg-shades-white overflow-y-auto border-l border-neutral-400">
        <ProductHeader
          productRefectch={productRefectch}
          currentProduct={currentProduct}
          title={currentProduct?.style_name}
          onDraftOrder={() => setIsModalVisible(true)}
        />
        <div className="min-h-[calc(100vh-225px)] px-12">
          <div className="mx-auto">
            {loading ? (
              <Loading message="Loading product details..." />
            ) : (
              <>
                <ProductInfo
                  style_name={currentProduct?.style_name}
                  associated_prices={currentProduct?.associated_prices}
                  colour_families={currentProduct?.colour_families}
                  colour_name={currentProduct?.colour_name}
                  productVariants={currentProduct?.productVariants}
                  swatchImage={currentProduct?.swatchImage}
                  id={currentProduct?.id}
                />
                <ProductDetails
                  attachments={currentProduct?.attachments?.slice(0, 2) || []}
                  productImages={currentProduct?.attachments || []}
                  associated_prices={currentProduct?.associated_prices}
                  description={currentProduct?.description}
                  colors={currentProduct?.colour_families}
                  colour_name={currentProduct?.colour_name}
                  productVariants={currentProduct?.productVariants || []}
                  onAttachmentClick={() => setIsAttachmentsPreivew(true)}
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
                      list: currentProduct?.keywords || [],
                    },
                  ]}
                  specifications={specifications}
                />
              </>
            )}
          </div>
          {isAttachmentsPreivew && (
            <ProductImagePreview
              attachments={currentProduct?.attachments || []}
              productRefectch={productRefectch}
              currentProduct={currentProduct}
              title={currentProduct?.style_name}
              onDraftOrder={() => setIsModalVisible(true)}
              onClose={() => setIsAttachmentsPreivew(false)}
              styleId={currentProduct?.product_id}
              styleName={currentProduct?.style_name}
            />
          )}
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
      </div>
    </div>
  );
};

export default ProductDetailsPage;
