import { FC } from "react";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import { fonts } from "@/config/fonts";
import styles from "./CollectionCard.module.css";
import { Button } from "../Button";

export interface CollectionCardProps {
  backgroundImageSrc: StaticImageData;
  imageSrc?: StaticImageData;
  label?: string;
  author?: string;
  headerText?: string;
  size?: 'lg';
  hasOverlay?: boolean;
  editBanner?: boolean;
  onEdit?: (event: any) => void;
  cardClasses?: string;
}

const clsVariations = {
  lg: {
    cardSize: "w-full max-w-[1120px] h-[436px]",
    innerImageSize: "w-[92px] h-[92px]",
    clsLabel: clsx(
      fonts.text["2xl"],
      fonts.fontWeights.regular,
      "text-shades-white max-w-[105px] text-center"
    ),
    clsHeaderText: clsx(
      fonts.fontWeights.light,

      "text-[18px] text-shades-black text-center leading-[32px] pt-8 max-w-[544px]"
    ),
    clsAuthor: clsx(
      fonts.fontWeights.light,
      fonts.text.lg,
      "text-shades-white text-center max-w-[115px]"
    ),
    clsOverlay: clsx("h-full w-full z-[2] absolute top-0", styles.overlay),
  },
};

const arrowIcon = (
  <svg
    width="8"
    height="16"
    viewBox="0 0 8 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 15L6.33062 8.78095C6.71581 8.33156 6.71581 7.66844 6.33062 7.21905L1 1"
      stroke="#F8F8F8"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
);

export const CollectionCard: FC<CollectionCardProps> = ({
  backgroundImageSrc,
  imageSrc,
  label,
  author,
  headerText = "",
  size = "lg",
  hasOverlay = false,
  editBanner,
  onEdit,
  cardClasses,
}) => {
  return (
    <div className="m-5 flex flex-col items-center">
      <div
        className={clsx(
          clsVariations[size].cardSize,
          "relative rounded-[4px] relative flex flex-col items-center justify-start cursor-pointer",
          cardClasses
        )}
      >
        {hasOverlay && (
          <div className="absolute w-[662px] left-0 h-full z-[4]">
            <div className={clsVariations[size].clsOverlay}></div>
            <div
              className={clsx(
                "h-10 w-10 rounded-[100px] border text-neutral-100 z-[5] absolute right-8 top-0 bottom-0 my-auto border-neutral-100 flex items-center justify-center",
                styles.arrowButton
              )}
            >
              {arrowIcon}
            </div>
          </div>
        )}
        <Image
          src={backgroundImageSrc}
          alt="Collection Card Background"
          className="absolute w-full h-full object-cover z-[0] rounded"
        />
        <div className={styles.cardBackground}></div>

        {imageSrc && (
            <div
              className={clsx(
                clsVariations[size].innerImageSize,
                "rounded-md bg-neutral-100 relative mt-[66px] border border-neutral-200"
              )}
            >
              <Image
                src={imageSrc}
                alt="Collection Card"
                className="absolute w-full h-full object-contain p-1"
              />
          </div>
        )}
        {label && (
          <p className={clsx("z-[1] pt-2", clsVariations[size].clsLabel)}>
            {label}
          </p>
        )}

        {!!author && (
          <div className={clsx("z-[1]", clsVariations[size].clsAuthor)}>
            {author}
          </div>
        )}
        {editBanner && (
          <Button
            color="white"
            size="sm"
            className="absolute !max-w-[104px] right-4 bottom-4 text-[12px] leading-[16px]"
            onClick={onEdit}
          >
            Edit banner
          </Button>
        )}
      </div>
      {!!headerText && (
        <p className={clsVariations[size].clsHeaderText}>{headerText}</p>
      )}
    </div>
  );
};
