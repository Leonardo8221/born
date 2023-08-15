import { FC, useState } from 'react';
import clsx from 'clsx';
import { StaticImageData } from 'next/image';
import { Badge } from '../../Badge';
import { Checkbox } from '../../Checkbox';
import styles from './product.module.css';
import {
  ProductVariantGraphqlDto,
  ProductWithCollectionsGraphqlDto,
} from '@/generated/types';
import {
  clsProductCard,
  clsProductCardId,
  clsProductCardPrice,
  clsProductCardPrices,
  clsProductCardTags,
  clsProductCardTitle,
  currencies,
} from './utils';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ColorVariant, { VariantColors } from '../../ColorVariant';
import moment from 'moment';

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
}) => {
  const router = useRouter();
  const [selectedVariant, setSelectedVariant] = useState<number | null>(null);

  const getSelectedVariantImageUrl = () => {
    if (selectedVariant !== null) {
      const images: any = productVariants?.filter(
        (item) =>
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
    router.query.product_id = selectedVariant || id;
    router.push(router, undefined, { shallow: true });
  }

  return (
    <div className='cursor-pointer'>
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
          <div className='flex-1' onClick={handleCardPreview}>{style_number}</div>
        </div>
        <div onClick={handleCardPreview} className={clsx(size === 'lg' ? 'pt-3' : 'pt-2')}>
          <div
            className={clsx(
              styles.productCardImageWrapper,
              'rounded-lg',
              size === 'lg' ? 'w-[320px] h-[320px]' : 'w-[144px] h-[144px]',
              isSelected ? 'border border-neutral-400 shadow-large' : 'border !border-[transparent]',
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
                  size === 'lg' ? 'w-[320px] h-[320px]' : 'w-[144px] h-[144px]',
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
            {isCollection ? (
              <ColorVariant
                colors={!!colour_families ? (colour_families as string[]) : []}
                label={colour_name || ''}
                size={size}
              />
            ) : (
              <VariantColors
                colors={!!colour_families ? (colour_families as string[]) : []}
                type="card"
                active={
                  selectedVariant ||
                  productVariants?.some((r) =>
                    selectedVariants?.includes?.(r?.id)
                  )
                    ? false
                    : true || selectedVariants?.includes(id)
                }
                onClick={(e) => {
                  e.preventDefault();
                  onSelect({
                    id,
                    selectedVariant: id,
                    isVariant: true,
                  });
                  setSelectedVariant(null);
                }}
              />
            )}
            {!isCollection &&
              productVariants?.map((variant) => (
                <VariantColors
                  key={variant?.id}
                  colors={(variant?.colour_families as string[]) || []}
                  type="card"
                  active={
                    selectedVariant === variant?.id ||
                    selectedVariants?.includes(variant?.id)
                  }
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
          <div className={clsx(clsProductCardTags(size), 'mt-4 flex-wrap')}>
            {collections?.map((collection: any) => (
              <div key={collection?.id} className="mb-1">
                <Badge size={size}>{collection?.name}</Badge>
              </div>
            ))}
          </div>
          {isCollection && (
            <ListView
              label="Available Styles"
              title={
                productVariants?.map((item) => item?.colour_name)?.join(', ') ||
                ''
              }
              size={size}
              isVisible={true}
            />
          )}
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
                          <p className={styles.priceLabel}>Landed</p>
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
                          <p className={styles.priceLabel}>Exworks</p>
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
                          <p className={styles.priceLabel}>MSRP</p>
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
          <p className={styles.priceLabel}>{label}</p>
        </div>
      )}
    </>
  );
};
