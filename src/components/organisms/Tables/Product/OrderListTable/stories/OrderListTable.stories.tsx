import { StoryFn } from '@storybook/react';
import OrderListTable, { OrderListTableProps } from '..';
import { products } from '../data';

export default {
  title: "Organisms/Product Order List Table",
  component: OrderListTable,
};

const Template = (args: OrderListTableProps) => <OrderListTable {...args} />;

export const SimpleExample: StoryFn<OrderListTableProps> = Template.bind({});

SimpleExample.args = {
  products,
};
