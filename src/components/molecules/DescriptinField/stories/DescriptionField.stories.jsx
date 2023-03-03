import React from 'react';
import Input from '../DescriptionField';

export default {
	title: 'Molecules/DescriptionField',
	component: Input,
	argTypes: { onChange: { action: 'changed' }, onError: { action: 'onError' } },
};

const Template = (args) => <Input {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	value: '',
	label: 'Description',
	placeholder: 'Text here...',
};
