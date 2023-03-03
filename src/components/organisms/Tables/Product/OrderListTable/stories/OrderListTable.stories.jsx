import { products } from '../data';
import OrderListTable from '..';

export default {
  title: "Organisms/Product Order List Table",
  component: OrderListTable,
};

const Template = (args) => <OrderListTable {...args} />;

export const SimpleExample = Template.bind({});

SimpleExample.args = {
  products,
};
