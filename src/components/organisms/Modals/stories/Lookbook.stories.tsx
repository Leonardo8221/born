import { StoryFn } from '@storybook/react';
import Lookbook from '../Lookbook';

export default {
  title: 'Organisms/Modals/Lookbook',
  component: Lookbook,
};

const Template = () => <Lookbook />;

export const Default: StoryFn = Template.bind ({});
Default.args = {};
