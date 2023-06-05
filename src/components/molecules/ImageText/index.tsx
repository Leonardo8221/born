import { FC } from 'react';
import clsx from 'clsx';
import { StaticImageData } from 'next/image';
import {
  variantClasses,
  variantImageClasses,
  variantSubTitleClasses,
  variantTitleClasses,
} from './utils';
import { Checkbox } from '../Checkbox';

export interface ImageTextProps {
  variant?: 'brand' | 'product' | 'brand-two';
  title: string;
  subTitle?: string;
  imgSrc?: string;
  altText: string;
  titleClassName?: string;
  hideOverlay?: boolean;
  isSelectable?: boolean;
  onSelect?: (event: any) => void;
  isSelected?: boolean;
  deliveryLeadTime?: any;
}

const ImageText: FC<ImageTextProps> = ({
  variant = 'brand',
  title,
  subTitle,
  imgSrc,
  altText,
  titleClassName,
  hideOverlay,
  isSelectable,
  onSelect,
  isSelected,
  deliveryLeadTime,
}) => {
  const renderCheckbox = isSelectable && (
    <div className="absolute top-3 left-3">
      <Checkbox checked={isSelected} onChange={onSelect} />
    </div>
  );

  return (
    <div className={clsx(variantClasses[variant], 'relative items-center')}>
      <div
        className={clsx(
          variantImageClasses[variant],
          'relative overflow-hidden'
        )}
      >
        {renderCheckbox}
        {!hideOverlay && (
          <div className="absolute left-0 right-0 w-full h-full bg-[rgba(0,0,0,0.1)]" />
        )}
        {imgSrc && (
          <img
            src={imgSrc}
            alt={altText}
            className={clsx('object-cover', variantImageClasses[variant])}
          />
        )}
      </div>
      <div>
        <h3
          title={title}
          className={clsx(
            variantTitleClasses[variant],
            titleClassName,
            'text-shades-black tracking-[0.06em] break-anywhere'
          )}
          lang="es"
        >
          {title}
        </h3>
        {subTitle && (
          <h4
            className={clsx(
              variantSubTitleClasses[variant],
              'text-neutral-700 font-light tracking-[0.06em] break-anywhere'
            )}
            lang="es"
          >
            {subTitle}
          </h4>
        )}
        {deliveryLeadTime && (
          <h5
            className={clsx(
              'mt-1 text-neutral-700 font-light tracking-[0.06em] !text-[10px] min-w-[148px]'
            )}
          >
            {deliveryLeadTime}
          </h5>
        )}
      </div>
    </div>
  );
};

export default ImageText;
