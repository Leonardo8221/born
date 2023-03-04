import { FC } from "react";
import clsx from "clsx";
import Image, { StaticImageData } from 'next/image';
import {
  variantClasses,
  variantImageClasses,
  variantSubTitleClasses,
  variantTitleClasses
} from './utils';

export interface ImageTextProps {
  variant: 'brand' | 'product' | 'brand-two';
  title: string;
  subTitle?: string
  imgSrc: StaticImageData | string;
  altText: string;
}

const ImageText: FC<ImageTextProps> = ({
  variant = 'brand',
  title,
  subTitle,
  imgSrc,
  altText,
}) => {
  return (
    <div className={clsx(variantClasses[variant], 'items-center')}>
      <Image
        src={imgSrc}
        alt={altText}
        className={clsx('object-cover', variantImageClasses[variant])}
      />
      <div>
        <h3 className={clsx(variantTitleClasses[variant], 'text-shades-black tracking-[0.06em]')}>
          {title}
        </h3>
        {subTitle && (
          <h4 className={clsx(variantSubTitleClasses[variant], 'text-neutral-700 font-light tracking-[0.06em]')}>
            {subTitle}
          </h4>
        )}
      </div>
    </div>
  )
}

export default ImageText;
