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
import { OrderGraphqlDto, ProductWithCollectionsGraphqlDto } from '@/generated/types';
import Notification from '@/components/page-components/order/Notification';
import moment from 'moment';
import { ORGANIZATION_QUERY } from '@/queries/organizations';
import ProductListItem from './ProductListItem';
import ProductHeader from '@/components/organisms/ProductHeader/ProductHeader';

const ProductDetailsPage = () => {
  const router = useRouter();
  const productIdQuery = router?.query?.product_id || null;
  const organizationId = router?.query?.id || null;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderGraphqlDto | null>(
    null
  );

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    }
  }, [])

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

  const collectionId = product?.productByProductId?.collections?.[0]?.id || '';

  const { data: collectionProducts, loading: collectionProductsLoading } =
    useQuery(GET_PRODUCTS_BY_COLLECTION_ID, {
      variables: { collectionId: Number(collectionId), start: 0, rows: 3 },
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
      value: currentProduct?.size_options.join(', '),
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
      <div className='fixed left-0 top-0 h-screen w-full bg-[rgba(30,30,30,0.58)] z-[990]'></div>
      <div className='fixed top-0 right-0 h-screen w-full max-w-[806px] z-[999] bg-shades-white overflow-y-auto'>
        <ProductHeader
          productRefectch={productRefectch}
          currentProduct={currentProduct}
          title={currentProduct?.style_name}
          onDraftOrder={() => setIsModalVisible(true)}
        />
        <div className="min-h-[calc(100vh-225px)] px-12">
          <div className="max-w-[1200px] mx-auto">
            {loading ? (
              <Loading message="Loading product details..." />
            ) : (
              <ProductDetails
                attachments={currentProduct?.attachments || []}
                productImages={currentProduct?.attachments?.splice(0, 2) || []}
                associated_prices={currentProduct?.associated_prices}
                description={currentProduct?.description}
                colors={currentProduct?.colour_families}
                colour_name={currentProduct?.colour_name}
                productVariants={currentProduct?.productVariants || []}
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
            <div className='h-[1px] w-full bg-neutral-400 mt-10'></div>
            <div className="flex justify-between mt-8 mb-5">
              <h2 className="text-[24px] leading-[40px] font-normal">From this collection</h2>
            </div>
            {!content && collectionProductsLoading ? (
              <Loading message="Loading collecitons" />
            ) : (
              content?.map((item: ProductWithCollectionsGraphqlDto) => (
                <ProductListItem product={item} key={item.id} />
              ))
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
      </div>
    </div>
  );
};

export default ProductDetailsPage;
