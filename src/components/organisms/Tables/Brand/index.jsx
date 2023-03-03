import React from 'react';
import { createColumnHelper } from "@tanstack/react-table";
import clsx from 'clsx';
import { Table } from '../../Table';
import { DropdownMenu } from '../../../molecules/DropdownMenu';
import { fonts } from '../../../../config/fonts';
import { Icon } from '../../../molecules/Icon';

const BrandTable = ({ brands }) => {
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
      id: "organzation",
      cell: ({ row }) => (
        <div className='flex items-center gap-x-4 pl-4'>
          <img
            src={row?.original?.logoUrl}
            alt={`${row?.original?.organization} logo`}
            className="h-12 w-12 rounded-full border border-neutral-200 p-1"
          />
          <h3 className={clsx('text-shades-blak tracking-[0.06em]', fonts.text.lg)}>
            {row?.original?.organization}
          </h3>
        </div>
      ),
      header: () => "Organization",
    }),
    columnHelper.accessor('title', {
      size: 189,
      id: "title",
      cell: (info) => (
        <div className={clsx('text-shades-black font-light tracking-[0.06em] text-center', fonts.text.sm)}>
          {info.getValue()}
        </div>
      ),
      header: () => "Title",
    }),
    columnHelper.accessor('permission', {
      size: 99,
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
    columnHelper.accessor('logout', {
      size: 65,
      id: 'logout',
      cell: () => <Icon name="icon-logout" className="cursor-pointer text-shades-black" />,
      header: () => "",
    })
  ];

  return (
    <Table
      tableData={brands}
      columns={columns}
      className="w-full max-w-[627px] [&>tbody>tr>td]:pt-4"
    />
  )
}

export default BrandTable;
