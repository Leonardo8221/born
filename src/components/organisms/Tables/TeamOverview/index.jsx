import React from 'react';
import { createColumnHelper } from "@tanstack/react-table";
import clsx from 'clsx';
import { Table } from '../../Table';
import { DropdownMenu } from '../../../molecules/DropdownMenu';
import { fonts } from '../../../../config/fonts';

const TeamOverTable = ({ teams }) => {
  const columnHelper = createColumnHelper();

  const options = [
    {
      label: 'Manage role',
      value: 'manage-role',
      action: () => console.log('Manage role!'),
    },
    {
      label: 'Revoke access',
      value: 'revoke-access',
      action: () => console.log('Manage role!'),
    },
    {
      label: 'Delete',
      value: 'delete',
      action: () => console.log('Deleted!'),
    },
  ]

  const columns = [
    columnHelper.accessor((row) => row, {
      size: 209,
      id: "teamMemberName",
      cell: ({ row }) => (
        <div className='pl-4'>
          <h3 className={clsx('text-shades-blak tracking-[0.06em]', fonts.text.lg)}>
            {row?.original?.name}
          </h3>
          <p className={clsx('text-neutral-700 font-light tracking-[0.06em]', fonts.text.sm)}>
            {row?.original?.brandLocation}
          </p>
        </div>
      ),
      header: () => "Team Member Name",
    }),
    columnHelper.accessor('lastLoggedIn', {
      size: 185,
      id: "lastLoggedIn",
      cell: (info) => (
        <div className={clsx('text-shades-black font-light tracking-[0.06em] text-center', fonts.text.sm)}>
          {info.getValue()}
        </div>
      ),
      header: () => "Last logged in",
    }),
    columnHelper.accessor('permission', {
      size: 97,
      id: "permission",
      cell: (info) => (
        <div className={clsx('text-shades-black font-light tracking-[0.06em] text-center', fonts.text.sm)}>
          {info.getValue()}
        </div>
      ),
      header: () => "Permission",
    }),
    columnHelper.accessor('actions', {
      size: 60,
      id: 'actions',
      cell: () => (
        <div>
          <DropdownMenu options={options} variant="dots" />
        </div>
      ),
      header: () => "",
    }),
  ];

  return (
    <Table
      tableData={teams}
      columns={columns}
      className="w-full max-w-[563px] [&>tbody>tr>td]:pt-4"
    />
  )
}

export default TeamOverTable;
