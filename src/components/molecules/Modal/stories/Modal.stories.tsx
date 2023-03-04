import { StoryFn } from '@storybook/react';
import Modal, { ModalProps } from '..';

export default {
  title: 'Molecules/Modal',
  component: Modal,
};

const Template = (args: ModalProps) => <Modal {...args} />;

export const Default: StoryFn<ModalProps> = Template.bind ({});
Default.args = {
  title: 'Modal Title',
  isOpen: true,
  children: "Modal content will go here!"
};
