import { StoryFn } from "@storybook/react";
import { IconButtonGroup, IconButtonGroupProps } from "..";

export default {
  title: "Molecules/Icon Button Group",
  component: IconButtonGroup,
  decorators: [
    (Story: any) => (
      <div className="flex justify-center w-full mt-2">
        <Story />
      </div>
    ),
  ],
};

const argTypes = {};

const Template = (args: IconButtonGroupProps) => <IconButtonGroup {...args} />;

export const Default: StoryFn<IconButtonGroupProps> = Template.bind({});

Default.argTypes = argTypes;
Default.args = {};
Default.parameters = {};
