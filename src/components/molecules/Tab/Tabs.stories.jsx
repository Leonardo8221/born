import React from 'react';
import Tabs from './Tabs';

export default {
  title: 'Molecules/Tab',
  component: Tabs,
};

const Template = args => <Tabs {...args} />;

export const Primary = Template.bind ({});
Primary.args = {
  tabs: ['Draft', 'Confirmed', 'Approved', 'Cancelled'],
};
