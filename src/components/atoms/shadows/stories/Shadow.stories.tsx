import { StoryFn } from '@storybook/react';
import { Shadow } from '../Shadow';

export default {
  title: 'Atoms/Shadows',
  component: Shadow,
}

const Template = () => <Shadow />;

export const shadows: StoryFn = Template.bind({});
