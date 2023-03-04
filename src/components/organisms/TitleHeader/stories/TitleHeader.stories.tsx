import { StoryFn } from '@storybook/react';
import TitleHeader, { TitleHeaderProps } from '..';

export default {
  title: 'Organisms/Title Header',
  component: TitleHeader,
};

const Template = (args: TitleHeaderProps) => <TitleHeader {...args} />;

export const Default: StoryFn<TitleHeaderProps> = Template.bind ({});
Default.args = {
  title: 'Choose an organization type'
};

export const WithIcon: StoryFn<TitleHeaderProps> = Template.bind({});
WithIcon.args = {
  title: 'Set your notifications preferences',
  icon: 'icon-users',
  description: 'Streamline your workflows',
};
