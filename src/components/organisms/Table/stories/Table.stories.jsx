import { Table } from "..";
import { defaultColumns, defaultData } from "../data";

export default {
  title: "Organisms/Table",
  component: Table,
};

const Template = (args) => <Table {...args} />;

export const SimpleExample = Template.bind({});

SimpleExample.args = {
  tableData: defaultData,
  columns: defaultColumns,
  className: "max-w-[700px]",
};
