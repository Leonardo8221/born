import Footer from '@/components/layouts/Footer';
import Sidebar from '@/components/molecules/Sidebar';
import Header from '@/components/page-components/showcase/Header';
import { GET_PRODUCT_BY_ID } from '@/queries/products';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Tabs from '@/components/molecules/Tab/Tabs';
import DescriptionForm from '@/components/page-components/products/DescriptionForm';
import DetailsForm from '@/components/page-components/products/DetailsForm';
import ColoursForm from '@/components/page-components/products/ColoursForm';
import PricingForm from '@/components/page-components/products/PricingForm';
import SizingForm from '@/components/page-components/products/SizingForm';
import OrderingForm from '@/components/page-components/products/OrderingForm';
import CollectionsForm from '@/components/page-components/products/CollectionsForm';
import MediaForm from '@/components/page-components/products/Media';

const ProductEdit = () => {
  const router = useRouter();
  const productId = router?.query?.productId || '';

  const {
    data,
    loading,
    refetch,
  } = useQuery(GET_PRODUCT_BY_ID, {
    variables: {
      productId: Number(productId),
    },
  });
  
  const product = data?.productByProductId || {};

  const tabs = [
    {
      id: 'description',
      label: 'Description',
      content: <DescriptionForm product={product} />,
    },
    {
      id: 'details',
      label: 'Details',
      content: <DetailsForm product={product} />,
    },
    {
      id: 'pricing',
      label: 'Pricing',
      content: <PricingForm product={product} />,
    },
    {
      id: 'colours',
      label: 'Colours',
      content: <ColoursForm product={product} />,
    },
    {
      id: 'sizing',
      label: 'Sizing',
      content: <SizingForm product={product} />,
    },
    {
      id: 'ordering',
      label: 'Ordering',
      content: <OrderingForm product={product} />,
    },
    {
      id: 'media',
      label: 'Media',
      content: <MediaForm product={product} refetch={refetch} />,
    },
    {
      id: 'collections',
      label: 'Collections',
      content: <CollectionsForm product={product} />,
    },
  ]

  return (
    <div>
      <Header heading="Product edit" />
      <div className="min-h-[calc(100vh-144px)]">
        <div className="flex">
          <div className="w-full max-w-[320px] min-h-full bg-neutral-100">
            <div className="fixed top-[72px] h-[calc(100vh-144px)]">
              <Sidebar
                title={product?.style_name}
                subTitle={product?.style_number}
                logoUrl={product?.attachments?.[0]?.medium_image_url || ''}
                variant={2}
              />
            </div>
          </div>
          <div className='w-full p-8'>
            <Tabs tabs={tabs} />
          </div>
        </div>
      </div>
      <div className="relative z-[11]">
        <Footer />
      </div>
    </div>
  )
}

export default ProductEdit;