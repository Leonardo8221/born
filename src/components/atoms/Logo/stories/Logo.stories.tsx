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

export const light: StoryFn = Template.bind({});
light.args = {
  variant: 'light',
};

export const dark: StoryFn = Template.bind({});
dark.args = {
  variant: 'dark',
};

export const neutral: StoryFn = Template.bind({});
neutral.args = {
  variant: 'neutral',
};
