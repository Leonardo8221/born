import React from 'react';
import { Checkbox } from '..';

export default {
  title: 'Molecules/Checkbox',
  component: Checkbox,
};

const Template = args => <Checkbox {...args} />;

export const IconFirst = Template.bind ({});
IconFirst.args = {
  label: 'Shoes',
  iconFirst: true,
  checked: false,
};

export const IconLast = Template.bind({});
IconLast.args = {
  label: 'Shoes',
  iconFirst: false,
  checked: true,
};
