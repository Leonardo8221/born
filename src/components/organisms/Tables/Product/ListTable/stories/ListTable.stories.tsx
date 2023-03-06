import { products } from '../data';
import ListTable, { ListTableProps } from '..';
import { StoryFn } from '@storybook/react';

export default {
  title: "Organisms/Product List Table",
  component: ListTable,
};

const Template = (args: ListTableProps) => <ListTable {...args} />;

export const SimpleExample: StoryFn<ListTableProps> = Template.bind({});

SimpleExample.args = {
  products,
};
