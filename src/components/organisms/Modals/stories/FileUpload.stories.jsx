import React from 'react';
import FileUpload from '../FileUpload';

export default {
  title: 'Organisms/Modals/FileUpload',
  component: FileUpload,
};

const Template = args => <FileUpload {...args} />;

export const Default = Template.bind ({});
Default.args = {};
