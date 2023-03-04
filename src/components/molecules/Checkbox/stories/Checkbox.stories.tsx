import { StoryFn } from '@storybook/react';
import { Checkbox, CheckboxProps } from '..';

export default {
  title: 'Molecules/Checkbox',
  component: Checkbox,
};

const Template = (args: CheckboxProps) => <Checkbox {...args} />;

export const IconFirst: StoryFn<CheckboxProps> = Template.bind ({});
IconFirst.args = {
  label: 'Shoes',
  iconFirst: true,
  checked: false,
};

export const IconLast: StoryFn<CheckboxProps> = Template.bind({});
IconLast.args = {
  label: 'Shoes',
  iconFirst: false,
  checked: true,
};
