import { FC, useState } from 'react';
import clsx from 'clsx';
import { StaticImageData } from 'next/image';
import { Badge } from '../../Badge';
import { Checkbox } from '../../Checkbox';
import styles from './product.module.css';
import { ProductWithCollectionsGraphqlDto } from '@/generated/types';
import {
  clsProductCard,
  clsProductCardId,
  clsProductCardPrice,
  clsProductCardPrices,
  clsProductCardTags,
  clsProductCardTitle,
  currencies,
} from './utils';
import { useRouter } from 'next/router';
import ColorVariant, { VariantColors } from '../../ColorVariant';
import moment from 'moment';
import { fonts } from '@/config/fonts';
import ProductColors from './ProductColors';

export interface ProductCardProps extends ProductWithCollectionsGraphqlDto {
  size?: 'lg' | 'sm';
  imageUrl?: StaticImageData | string;
  isSelectable?: boolean;
  isSelected?: boolean;
  onSelect?: ({
    id,
    selectedVariant,
  }: {
    id: number;
    selectedVariant: number;
    isVariant?: boolean;
  }) => void;
  selectedVariants?: number[];
  isCollection?: boolean;
  swatchImage?: any;
  productVariants?: any;
  isPdf?: boolean;
}

export const ProductCard: FC<ProductCardProps> = ({
  size = 'lg',
  style_number,
  style_name,
  imageUrl,
  isSelected,
  onSelect = () => {},
  associated_prices,
  colour_families,
  colour_name,
  productVariants,
  collections,
  size_options,
  materials,
  third_category,
  id,
  delivery_window_start_date,
  delivery_window_end_date,
  selectedVariants,
  isCollection,
  swatchImage,
  isPdf,
}) => {
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);

  const getSelectedVariantImageUrl = () => {
    if (selectedVariant !== null) {
      const images: any = productVariants?.filter(
        (item: any) =>
          item?.id === selectedVariant || selectedVariants?.includes(item?.id)
      )?.[0]?.attachments?.[0];
      return images?.[size === 'lg' ? 'large_image_url' : 'medium_image_url'];
    } else {
      return imageUrl;
    }
  };

  const renderCheckbox = (
    <div className={clsx(styles.productCardCheckbox, 'print:hidden')}>
      <Checkbox
        checked={isSelected}
        onChange={(_, e: any) => {
          onSelect({ id, selectedVariant: selectedVariant || id });
        }}
      />
    </div>
  );

  const handleCardPreview = (e: any) => {
    e.preventDefault();
    router.query.product_id = selectedVariant || id;
    router.push(router, undefined, { shallow: true });
  };

  return (
    <div className="cursor-pointer">
      <div
        className={clsx(
          clsProductCard(size),
          'print:break-inside-avoid-page print:h-full'
        )}
      >
        <div
          className={clsx(
            clsProductCardId(size),
            'break-anywhere flex gap-2 items-center'
          )}
          lang="es"
        >
          <div>{renderCheckbox}</div>
          <div className="flex-1" onClick={handleCardPreview}>
            {style_number}
          </div>
        </div>
        <div
          onClick={handleCardPreview}
          className={clsx(size === 'lg' ? 'pt-3' : 'pt-2')}
        >
          <div
            className={clsx(
              styles.productCardImageWrapper,
              'rounded-lg',
              size === 'lg' ? 'w-[320px] h-[320px]' : 'w-[144px] h-[144px]',
              isSelected
                ? 'border border-neutral-400 shadow-large'
                : 'border !border-[transparent]'
            )}
          >
            <div className="absolute top-0 left-0 h-full w-full bg-[rgba(0,0,0,0.1)]" />
            {getSelectedVariantImageUrl() && (
              <img
                src={
                  typeof imageUrl === 'string'
                    ? getSelectedVariantImageUrl()
                    : imageUrl?.src
                }
                alt={style_name + 'image'}
                className={clsx(
                  'object-cover',
                  size === 'lg' ? 'w-[320px] h-[320px]' : 'w-[144px] h-[144px]'
                )}
              />
            )}
          </div>
          <h3
            className={clsx(clsProductCardTitle(size), 'break-anywhere')}
            lang="es"
          >
            {style_name}
          </h3>
          <div className="flex items-center gap-2 flex-wrap">
            {(isCollection || isPdf) && (
              <ProductColors
                colour_families={colour_families || []}
                swatchImage={swatchImage?.small_image_url}
                colour_name={colour_name || ''}
                isHideLabel={false}
              />
            )}
            {!isPdf &&
              !isCollection &&
              productVariants?.map((variant: any, index: number) => (
                <VariantColors
                  key={variant?.id}
                  colors={(variant?.colour_families as string[]) || []}
                  type="card"
                  active={
                    selectedVariant === variant?.id ||
                    selectedVariants?.includes(variant?.id) ||
                    (!selectedVariants?.length &&
                      !selectedVariant &&
                      index === 0)
                  }
                  url={variant?.swatchImage?.small_image_url}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelect({
                      id,
                      selectedVariant: variant?.id,
                      isVariant: true,
                    });
                    setSelectedVariant(variant?.id);
                  }}
                />
              ))}
          </div>
          <div
            className={clsx(
              clsProductCardTags(size),
              'print:!mt-2 flex-wrap',
              size === 'lg' ? 'mt-4' : 'mt-2'
            )}
          >
            {collections?.map((collection: any) => (
              <div key={collection?.id} className="mb-1">
                <Badge size={size}>{collection?.name}</Badge>
              </div>
            ))}
          </div>
          <ListView
            label="Material"
            title={materials?.join(', ') || ''}
            size={size}
          />
          <ListView label="Category" title={third_category || ''} size={size} />
          <ListView
            label="Delivery Window"
            title={
              delivery_window_start_date && delivery_window_end_date
                ? `${moment(delivery_window_start_date)?.format(
                    'DD/MM/YYYY'
                  )} - ${moment(delivery_window_end_date)?.format(
                    'DD/MM/YYYY'
                  )}`
                : ''
            }
            size={size}
          />
          <div className={size === 'lg' ? 'mt-4' : 'mt-2'}>
            {associated_prices?.map(
              (item) =>
                (item?.landed || item?.exworks || item?.landed) > -1 && (
                  <div
                    key={item?.currency}
                    className={clsProductCardPrices(size)}
                  >
                    {item?.landed ? (
                      <>
                        <div>
                          <h5 className={clsProductCardPrice(size)}>
                            {item?.currency && currencies[item.currency]}
                            {item.landed}
                          </h5>
                          <p
                            className={clsx(
                              styles.priceLabel,
                              size === 'lg' ? 'leading-[16px]' : 'leading-[8px]'
                            )}
                          >
                            Landed
                          </p>
                        </div>
                      </>
                    ) : null}
                    {item?.exworks ? (
                      <>
                        <div>
                          <h5 className={clsProductCardPrice(size)}>
                            {item?.currency && currencies[item.currency]}
                            {item.exworks}
                          </h5>
                          <p
                            className={clsx(
                              styles.priceLabel,
                              size === 'lg' ? 'leading-[16px]' : 'leading-[8px]'
                            )}
                          >
                            Exworks
                          </p>
                        </div>
                      </>
                    ) : null}
                    {item?.retail ? (
                      <>
                        <div>
                          <h5 className={clsProductCardPrice(size)}>
                            {item?.currency && currencies[item.currency]}
                            {item.retail}
                          </h5>
                          <p
                            className={clsx(
                              styles.priceLabel,
                              size === 'lg' ? 'leading-[16px]' : 'leading-[8px]'
                            )}
                          >
                            MSRP
                          </p>
                        </div>
                      </>
                    ) : null}
                  </div>
                )
            )}
          </div>
          <ListView
            label="Sizes"
            title={size_options?.join(', ') || ''}
            size={size}
          />
          {(isPdf || isCollection) && (
            <div className={clsx(size === 'lg' ? 'mt-4' : 'mt-2')}>
              {productVariants?.map(
                (item: any) =>
                  item.id !== id && (
                    <ProductColors
                      key={item.id}
                      swatchImage={item?.swatchImage?.small_image_url}
                      colour_families={item?.colour_families || []}
                      colour_name={item?.colour_name || ''}
                    />
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ListView: FC<{
  title: string;
  label: string;
  size: 'lg' | 'sm';
  isVisible?: boolean;
}> = ({ label, title, size, isVisible }) => {
  return (
    <>
      {title && (
        <div
          className={clsx(
            !isVisible ? 'hidden print:block' : '',
            size === 'lg' ? 'mt-4' : 'mt-2'
          )}
        >
          <h5 className={clsx(clsProductCardPrice(size))}>{title}</h5>
          <p
            className={clsx(
              styles.priceLabel,
              size === 'sm' ? '!leading-[8px]' : ''
            )}
          >
            {label}
          </p>
        </div>
      )}
    </>
  );
};
