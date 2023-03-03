import React from 'react';
import Switch from '..';

export default {
  title: 'Molecules/Switch',
  component: Switch,
};

const Template = args => <Switch {...args} />;

export const Default = Template.bind ({});
Default.args = {
  label: 'New follow',
  position: 'end',
  checked: true,
};

export const PositionFirst = Template.bind({});
PositionFirst.args = {
  label: 'New follow',
  position: 'start',
  checked: true,
};
