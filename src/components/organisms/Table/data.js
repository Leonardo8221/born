import { createColumnHelper } from "@tanstack/react-table";

export const defaultData = [
  {
    teamMemberName: "Georgia Mcminster",
    lastLoggedIn: "19/05/2022",
    permission: "Owner",
  },
  {
    teamMemberName: "Georgia Mcminster",
    lastLoggedIn: "19/05/2022",
    permission: "Owner",
  },
];

const columnHelper = createColumnHelper();

export const defaultColumns = [
  columnHelper.accessor("teamMemberName", {
    cell: (info) => (
      <div className="text-[16px] leading-[24px] tracking-[.06em] font-normal">
        {info.getValue()}
      </div>
    ),
    header: () => "Team member name",
  }),
  columnHelper.accessor((row) => row.lastLoggedIn, {
    id: "lastLoggedIn",
    cell: (info) => <div>{info.getValue()}</div>,
    header: () => <span>Last logged in</span>,
  }),
  columnHelper.accessor("permission", {
    header: () => "Permission",
    cell: (info) => info.renderValue(),
  }),
];
