import React from 'react';
import { ProductCard } from '..';

export default {
  title: 'Molecules/Product Card',
  component: ProductCard,
}

const Template = (args) => <ProductCard {...args} />;

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  id: '01234567',
  title: 'Medium Paved Star',
  tags: ['AW23', 'Core'],
  colors: ['#7B6A3D', '#e8a973'],
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  id: '01234567',
  title: 'Medium Paved Star',
  tags: ['AW23', 'Core'],
  colors: ['#7B6A3D'],
};

export const Selectable = Template.bind({});
Selectable.args = {
  size: 'lg',
  id: '01234567',
  title: 'Medium Paved Star',
  tags: ['AW23', 'Core'],
  colors: ['#7B6A3D', '#e8a973'],
  isSelectable: true,
};


export const SelectableSmall = Template.bind({});
SelectableSmall.args = {
  size: 'sm',
  id: '01234567',
  title: 'Medium Paved Star',
  tags: ['AW23', 'Core'],
  colors: ['#7B6A3D', '#e8a973'],
  isSelectable: true,
};
