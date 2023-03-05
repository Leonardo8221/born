import { brands } from '../data';
import BrandTable, { BrandTableProps } from '..';
import { StoryFn } from '@storybook/react';

export default {
  title: "Organisms/Brand Directories Table",
  component: BrandTable,
};

const Template = (args: BrandTableProps) => <BrandTable {...args} />;

export const SimpleExample: StoryFn<BrandTableProps> = Template.bind({});

SimpleExample.args = {
  brands,
};
