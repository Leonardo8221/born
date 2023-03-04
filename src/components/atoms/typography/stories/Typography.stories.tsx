import { StoryFn } from '@storybook/react';
import React from 'react';
import { Typography } from './Typography';

export default {
  title: 'Atoms/Typography',
  component: Typography,
}

const Template = () => <Typography />;

export const typography: StoryFn = Template.bind({});
typography.parameters = {
  options: { showPanel: false },
};
