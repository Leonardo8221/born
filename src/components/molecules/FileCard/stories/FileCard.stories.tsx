import { StoryFn } from "@storybook/react";
import { FileCard, FileCardProps } from "..";
import { Icon } from "../../Icon";

const storyParameters = {};

export default {
  title: "Molecules/File Card",
  component: FileCard,
  decorators: [
    (Story: any) => (
      <div>
        <Story />
      </div>
    ),
  ],
};

const argTypes = {
  src: {
    control: { type: "text" },
    defaultValue: "",
  },
};

const Template = (args: FileCardProps) => <FileCard {...args} />;

export const RectangleFilled: StoryFn<FileCardProps> = Template.bind({});
RectangleFilled.argTypes = argTypes;
RectangleFilled.args = {
  onClick: () => console.log("onClick"),
  src: "https://images.unsplash.com/photo-1676901594376-03912b93660e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  variant: "rectangle",
};
RectangleFilled.parameters = storyParameters;

export const RectangleNotFilled: StoryFn<FileCardProps> = Template.bind({});
RectangleNotFilled.argTypes = argTypes;
RectangleNotFilled.args = {
  onClick: () => console.log("onClick"),
  src: "",
  variant: "rectangle",
};
RectangleNotFilled.parameters = storyParameters;

export const CircleFilled: StoryFn<FileCardProps> = Template.bind({});
CircleFilled.argTypes = argTypes;
CircleFilled.args = {
  onClick: () => console.log("onClick"),
  src: "https://images.unsplash.com/photo-1676901594376-03912b93660e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
  variant: "circle",
};
CircleFilled.parameters = storyParameters;

export const CircleNotFilled: StoryFn<FileCardProps> = Template.bind({});
CircleNotFilled.argTypes = argTypes;
CircleNotFilled.args = {
  onClick: () => console.log("onClick"),
  src: "",
  variant: "circle",
};
CircleNotFilled.parameters = storyParameters;

export const CircleNotFilledWithIcon: StoryFn<FileCardProps> = Template.bind({});
CircleNotFilledWithIcon.argTypes = argTypes;
CircleNotFilledWithIcon.args = {
  onClick: () => console.log("onClick"),
  src: "",
  variant: "circle",
  icon: <Icon name="icon-file-upload" />,
};
CircleNotFilledWithIcon.parameters = storyParameters;
