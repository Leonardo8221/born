import ColorVariant from '@/components/molecules/ColorVariant';
import { Heading } from '@/components/molecules/Heading';
import ListPrices from '@/components/organisms/ProductDetails/ListPrices';
import {
  Maybe,
  PriceGraphqlDto,
  ProductWithCollectionsGraphqlDto,
  Scalars,
} from '@/generated/types';
import { formatCurrency } from '@/utils/formatCurrency';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface ProductInfoProps {
  style_name?: string;
  associated_prices?: Maybe<Array<Maybe<PriceGraphqlDto>>>;
  productVariants?: Maybe<Array<ProductWithCollectionsGraphqlDto['productVariants']>>;
  colour_families?: string[];
  colour_name?: Maybe<Scalars["String"]>;
  swatchImage?: any;
  id?: number;
}

const ProductInfo: FC<ProductInfoProps> = ({
  style_name,
  associated_prices,
  colour_families,
  productVariants,
  colour_name,
  swatchImage,
  id,
}) => {
  const router = useRouter();
  
  const handleVariant = (id: number) => {
    router.query.product_id = id as any;
    router.push(router, undefined, { shallow: true });
  }
  return (
    <div>
      <Heading size="sm">{style_name}</Heading>
      <div className="w-full mt-1 mb-4">
        <div className="flex flex-wrap gap-6 items-center">
          {associated_prices?.map((item: any, index) => {
            return (
              <div
                key={`${index} associated_prices`}
                className={clsx(
                  'relative',
                  index !== 0 ? ' pl-6' : ''
                )}
              >
                {index !== 0 && <div className='absolute left-0 top-0 bottom-0 my-auto bg-neutral-600 h-10 w-[1px]' />}
                <ListPrices
                  items={
                    [
                      {
                        label: 'Landed',
                        price: (item?.landed && item?.currency && formatCurrency(item.currency).format(item.landed)) || null,
                      },
                      {
                        label: 'Exworks',
                        price:
                          (item?.exworks && item?.currency && formatCurrency(item.currency).format(item.exworks)) || null,
                      },
                      {
                        label: 'MSRP',
                        price: (item?.retail && item?.currency && formatCurrency(item.currency).format(item.retail)) || null,
                      },
                    ] || []
                  }
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2.5 mb-10">
          {/* <ColorVariant colors={colour_families || []} label={colour_name || ''} url={swatchImage?.small_image_url} /> */}
          {productVariants?.map((variant: any) => (
            <div key={variant?.id} onClick={() => handleVariant(variant?.id)}>
              <ColorVariant
                key={variant?.id}
                colors={variant?.colour_families || []}
                url={variant?.swatchImage?.swatch_image_url}
                label={variant?.id === id ? variant?.colour_name : ''}
              />
            </div>
          ))}
        </div>
    </div>
  );
};

export default ProductInfo;
