import { orders } from '../data';
import OrderListTable, { OrderListTableProps } from '..';
import { StoryFn } from '@storybook/react';

export default {
  title: "Organisms/Order List Table",
  component: OrderListTable,
};

const Template = (args: OrderListTableProps) => <OrderListTable {...args} />;

export const SimpleExample: StoryFn<OrderListTableProps> = Template.bind({});

SimpleExample.args = {
  orders,
};
