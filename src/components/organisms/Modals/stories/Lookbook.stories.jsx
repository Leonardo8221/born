import React from 'react';
import Lookbook from '../Lookbook';

export default {
  title: 'Organisms/Modals/Lookbook',
  component: Lookbook,
};

const Template = args => <Lookbook {...args} />;

export const Default = Template.bind ({});
Default.args = {};
