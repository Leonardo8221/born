import React from 'react';
import TitleHeader from '..';

export default {
  title: 'Organisms/Title Header',
  component: TitleHeader,
};

const Template = args => <TitleHeader {...args} />;

export const Default = Template.bind ({});
Default.args = {
  title: 'Choose an organization type'
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  title: 'Set your notifications preferences',
  icon: 'icon-users',
  description: 'Streamline your workflows',
};
