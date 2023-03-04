import { StoryFn } from '@storybook/react';
import React from 'react';
import Tabs, { TabsProps } from './Tabs';

export default {
  title: 'Molecules/Tab',
  component: Tabs,
};

const Template = (args: TabsProps) => <Tabs {...args} />;

export const Primary: StoryFn<TabsProps> = Template.bind ({});
Primary.args = {
  tabs: ['Draft', 'Confirmed', 'Approved', 'Cancelled'],
};
