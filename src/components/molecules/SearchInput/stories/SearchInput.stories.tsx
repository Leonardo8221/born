import { useArgs } from "@storybook/client-api";
import { StoryFn } from "@storybook/react";
import { ChangeEvent } from "react";
import { SearchInput, SearchInputProps } from "..";

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

const Template = (args: SearchInputProps) => {
  const [_, updateArgs] = useArgs();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    updateArgs({ value: newValue });
  };
  const clearSearch = () => updateArgs({ value: "" });
  return (
    <SearchInput {...args} onChange={handleChange} onClear={clearSearch} />
  );
};

export const Default: StoryFn<SearchInputProps> = Template.bind({});
Default.argTypes = argTypes;
Default.args = {};
Default.parameters = {};
