import { StoryFn } from "@storybook/react";
import { Avatar, AvatarProps } from "..";

export default {
  title: "Atoms/Avatar",
  component: Avatar,
};

const Template = (args: AvatarProps) => <Avatar {...args} />;

export const NoPicture: StoryFn = Template.bind({});
NoPicture.args = {
  imageSrc: "",
};

export const WithPicture: StoryFn = Template.bind({});
WithPicture.args = {
  imageSrc:
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3570&q=80",
  altText: "profile",
};
