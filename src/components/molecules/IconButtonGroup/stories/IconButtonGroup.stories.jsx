import React from "react";
import { IconButtonGroup } from "..";

export default {
  title: "Molecules/Icon Button Group",
  component: IconButtonGroup,
  decorators: [
    (Story) => (
      <div className="flex justify-center w-full mt-2">
        <Story />
      </div>
    ),
  ],
};

const argTypes = {};

const Template = (args) => <IconButtonGroup {...args} />;

export const Default = Template.bind({});

Default.argTypes = argTypes;
Default.args = {};
Default.parameters = {};