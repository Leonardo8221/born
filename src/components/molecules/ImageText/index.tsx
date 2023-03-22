import { FC } from "react";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import {
  variantClasses,
  variantImageClasses,
  variantSubTitleClasses,
  variantTitleClasses,
} from "./utils";

export interface ImageTextProps {
  variant?: "brand" | "product" | "brand-two";
  title: string;
  subTitle?: string;
  imgSrc: StaticImageData | string;
  altText: string;
  titleClassName?: string;
}

const ImageText: FC<ImageTextProps> = ({
  variant = "brand",
  title,
  subTitle,
  imgSrc,
  altText,
  titleClassName,
}) => {
  return (
    <div className={clsx(variantClasses[variant], "relative items-center")}>
      <div className={clsx(variantImageClasses[variant], 'relative')}>
        <div className="absolute left-0 right-0 w-full h-full bg-[rgba(0,0,0,0.1)]" />
        {
          imgSrc && (
            <img
              src={typeof imgSrc === 'string' ? imgSrc : imgSrc.src}
              alt={altText}
              className={clsx("object-cover", variantImageClasses[variant])}
            />
          )
        }
      </div>
      <div>
        <h3
          title={title}
          className={clsx(
            variantTitleClasses[variant],
            titleClassName,
            "text-shades-black tracking-[0.06em]"
          )}
        >
          {title}
        </h3>
        {subTitle && (
          <h4
            className={clsx(
              variantSubTitleClasses[variant],
              "text-neutral-700 font-light tracking-[0.06em]"
            )}
          >
            {subTitle}
          </h4>
        )}
      </div>
    </div>
  );
};

export default ImageText;
