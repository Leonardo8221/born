import React from "react";
import clsx from "clsx";
import { Icon } from "../../Icon";

import { IconButtonSize, IconButtonColor } from "../utils";
import { IconButton, IconButtonProps } from "..";
import { StoryFn } from "@storybook/react";

export default {
  title: "Molecules/Icon Button",
  component: IconButton,
  decorators: [
    (Story: any) => (
      <div>
        <Story />
      </div>
    ),
  ],
};

const argTypes = {
  id: {
    control: { type: "text" },
    defaultValue: "",
  },
  className: {
    control: { type: "text" },
    defaultValue: "",
  },
  disabled: {
    control: { type: "boolean" },
    defaultValue: false,
  },
  size: {
    control: { type: "radio" },
    options: Object.values(IconButtonSize),
    defaultValue: IconButtonSize.SM,
  },
  color: {
    control: { type: "radio" },
    options: Object.values(IconButtonColor),
    defaultValue: IconButtonColor.WHITE,
  },
};

const Template = (args: IconButtonProps) => (
  <IconButton
    {...args}
    icon={<Icon name="icon-grid" />}
    onClick={() => console.log("onClick")}
  />
);

export const Default: StoryFn<IconButtonProps> = Template.bind({});

Default.argTypes = argTypes;
Default.args = {};
Default.parameters = {};

export const Black: StoryFn<IconButtonProps> = Template.bind({});

Black.argTypes = argTypes;
Black.args = {
  color: IconButtonColor.BLACK,
};
Black.parameters = {};

export const Medium: StoryFn<IconButtonProps> = Template.bind({});

Medium.argTypes = argTypes;
Medium.args = {
  size: IconButtonSize.MD,
};
Medium.parameters = {};
