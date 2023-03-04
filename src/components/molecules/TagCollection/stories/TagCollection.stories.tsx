import { StoryFn } from "@storybook/react";
import { TagColectionProps, TagCollection } from "..";

export default {
  title: "Molecules/Tag Collection (WIP)",
  component: TagCollection,
};

const Template = (args: TagColectionProps) => <TagCollection {...args} />;

export const With1Row: StoryFn<TagColectionProps> = Template.bind({});
With1Row.args = {
  tags: [
    {
      label: "All Countries",
      size: "default",
      type: "default",
    },
    {
      label: "Spring 2022",
      size: "default",
      type: "default",
    },
  ],
};

export const With2Rows: StoryFn<TagColectionProps> = Template.bind({});

With2Rows.args = {};
