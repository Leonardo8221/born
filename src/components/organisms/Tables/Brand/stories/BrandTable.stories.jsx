import { brands } from '../data';
import BrandTable from '..';

export default {
  title: "Organisms/Brand Directories Table",
  component: BrandTable,
};

const Template = (args) => <BrandTable {...args} />;

export const SimpleExample = Template.bind({});

SimpleExample.args = {
  brands,
};
