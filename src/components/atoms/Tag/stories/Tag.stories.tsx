import { StoryFn } from "@storybook/react";
import { Tag, TagProps } from "..";
import { TagSize, TagType } from "../utils";

export default {
  title: "Atoms/Tag",
  component: Tag,
};

const Template = (args: TagProps) => <Tag {...args} />;

const argTypes = {
  type: {
    control: { type: "radio" },
    options: Object.values(TagType),
  },
  size: {
    control: { type: "radio" },
    options: Object.values(TagSize),
  },
};

export const Default: StoryFn<TagProps> = Template.bind({});

Default.argTypes = argTypes;
Default.args = {
  label: "All Countries",
  size: TagSize.DEFAULT,
  type: TagType.DEFAULT,
};

export const Status: StoryFn<TagProps> = Template.bind({});

Status.argTypes = argTypes;
Status.args = {
  label: "Live",
  size: TagSize.WIDER,
  type: TagType.STATUS,
};
