import { TagCollection } from "..";

export default {
  title: "Molecules/Tag Collection (WIP)",
  component: TagCollection,
};

const Template = (args) => <TagCollection {...args} />;

export const With1Row = Template.bind({});

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

export const With2Rows = Template.bind({});

With2Rows.args = {};
