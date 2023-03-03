import { StoryFn } from '@storybook/react';
import { Colors } from './Colors';

export default {
  title: 'Atoms/Color',
  component: Colors,
};

const Template = () => <Colors />;

export const colors: StoryFn = Template.bind({});
colors.parameters = {
  options: { showPanel: false },
};
