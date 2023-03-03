import React from 'react';
import Underline from '../Underline';

export default {
  title: 'Molecules/Underline',
  component: Underline,
  argTypes: {onChange: {action: 'changed'}, onError: {action: 'onError'}},
};

const Template = args => <Underline {...args} />;

export const Default = Template.bind ({});
Default.args = {
  value: '',
  label: 'Company name',
  type: 'text',
  name: 'company',
  isActive: false,
};

export const Active = Template.bind ({});
Active.args = {
  value: 'SuperBrand',
  label: 'Company name',
  type: 'text',
  name: 'company',
  isActive: true,
};
