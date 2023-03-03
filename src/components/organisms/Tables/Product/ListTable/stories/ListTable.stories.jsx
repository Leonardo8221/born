import { products } from '../data';
import ListTable from '..';

export default {
  title: "Organisms/Product List Table",
  component: ListTable,
};

const Template = (args) => <ListTable {...args} />;

export const SimpleExample = Template.bind({});

SimpleExample.args = {
  products,
};
