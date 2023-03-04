import { StoryFn } from '@storybook/react';
import { Badge, BadgeProps } from '..';

export default {
  title: 'Molecules/Badges',
  component: Badge,
  parameters: {
    backgrounds: { default: 'gray' },
  },
}

const Template = (args: BadgeProps) => <Badge {...args}>Badge</Badge>;

export const Default: StoryFn<BadgeProps> = Template.bind({});
Default.args = {
  size: 'lg',
};

export const Small: StoryFn<BadgeProps> = Template.bind({});
Small.args = {
  size: 'sm'
};

export const Medium: StoryFn<BadgeProps> = Template.bind({});
Medium.args = {
  size: 'xl'
};
