import { StoryFn } from "@storybook/react";
import { Table, TableProps } from "..";
import { defaultColumns, defaultData } from "../data";

export default {
  title: "Organisms/Table",
  component: Table,
};

const Template = (args: TableProps) => <Table {...args} />;

export const SimpleExample: StoryFn<TableProps> = Template.bind({});

SimpleExample.args = {
  tableData: defaultData,
  columns: defaultColumns,
  className: "max-w-[700px]",
};
