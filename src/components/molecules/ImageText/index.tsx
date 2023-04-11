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
  imgSrc: StaticImageData | string;
  altText: string;
  titleClassName?: string;
  hideOverlay?: boolean;
  isSelectable?: boolean;
  onSelect?: (event: any) => void;
  isSelected?: boolean;
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
            src={typeof imgSrc === 'string' ? imgSrc : imgSrc.src}
            alt={altText}
            className={clsx('object-contain', variantImageClasses[variant])}
          />
        )}
      </div>
      <div>
        <h3
          title={title}
          className={clsx(
            variantTitleClasses[variant],
            titleClassName,
            'text-shades-black tracking-[0.06em]'
          )}
        >
          {title}
        </h3>
        {subTitle && (
          <h4
            className={clsx(
              variantSubTitleClasses[variant],
              'text-neutral-700 font-light tracking-[0.06em]'
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
