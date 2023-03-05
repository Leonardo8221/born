import { FC } from "react";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import { Badge } from "../../Badge";
import { Checkbox } from "../../Checkbox";
import styles from "./product.module.css";

type Price = {
  price: string;
  label: string;
}

type Color = {
  label: string;
  value: string;
}

export interface ProductCardProps {
  size?: 'lg' | 'sm';
  id: string;
  title: string,
  imageUrl: StaticImageData | string;
  tags: string[];
  colors: Color[];
  isSelectable?: boolean;
  isSelected?: boolean;
  onSelect?: () => void,
  prices: Price[];
};

export const ProductCard: FC<ProductCardProps> = ({
  size = 'lg',
  id,
  title,
  imageUrl,
  tags,
  colors,
  isSelectable,
  isSelected,
  onSelect = () => {},
  prices,
}) => {
  const renderCheckbox = isSelectable && (
    <div className={styles.productCardCheckbox}>
      <Checkbox checked={isSelected} onChange={onSelect} />
    </div>
  );

  const clsProductCard = clsx({
    [styles.lgProductCard]: size === "lg",
    [styles.smProductCard]: size === "sm",
  });

  const clsProductCardId = clsx(styles.productCardId, {
    [styles.lgProductCardId]: size === "lg",
    [styles.smProductCardId]: size === "sm",
  });
  const clsProductCardTitle = clsx(styles.productCardTitle, {
    [styles.lgProductCardTitle]: size === "lg",
    [styles.smProductCardTitle]: size === "sm",
  });

  const clsProductCardColors = clsx(styles.productCardColors, {
    [styles.lgProductCardColors]: size === "lg",
    [styles.smProductCardColors]: size === "sm",
  });

  const clsProductCardColor = clsx(styles.productCardColor, {
    [styles.lgProductCardColor]: size === "lg",
    [styles.smProductCardColor]: size === "sm",
  });

  const clsProductCardTags = clsx(styles.productCardTags, {
    [styles.lgProductCardTags]: size === "lg",
    [styles.smProductCardTags]: size === "sm",
  });

  const clsProductCardPrices = clsx(styles.productCardPrices, {
    [styles.lgProductCardPrices]: size === "lg",
    [styles.smProductCardPrices]: size === "sm",
  });

  const clsProductCardPrice = clsx(styles.productCardPrice, {
    [styles.lgProductCardPrice]: size === "lg",
    [styles.smProductCardPrice]: size === "sm",
  });

  return (
    <div className={clsProductCard}>
      <div className={clsProductCardId}>{id}</div>
      <div>
        <div className={styles.productCardImageWrapper}>
          <Image
            src={imageUrl}
            alt={title + 'image'}
            className={styles.productCardImage}
          />
          {renderCheckbox}
        </div>
        <h3 className={clsProductCardTitle}>{title}</h3>
        <div className={clsProductCardColors}>
          {colors?.map((color: Color) => (
            <div
              key={color.value}
              className={clsProductCardColor}
              style={color ? { backgroundColor: color.value } : {}}
            />
          ))}
        </div>
        <div className={clsProductCardTags}>
          {tags?.map((tag) => (
            <Badge key={tag} size={size}>
              {tag}
            </Badge>
          ))}
        </div>
        <div className={clsProductCardPrices}>
          {prices?.map((price, index) => (
            <div key={index}>
              <h5 className={clsProductCardPrice}>{price.price}</h5>
              <p className={styles.priceLabel}>{price.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
