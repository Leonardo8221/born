import React from 'react';
import CollectionCreation from '../CollectionCreation';

export default {
  title: 'Organisms/Modals/CollectionCreation',
  component: CollectionCreation,
};

const Template = args => <CollectionCreation {...args} />;

export const Default = Template.bind ({});
Default.args = {};
