import React from 'react';
import { StoryFn } from '@storybook/react';
import Underline, { UnderLineInputProps } from '../Underline';

export default {
  title: 'Molecules/Underline',
  component: Underline,
  argTypes: {onChange: {action: 'changed'}, onError: {action: 'onError'}},
};

const Template = (args: UnderLineInputProps) => <Underline {...args} />;

export const Default: StoryFn<UnderLineInputProps> = Template.bind ({});
Default.args = {
  value: '',
  label: 'Company name',
  type: 'text',
  name: 'company',
  isActive: false,
};

export const Active: StoryFn<UnderLineInputProps> = Template.bind ({});
Active.args = {
  value: 'SuperBrand',
  label: 'Company name',
  type: 'text',
  name: 'company',
  isActive: true,
};
