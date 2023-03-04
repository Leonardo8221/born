import { StoryFn } from '@storybook/react';
import React from 'react';
import Toggle, { ToggleProps } from '../Toggle';

export default {
	title: 'Molecules/Toggle',
	component: Toggle,
	argTypes: { onChange: { action: 'changed' } },
};

const Template = (args: ToggleProps) => <Toggle {...args} />;

export const Primary: StoryFn<ToggleProps> = Template.bind({});
Primary.args = {
	currencies: ['USD', 'GBP', 'EUR'],
};
