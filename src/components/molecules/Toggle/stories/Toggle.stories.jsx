import React from 'react';
import Toggle from '../Toggle';

export default {
	title: 'Molecules/Toggle',
	component: Toggle,
	argTypes: { onChange: { action: 'changed' } },
};

const Template = (args) => <Toggle {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	currencies: ['USD', 'GBP', 'EUR'],
};
