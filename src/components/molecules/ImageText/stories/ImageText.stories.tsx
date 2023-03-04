import React from 'react';
import ImageText, { ImageTextProps } from '..';
import LogoImage from '@/assets/images/logo-image.png';
import ProductImage from '@/assets/images/product-image.png'
import { StoryFn } from '@storybook/react';

export default {
  title: 'Molecules/ImageText',
  component: ImageText,
};

const Template = (args: ImageTextProps) => <ImageText {...args} />;

export const Brand: StoryFn<ImageTextProps> = Template.bind ({});
Brand.args = {
  variant: 'brand',
  imgSrc: LogoImage,
  title: 'Brand title',
  subTitle: 'Brand location',
  altText: 'Brand logo',
};

export const Product: StoryFn<ImageTextProps> = Template.bind ({});
Product.args = {
  variant: 'product',
  imgSrc: ProductImage,
  title: 'UMI',
  subTitle: 'VEWSDE',
  altText: 'Product image',
};

export const BrandTwo: StoryFn<ImageTextProps> = Template.bind({});
BrandTwo.args = {
  variant: 'brand-two',
  imgSrc: LogoImage,
  title: 'Brand title',
  subTitle: 'Brand location',
  altText: 'Brand two logo',
};
