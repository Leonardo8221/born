import { StoryFn } from '@storybook/react';
import React from 'react';
import Input, { InputProps } from '../Input';

export default {
  title: 'Molecules/Inputs',
  component: Input,
  argTypes: { onChange: { action: 'changed' }, onError: { action: 'onError' } },
};

const Template = (args: InputProps) => <Input {...args} />;

export const Default: StoryFn<InputProps> = Template.bind({});
Default.args = {
  value: '',
  label: 'Enter name',
  type: 'text',
  name: 'brand',
  isError: false,
  isValid: false,
  isRequired: false,
  placeholder: '',
  className: '',
};

export const Valid: StoryFn<InputProps> = Template.bind({});
Valid.args = {
  value: '',
  label: 'Enter name',
  type: 'text',
  name: 'brand',
  isError: false,
  isValid: true,
};

export const Errors: StoryFn<InputProps> = Template.bind({});
Errors.args = {
  value: '',
  label: 'Enter name',
  type: 'text',
  name: 'brand',
  isError: true,
  isValid: false,
};
