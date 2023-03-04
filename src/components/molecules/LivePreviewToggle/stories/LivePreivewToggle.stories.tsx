import { StoryFn } from '@storybook/react';
import LivePreviewToggle, { LivePreivewToggleProps } from '..';

export default {
  title: 'Molecules/PreivewToggle',
  component: LivePreviewToggle,
};

const Template = (args: LivePreivewToggleProps) => <LivePreviewToggle {...args} />;

export const Default: StoryFn<LivePreivewToggleProps> = Template.bind ({});
Default.args = {
  showPreview: true,
};
