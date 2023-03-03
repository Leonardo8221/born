import React from 'react';
import { Icon } from '..';

export default {
  title: 'Molecules/Icon',
  component: Icon,
  argTypes: {
    variant: {
      options: ['light', 'dark'],
      control: { type: 'select' },
    },
  },
}

const Template = (args) => <Icon {...args} />;

export const arrowIconLeft = Template.bind({});
arrowIconLeft.args = {
  name: 'icon-arrow-left',
};

export const arrowIconRight = Template.bind({});
arrowIconRight.args = {
  name: 'icon-arrow-right',
};
