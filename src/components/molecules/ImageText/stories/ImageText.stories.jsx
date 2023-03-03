import React from 'react';
import ImageText from '..';
import LogoImage from '../../../../assets/images/logo-image.png';
import ProductImage from '../../../../assets/images/product-image.png'

export default {
  title: 'Molecules/ImageText',
  component: ImageText,
};

const Template = args => <ImageText {...args} />;

export const Brand = Template.bind ({});
Brand.args = {
  variant: 'brand',
  imgSrc: LogoImage,
  title: 'Brand title',
  subTitle: 'Brand location',
  altText: 'Brand logo',
};

export const Product = Template.bind ({});
Product.args = {
  variant: 'product',
  imgSrc: ProductImage,
  title: 'UMI',
  subTitle: 'VEWSDE',
  altText: 'Product image',
};

export const BrandTwo = Template.bind({});
BrandTwo.args = {
  variant: 'brand-two',
  imgSrc: LogoImage,
  title: 'Brand title',
  subTitle: 'Brand location',
  altText: 'Brand two logo',
};
