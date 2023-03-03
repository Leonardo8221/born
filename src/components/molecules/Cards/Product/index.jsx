import React from "react";
import clsx from "clsx";
import Image from "next/image";
import PropTypes from "prop-types";
import productImage from "@/assets/images/product.png";
import { Badge } from "../../Badge";
import { Checkbox } from "../../Checkbox";
import styles from "./product.module.css";

export const ProductCard = ({
  size,
  id,
  title,
  tags,
  colors,
  isSelectable,
  isSelected,
  onSelect,
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
            src={productImage}
            alt={title}
            className={styles.productCardImage}
          />
          {renderCheckbox}
        </div>
        <h3 className={clsProductCardTitle}>{title}</h3>
        <div className={clsProductCardColors}>
          {colors?.map((color) => (
            <div
              className={clsProductCardColor}
              style={color && { backgroundColor: color }}
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

ProductCard.propTypes = {
  size: PropTypes.oneOf(["lg", "sm"]),
  id: PropTypes.string,
  title: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  colors: PropTypes.arrayOf(PropTypes.string),
  isSelectable: PropTypes.bool,
  isSelected: PropTypes.bool,
  onSelect: PropTypes.func,
  prices: PropTypes.arrayOf(
    PropTypes.shape({
      price: PropTypes.string,
      title: PropTypes.string,
    })
  ),
};

ProductCard.defaultProps = {
  size: "lg",
  id: "01234567",
  title: "Medium Paved Star",
  tags: ["AW23", "Core"],
  colors: ["#7B6A3D", "#e8a973"],
  isSelectable: false,
  isSelected: false,
  prices: [
    { price: "£3,345.00", label: "Landed" },
    { price: "£3,345.00", label: "Exwork" },
    { price: "£3,345.00", label: "MSRP" },
    { price: "£3,345.00", label: "Exwork" },
    { price: "£3,345.00", label: "MSRP" },
  ],
};
