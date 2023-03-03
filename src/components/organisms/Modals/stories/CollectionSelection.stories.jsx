import React from 'react';
import CollectionSelection from '../CollectionSelection';

export default {
  title: 'Organisms/Modals/CollectionSelection',
  component: CollectionSelection,
};

const Template = args => <CollectionSelection {...args} />;

export const Default = Template.bind ({});
Default.args = {};
