import { StoryFn } from "@storybook/react";

import { Button, ButtonProps } from "..";

export default {
  title: "Molecules/Button",
  component: Button,
  parameters: {
    backgrounds: { default: "gray" },
  },
};

const Template = (args: ButtonProps) => <Button {...args}>Button !</Button>;

export const Black: StoryFn<ButtonProps> = Template.bind({});
Black.args = {
  color: "black",
};

export const White: StoryFn<ButtonProps> = Template.bind({});
White.args = {
  color: "white",
};

export const Accent: StoryFn<ButtonProps> = Template.bind({});
Accent.args = {
  color: "accent",
};

export const Neutral: StoryFn<ButtonProps> = Template.bind({});
Neutral.args = {
  color: "neutral",
};

export const Small: StoryFn<ButtonProps> = Template.bind({});
Small.args = {
  size: "sm",
};

export const Medium: StoryFn<ButtonProps> = Template.bind({});
Medium.args = {
  size: "md",
};

export const Large: StoryFn<ButtonProps> = Template.bind({});
Large.args = {
  size: "lg",
};

export const Rounded: StoryFn<ButtonProps> = Template.bind({});
Rounded.args = {
  rounded: true,
};

export const OutlinedBlack: StoryFn<ButtonProps> = Template.bind({});
OutlinedBlack.args = {
  color: "black",
  variant: "outlined",
};
