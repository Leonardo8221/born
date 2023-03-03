import React from 'react';
import Input from '../index';

export default {
  title: 'Molecules/Dropdown',
  component: Input,
  argTypes: {onChange: {action: 'changed'}},
};

const Template = args => <Input {...args} />;

export const Default = Template.bind ({});
Default.args = {
  label: 'Select Category',
  isValid: false,
  options: [
    {value: '0', name: 'Clothing', isDisabled: false},
    {value: '1', name: 'Option A', isDisabled: false},
    {value: '2', name: 'Option B', isDisabled: true},
    {value: '3', name: 'Option C', isDisabled: false},
  ],
};

export const Valid = Template.bind ({});
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
