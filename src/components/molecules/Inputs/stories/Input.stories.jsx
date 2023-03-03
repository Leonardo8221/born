import React from 'react';
import Input from '../Input';

export default {
  title: 'Molecules/Inputs',
  component: Input,
  argTypes: {onChange: {action: 'changed'}, onError: {action: 'onError'}},
};

const Template = args => <Input {...args} />;

export const Default = Template.bind ({});
Default.args = {
  value: '',
  label: 'Enter name',
  type: 'text',
  name: 'brand',
  isError: false,
  isValid: false,
};

export const Valid = Template.bind ({});
Valid.args = {
  value: '',
  label: 'Enter name',
  type: 'text',
  name: 'brand',
  isError: false,
  isValid: true,
};

export const Errors = Template.bind ({});
Errors.args = {
  value: '',
  label: 'Enter name',
  type: 'text',
  name: 'brand',
  isError: true,
  isValid: false,
};
