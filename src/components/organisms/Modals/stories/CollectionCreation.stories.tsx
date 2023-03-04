import { StoryFn } from '@storybook/react';
import CollectionCreation from '../CollectionCreation';

export default {
  title: 'Organisms/Modals/CollectionCreation',
  component: CollectionCreation,
};

const Template = () => <CollectionCreation />;

export const Default: StoryFn = Template.bind ({});
Default.args = {};
