import { StoryFn } from '@storybook/react';
import FileUpload from '../FileUpload';

export default {
  title: 'Organisms/Modals/FileUpload',
  component: FileUpload,
};

const Template = () => <FileUpload />;

export const Default: StoryFn = Template.bind ({});
Default.args = {};
