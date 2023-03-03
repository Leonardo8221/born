import { StoryFn } from '@storybook/react';
import { TotalQuantity, TotalQuantityProps } from './TotalQuantity';

export default {
  title: 'Atoms/TotalQuantity',
  component: TotalQuantity,
};

const Template = (args: TotalQuantityProps) => <TotalQuantity {...args} />;

export const Primary: StoryFn<TotalQuantityProps> = Template.bind ({});
Primary.args = {
  title: 'TotalQuantity',
  value: 30,
};
