import { VariantColors } from '@/components/molecules/ColorVariant';
import ImageText from '@/components/molecules/ImageText';
import ListPrices from '@/components/organisms/ProductDetails/ListPrices';
import Badges from '@/components/organisms/Tables/Product/Badges';
import { fonts } from '@/config/fonts';
import { ProductWithCollectionsGraphqlDto, Maybe, ProductAttachmentGraphqlDto } from '@/generated/types';
import { formatCurrency } from '@/utils/formatCurrency';
import clsx from 'clsx';
import { FC } from 'react';

interface ProductListProps {
  product: ProductWithCollectionsGraphqlDto;
}

const ProductListItem: FC<ProductListProps> = ({ product }) => {
  const getPriceList = () => {
    const items = product?.associated_prices?.map((item: any) => {
      const keys = Object.keys(item || {});
      const priceKeys = ['exworks', 'landed', 'retail'];
      return {
        currency: item?.currency,
        items: keys?.map(
          (i: any) =>
            (priceKeys.includes(i) && {
              label: i,
              price:
                item?.[i] || item?.[i] === 0
                  ? formatCurrency(item.currency).format(item?.[i])
                  : null,
            }) ||
            []
        ),
      };
    });
    return items as any;
  };

  return (
    <div className="flex items-center justify-between mb-5">
      <div className="w-full max-w-[221px]">
        <ImageText
          isSelectable={false}
          title={product?.style_name || ''}
          subTitle={product?.style_number || ''}
          altText={product?.style_name + 'logo'}
          imgSrc={product?.attachments?.[0]?.medium_image_url || ''}
          variant="product"
          titleClassName="max-w-[125px]"
        />
      </div>
      <div className="flex items-center w-full max-w-[122px]">
        <div>
          <VariantColors
            colors={
              product?.colour_families?.map((item: any) =>
                item?.toLowerCase()
              ) || []
            }
            url={product?.swatchImage?.small_image_url || undefined}
          />
        </div>
        <span
          className={clsx(
            'text-shades-black tracking-[0.06em] print:w-[60px] break-anywhere ml-2',
            fonts.text.md
          )}
          lang="es"
        >
          {product?.colour_name}
        </span>
      </div>
      <div className="w-full max-w-[87px]">
        <Badges items={product?.season ? [product.season] : []} />
      </div>
      <div className="w-full max-w-[200px]">
        {getPriceList()?.map((item: any) => (
          <ListPrices key={item.currency} items={item?.items || []} isSmall />
        ))}
      </div>
    </div>
  );
};

export default ProductListItem;
