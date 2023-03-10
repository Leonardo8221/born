import { StoryFn } from '@storybook/react';
import DescriptionField, { DescriptionFieldProps } from '../DescriptionField';

export default {
  title: 'Molecules/DescriptionField',
  component: DescriptionField,
  argTypes: {
    onChange: { action: 'changed' },
    onError: { action: 'onError' },
  },
};

const Template = (args: DescriptionFieldProps) => (
  <DescriptionField {...args} />
);

export const Primary: StoryFn<DescriptionFieldProps> = Template.bind({});
Primary.args = {
  value: '',
  label: 'Description',
  placeholder: 'Text here...',
  isError: false,
};
