import React from 'react';
import { PropTypes } from 'prop-types';
import clsx from "clsx";
import Image from 'next/image';
import {
  variantClasses,
  variantImageClasses,
  variantSubTitleClasses,
  variantTitleClasses
} from './utils';

const ImageText = ({
  variant = 'brand',
  title,
  subTitle,
  imgSrc,
  altText,
}) => {
  return (
    <div className={clsx(variantClasses[variant], 'items-center')}>
      <Image src={imgSrc} alt={altText} className={clsx('object-cover', variantImageClasses[variant])} />
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

ImageText.propTypes = {
  variant: PropTypes.oneOf(['brand', 'product', 'brand-two']),
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  imgSrc: PropTypes.string,
  altText: PropTypes.string,
}

export default ImageText;
