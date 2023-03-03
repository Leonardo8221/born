import React from "react";

import { Button } from "..";

export default {
  title: "Molecules/Button",
  component: Button,
  parameters: {
    backgrounds: { default: "gray" },
  },
};

const Template = (args) => <Button {...args}>Button !</Button>;

export const Black = Template.bind({});
Black.args = {
  color: "black",
};

export const White = Template.bind({});
White.args = {
  color: "white",
};

export const Accent = Template.bind({});
Accent.args = {
  color: "accent",
};

export const Neutral = Template.bind({});
Neutral.args = {
  color: "neutral",
};

export const Small = Template.bind({});
Small.args = {
  size: "sm",
};

export const Medium = Template.bind({});
Medium.args = {
  size: "md",
};

export const Large = Template.bind({});
Large.args = {
  size: "lg",
};

export const Rounded = Template.bind({});
Rounded.args = {
  rounded: true,
};

export const OutlinedBlack = Template.bind({});
OutlinedBlack.args = {
  color: "black",
  variant: "outlined",
};
