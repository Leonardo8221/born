import { FC } from 'react';
import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';
import { Badge } from '../../Badge';
import { Checkbox } from '../../Checkbox';
import styles from './product.module.css';
import { ProductGraphqlDto } from '@/generated/types';
import {
  clsProductCard,
  clsProductCardColor,
  clsProductCardColors,
  clsProductCardId,
  clsProductCardPrice,
  clsProductCardPrices,
  clsProductCardTags,
  clsProductCardTitle,
  currencies,
} from './utils';

export interface ProductCardProps extends ProductGraphqlDto {
  size?: 'lg' | 'sm';
  imageUrl?: StaticImageData | string;
  isSelectable?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
}

export const ProductCard: FC<ProductCardProps> = ({
  size = 'lg',
  product_id,
  style_name,
  imageUrl,
  isSelectable,
  isSelected,
  onSelect = () => {},
  associated_prices,
  colour_families,
  collections
}) => {
  const renderCheckbox = isSelectable && (
    <div className={styles.productCardCheckbox}>
      <Checkbox checked={isSelected} onChange={onSelect} />
    </div>
  );

  return (
    <div className={clsProductCard(size)}>
      <div
        className={clsx(
          clsProductCardId(size),
          'whitespace-nowrap text-ellipsis overflow-hidden'
        )}
      >
        {product_id}
      </div>
      <div>
        <div className={styles.productCardImageWrapper}>
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={style_name + 'image'}
              className={clsx(styles.productCardImage, 'rounded-lg')}
            />
          )}
          {renderCheckbox}
        </div>
        <h3 className={clsProductCardTitle(size)}>{style_name}</h3>
        <div className={clsProductCardColors(size)}>
          {colour_families?.map((color) => (
            <div
              key={color}
              className={clsProductCardColor(size)}
              style={color ? { backgroundColor: color } : {}}
            />
          ))}
        </div>
        <div className={clsProductCardTags(size)}>
          {collections?.map((collection) => (
            <Badge key={collection?.id} size={size}>
              {collection?.name}
            </Badge>
          ))}
        </div>
        {associated_prices?.map(
          (item) =>
            item?.currency &&
            (item?.landed || item.exworks || item.landed) && (
              <div key={item?.currency} className={clsProductCardPrices(size)}>
                {item?.landed && (
                  <>
                    <div>
                      <h5 className={clsProductCardPrice(size)}>
                        {item?.currency && currencies[item.currency]}
                        {item.landed}
                      </h5>
                      <p className={styles.priceLabel}>Landed</p>
                    </div>
                  </>
                )}
                {item?.exworks && (
                  <>
                    <div>
                      <h5 className={clsProductCardPrice(size)}>
                        {item?.currency && currencies[item.currency]}
                        {item.exworks}
                      </h5>
                      <p className={styles.priceLabel}>Exworks</p>
                    </div>
                  </>
                )}
                {item?.retail && (
                  <>
                    <div>
                      <h5 className={clsProductCardPrice(size)}>
                        {item?.currency && currencies[item.currency]}
                        {item.retail}
                      </h5>
                      <p className={styles.priceLabel}>Retail</p>
                    </div>
                  </>
                )}
              </div>
            )
        )}
      </div>
    </div>
  );
};
