/* eslint-disable no-unused-vars */
import React from "react";
import { useArgs } from "@storybook/client-api";
import { SearchInput } from "..";

export default {
  title: "Molecules/Search Input",
  component: SearchInput,
};

const argTypes = {
  value: {
    control: { type: "text" },
    defaultValue: "",
  },
  placeholder: {
    control: { type: "text" },
    defaultValue: "Search",
  },
};

const Template = (args) => {
  const [_, updateArgs] = useArgs();
  const handleChange = (e) => {
    const newValue = e.target.value;
    updateArgs({ value: newValue });
  };
  const clearSearch = () => updateArgs({ value: "" });
  return (
    <SearchInput {...args} onChange={handleChange} onClear={clearSearch} />
  );
};

export const Default = Template.bind({});
Default.argTypes = argTypes;
Default.args = {};
Default.parameters = {};
