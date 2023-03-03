import React from 'react';
import LivePreviewToggle from '..';

export default {
  title: 'Molecules/PreivewToggle',
  component: LivePreviewToggle,
};

const Template = args => <LivePreviewToggle {...args} />;

export const Default = Template.bind ({});
Default.args = {
  isToggle: true,
};
