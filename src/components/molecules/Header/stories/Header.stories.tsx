import { StoryFn } from "@storybook/react";
import { Header, HeaderProps } from "..";

export default {
  title: "Molecules/Header (WIP)",
  component: Header,
};

const Template = (args: HeaderProps) => <Header {...args} />;

export const Header1: StoryFn<HeaderProps> = Template.bind({});

Header1.args = {
  items: [
    {
      label: "Tab Item",
      href: "#",
    },
  ],
  variant: "header1",
  rightNavNode: <div>Right Nav Node</div>,
};
