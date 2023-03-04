import { StoryFn } from "@storybook/react";
import React from "react";

import { DropdownMenu, DropdownMenuProps } from "..";

export default {
  title: "Molecules/Dropdown Menu",
  component: DropdownMenu,
  decorators: [
    (Story: any) => (
      <div className="w-screen h-screen bg-neutral-200">
        <div className="flex items-center justify-center pt-4">
          <Story />
        </div>
      </div>
    ),
  ],
};

const Template = (args: DropdownMenuProps) => <DropdownMenu {...args} />;

export const Default: StoryFn<DropdownMenuProps> = Template.bind({});
Default.args = {
  avatarSrc:
    "https://images.unsplash.com/photo-1561037404-61cd46aa615b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80",
  altText: "dog",
  options: [
    {
      label: "Manage Role",
      value: "manage-role",
      action: () => console.log("Manage Role"),
    },
    {
      label: "Revoke Access",
      value: "revoke-access",
      action: () => console.log("Revoke Access"),
    },
    {
      label: "More options",
      value: "more-options",
      action: () => console.log("More options"),
    },
  ],
};

export const MoreDropdowns: StoryFn<DropdownMenuProps> = Template.bind({});
MoreDropdowns.args = {
  variant: 'dots',
  options: [
    {
      label: "Manage Role",
      value: "manage-role",
      action: () => console.log("Manage Role"),
    },
    {
      label: "Revoke Access",
      value: "revoke-access",
      action: () => console.log("Revoke Access"),
    },
    {
      label: "More options",
      value: "more-options",
      action: () => console.log("More options"),
    },
  ],
}

export const ButtonDropdown: StoryFn<DropdownMenuProps> = Template.bind({});
ButtonDropdown.args = {
  variant: 'button',
  label: 'Button',
  buttonProps: {
    size: 'lg',
    className: '!px-[34px]'
  },
  options: [
    {
      label: "Manage Role",
      value: "manage-role",
      action: () => console.log("Manage Role"),
    },
    {
      label: "Revoke Access",
      value: "revoke-access",
      action: () => console.log("Revoke Access"),
    },
    {
      label: "More options",
      value: "more-options",
      action: () => console.log("More options"),
    },
  ],
}
