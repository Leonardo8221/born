import React from "react";
import { Meta, StoryFn } from "@storybook/react";
import Tabs, { Tab } from "./Tabs";

export default {
  title: "Molecules/Tab",
  component: Tabs,
} as Meta;

type TabsArgs = {
  tabs: Tab[];
};

const Template: StoryFn<TabsArgs> = (args) => <Tabs {...args} />;

const TabContent: React.FC = () => {
  return <div className="text-[#000]">Tab Content</div>;
};

export const Primary = Template.bind({});
Primary.args = {
  tabs: [
    { id: 1, label: "Draft", content: <TabContent /> },
    { id: 2, label: "Confirmed" },
    { id: 3, label: "Approved" },
    { id: 4, label: "Cancelled" },
  ],
};
