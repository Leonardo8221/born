import { StoryFn } from '@storybook/react';
import { Logo, LogoProps } from '..';

export default {
  title: 'Atoms/Logos',
  component: Logo,
  parameters: {
    backgrounds: { default: 'gray' },
  },
}

const Template = (args: LogoProps) => <Logo {...args} />;

export const Light: StoryFn = Template.bind({});
Light.args = {
  variant: 'light',
};

export const Dark: StoryFn = Template.bind({});
Dark.args = {
  variant: 'dark',
};

export const Neutral: StoryFn = Template.bind({});
Neutral.args = {
  variant: 'neutral',
};
