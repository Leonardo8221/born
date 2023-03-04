import { StoryFn } from '@storybook/react';
import React from 'react';
import { Icon, IconProps } from '..';

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

const Template = (args: IconProps) => <Icon {...args} />;

export const ArrowIconLeft: StoryFn<IconProps> = Template.bind({});
ArrowIconLeft.args = {
  name: 'icon-arrow-left',
};

export const ArrowIconRight: StoryFn<IconProps> = Template.bind({});
ArrowIconRight.args = {
  name: 'icon-arrow-right',
};
