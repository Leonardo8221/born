import React from "react";

import { DropdownMenu } from "..";

export default {
  title: "Molecules/Dropdown Menu",
  component: DropdownMenu,
  decorators: [
    (Story) => (
      <div className="w-screen h-screen bg-neutral-200">
        <div className="flex items-center justify-center pt-4">
          <Story />
        </div>
      </div>
    ),
  ],
};

const Template = (args) => <DropdownMenu {...args} />;

export const Default = Template.bind({});
Default.args = {
  avatarSrc:
    "https://media.istockphoto.com/id/1311467082/photo/head-shot-profile-of-a-young-puppy-beagles-dog-isolated.jpg?b=1&s=170667a&w=0&k=20&c=fKep3SwEMunVucpp7cfyPJ_LPXlRuUG6fOZQEWDSBpg=",
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

export const MoreDropdowns = Template.bind({});
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

export const ButtonDropdown = Template.bind({});
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
