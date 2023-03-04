import { StoryFn } from '@storybook/react';
import CollectionSelection from '../CollectionSelection';

export default {
  title: 'Organisms/Modals/CollectionSelection',
  component: CollectionSelection,
};

const Template = () => <CollectionSelection />;

export const Default: StoryFn = Template.bind ({});
Default.args = {};
