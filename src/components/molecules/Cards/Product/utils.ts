import clsx from "clsx";
import styles from './product.module.css';

type Size = 'lg' | 'sm';
export const currencies: any = {
  USD: '$',
  EUR: '€',
  GBP: '£',
};

export const clsProductCard = (size: Size) => clsx({
  [styles.lgProductCard]: size === 'lg',
  [styles.smProductCard]: size === 'sm',
});

export const clsProductCardId = (size: Size) => clsx(styles.productCardId, {
  [styles.lgProductCardId]: size === 'lg',
  [styles.smProductCardId]: size === 'sm',
});
export const clsProductCardTitle = (size: Size) => clsx(styles.productCardTitle, {
  [styles.lgProductCardTitle]: size === 'lg',
  [styles.smProductCardTitle]: size === 'sm',
});

export const clsProductCardColors = (size: Size) => clsx(styles.productCardColors, {
  [styles.lgProductCardColors]: size === 'lg',
  [styles.smProductCardColors]: size === 'sm',
});

export const clsProductCardColor = (size: Size) => clsx(styles.productCardColor, {
  [styles.lgProductCardColor]: size === 'lg',
  [styles.smProductCardColor]: size === 'sm',
});

export const clsProductCardTags = (size: Size) => clsx(styles.productCardTags, {
  [styles.lgProductCardTags]: size === 'lg',
  [styles.smProductCardTags]: size === 'sm',
});

export const clsProductCardPrices = (size: Size) => clsx(styles.productCardPrices, {
  [styles.lgProductCardPrices]: size === 'lg',
  [styles.smProductCardPrices]: size === 'sm',
});

export const clsProductCardPrice = (size: Size) => clsx(styles.productCardPrice, {
  [styles.lgProductCardPrice]: size === 'lg',
  [styles.smProductCardPrice]: size === 'sm',
});
