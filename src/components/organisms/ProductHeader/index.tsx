import React, { FC } from "react";
import { Icon } from "@/components/molecules/Icon";
import ImageText from "@/components/molecules/ImageText";
import LogoImage from "@/assets/images/logo-image.png";
import { Button } from "@/components/molecules/Button";
import clsx from "clsx";
import styles from "./ProductHeaderProps.module.css";
import Link from "next/link";

export interface ProductHeaderProps {
  srcLogo?: string;
  title?: string;
  srcBlurDataURL?: string;
  onEdit: () => void;
  onAddToCollection: () => void;
  onDraftOrder: () => void;
  containerClassName?: string;
  hrefBack?: string;
}

const ProductHeader: FC<ProductHeaderProps> = ({
  title,
  srcLogo,
  srcBlurDataURL,
  onEdit,
  onAddToCollection,
  onDraftOrder,
  hrefBack = "/",
  containerClassName,
}) => {
  return (
    <div className={clsx("w-[1300px] mx-auto", containerClassName)}>
      <div className="flex items-center">
        <Link href={hrefBack}>
          <Icon className="mt-[12px] mr-[26px]" name="icon-arrow-left" />
        </Link>
        <div className="mr-auto">
          <ImageText
            title={title || ""}
            titleClassName="text-[32px]"
            imgSrc={{
              src: srcLogo || LogoImage.src,
              height: 56,
              width: 56,
              blurDataURL: srcLogo || srcBlurDataURL || LogoImage.src,
            }}
            altText=" "
          />
        </div>
        <Button
          onClick={onEdit}
          className={styles.toolButton}
          variant="outlined"
        >
          Edit
        </Button>
        <Button
          onClick={onAddToCollection}
          className={clsx(styles.toolButton, styles.addToCollection)}
          variant="outlined"
        >
          Add to collection
        </Button>
        <Button onClick={onDraftOrder} className={styles.toolButton}>
          <Icon name="icon-add" />
          Draft order
        </Button>
      </div>
    </div>
  );
};

export default ProductHeader;
