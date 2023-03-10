import { StoryFn } from '@storybook/react';
import OrderListTable, { OrderDetails } from '..';
import { products } from '../data';

export default {
  title: "Organisms/Product Order List Table",
  component: OrderListTable,
};

const Template = (args: OrderDetails) => <OrderListTable {...args} />;

export const SimpleExample: StoryFn<OrderDetails> = Template.bind({});

SimpleExample.args = {
  products: [],
};
