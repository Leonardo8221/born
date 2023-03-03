import React from 'react';
import Modal from '..';

export default {
  title: 'Molecules/Modal',
  component: Modal,
};

const Template = args => <Modal {...args} />;

export const Default = Template.bind ({});
Default.args = {
  title: 'Modal Title',
  isOpen: true,
  children: "Modal content will go here!"
};
