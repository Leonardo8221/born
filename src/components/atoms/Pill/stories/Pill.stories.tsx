import { StoryFn } from "@storybook/react";
import { Pill, PillProps } from "..";
import { PillAppearance, PillSize, PillType } from "../utils";

export default {
  title: "Atoms/Pill",
  component: Pill,
};

const Template = (args: PillProps) => <Pill {...args} />;

const argTypes = {
  type: {
    control: { type: "radio" },
    options: Object.values(PillType),
  },
  size: {
    control: { type: "radio" },
    options: Object.values(PillSize),
  },
  appearance: {
    control: { type: "radio" },
    options: Object.values(PillAppearance),
    defaultValue: PillAppearance.OUTLINED,
  },
};

export const OutlinedNotSelected: StoryFn = Template.bind({});

OutlinedNotSelected.argTypes = argTypes;
OutlinedNotSelected.args = {
  label: "All Countries",
  appearance: "outlined",
  size: "md",
  type: "inactive",
  isSelectable: false,
};

export const OutlinedSelected: StoryFn = Template.bind({});
OutlinedSelected.argTypes = argTypes;
OutlinedSelected.args = {
  label: "All Countries",
  type: "active",
  appearance: "outlined",
  size: "md",
  isSelectable: false,
};

export const FilledNotSelected: StoryFn = Template.bind({});
FilledNotSelected.argTypes = argTypes;
FilledNotSelected.args = {
  label: "All Countries",
  appearance: "filled",
  size: "md",
  type: "inactive",
  isSelectable: false,
};

export const FilledSelected: StoryFn = Template.bind({});
FilledSelected.argTypes = argTypes;
FilledSelected.args = {
  label: "All Countries",
  appearance: "filled",
  type: "active",
  size: "md",
  isSelectable: false,
};

export const OutlinedNotSelectedSmall: StoryFn = Template.bind({});

OutlinedNotSelectedSmall.argTypes = argTypes;
OutlinedNotSelectedSmall.args = {
  label: "All Countries",
  appearance: "outlined",
  size: "sm",
  type: "inactive",
  isSelectable: false,
};

export const OutlinedSelectable: StoryFn = Template.bind({});

OutlinedSelectable.argTypes = argTypes;
OutlinedSelectable.args = {
  label: "All Countries",
  appearance: "outlined",
  size: "sm",
  type: "inactive",
  isSelectable: true,
};

export const OutlinedSelectableWithIcon: StoryFn = Template.bind({});

OutlinedSelectableWithIcon.argTypes = argTypes;
OutlinedSelectableWithIcon.args = {
  label: "All Countries",
  appearance: "outlined",
  size: "sm",
  type: "active",
  isSelectable: true,
  hasIcon: true,
};
