import { StoryFn } from '@storybook/react';
import Dropdown, { DropdownProps } from '../index';

export default {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  argTypes: {onChange: {action: 'changed'}},
};

const Template = (args: DropdownProps) => <Dropdown {...args} />;

export const Default: StoryFn<DropdownProps> = Template.bind ({});
Default.args = {
  className: 'w-[300px]',
  label: 'Select Category',
  isValid: false,
  options: [
    {value: '0', name: 'Clothing', isDisabled: false},
    {value: '1', name: 'Option A', isDisabled: false},
    {value: '2', name: 'Option B', isDisabled: true},
    {value: '3', name: 'Option C', isDisabled: false},
  ],
};

export const Valid: StoryFn<DropdownProps> = Template.bind ({});
Valid.args = {
  label: 'Select Category',
  isValid: true,
  options: [
    {value: '0', name: 'Clothing', isDisabled: false},
    {value: '1', name: 'Option A', isDisabled: false},
    {value: '2', name: 'Option B', isDisabled: true},
    {value: '3', name: 'Option C', isDisabled: false},
  ],
};
