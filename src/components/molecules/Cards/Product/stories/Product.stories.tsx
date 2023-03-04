import { StoryFn } from '@storybook/react';
import { ProductCard, ProductCardProps } from '..';

export default {
  title: 'Molecules/Product Card',
  component: ProductCard,
}

const Template = (args: ProductCardProps) => <ProductCard {...args} />;

export const Large: StoryFn<ProductCardProps> = Template.bind({});
Large.args = {
  size: 'lg',
  id: '01234567',
  title: 'Medium Paved Star',
  tags: ['AW23', 'Core'],
  colors: ['#7B6A3D', '#e8a973'],
  isSelectable: false,
  isSelected: false,
  prices: [
    { price: "£3,345.00", label: "Landed" },
    { price: "£3,345.00", label: "Exwork" },
    { price: "£3,345.00", label: "MSRP" },
    { price: "£3,345.00", label: "Exwork" },
    { price: "£3,345.00", label: "MSRP" },
  ],
};

export const Small: StoryFn<ProductCardProps> = Template.bind({});
Small.args = {
  size: 'sm',
  id: '01234567',
  title: 'Medium Paved Star',
  tags: ['AW23', 'Core'],
  colors: ['#7B6A3D'],
  isSelectable: false,
  isSelected: false,
  prices: [
    { price: "£3,345.00", label: "Landed" },
    { price: "£3,345.00", label: "Exwork" },
    { price: "£3,345.00", label: "MSRP" },
    { price: "£3,345.00", label: "Exwork" },
    { price: "£3,345.00", label: "MSRP" },
  ],
};

export const Selectable: StoryFn<ProductCardProps> = Template.bind({});
Selectable.args = {
  size: 'lg',
  id: '01234567',
  title: 'Medium Paved Star',
  tags: ['AW23', 'Core'],
  colors: ['#7B6A3D', '#e8a973'],
  isSelectable: true,
  isSelected: false,
  prices: [
    { price: "£3,345.00", label: "Landed" },
    { price: "£3,345.00", label: "Exwork" },
    { price: "£3,345.00", label: "MSRP" },
    { price: "£3,345.00", label: "Exwork" },
    { price: "£3,345.00", label: "MSRP" },
  ],
};


export const SelectableSmall: StoryFn<ProductCardProps> = Template.bind({});
SelectableSmall.args = {
  size: 'sm',
  id: '01234567',
  title: 'Medium Paved Star',
  tags: ['AW23', 'Core'],
  colors: ['#7B6A3D', '#e8a973'],
  isSelectable: true,
  isSelected: false,
  prices: [
    { price: "£3,345.00", label: "Landed" },
    { price: "£3,345.00", label: "Exwork" },
    { price: "£3,345.00", label: "MSRP" },
    { price: "£3,345.00", label: "Exwork" },
    { price: "£3,345.00", label: "MSRP" },
  ],
};
