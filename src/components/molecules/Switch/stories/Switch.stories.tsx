import { StoryFn } from '@storybook/react';
import React from 'react';
import Switch, { SwitchProps } from '..';

export default {
  title: 'Molecules/Switch',
  component: Switch,
};

const Template = (args: SwitchProps) => <Switch {...args} />;

export const Default: StoryFn<SwitchProps> = Template.bind ({});
Default.args = {
  label: 'New follow',
  position: 'end',
  checked: true,
};

export const PositionFirst: StoryFn<SwitchProps> = Template.bind({});
PositionFirst.args = {
  label: 'New follow',
  position: 'start',
  checked: true,
};
