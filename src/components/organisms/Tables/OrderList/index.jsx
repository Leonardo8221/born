import React from 'react';
import { createColumnHelper } from "@tanstack/react-table";
import clsx from 'clsx';
import { Table } from '../../Table';
import { DropdownMenu } from '../../../molecules/DropdownMenu';
import { fonts } from '../../../../config/fonts';
import { Button } from '../../../molecules/Button';

const OrderListTable = ({ orders }) => {
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
    columnHelper.accessor('name', {
      size: 341,
      id: "name",
      cell: (info) => (
        <div className={clsx('text-shades-black tracking-[0.06em] pl-4', fonts.text.lg)}>
          {info.getValue()}
        </div>
      ),
      header: () => "Order name",
    }),
    columnHelper.accessor('retailerName', {
      size: 120,
      id: "retailerName",
      cell: (info) => (
        <div className={clsx('text-shades-black font-light tracking-[0.06em] text-center', fonts.text.sm)}>
          {info.getValue()}
        </div>
      ),
      header: () => "Retailer name",
    }),
    columnHelper.accessor('buyerName', {
      size: 120,
      id: "buyerName",
      cell: (info) => (
        <div className={clsx('text-shades-black font-light tracking-[0.06em] text-center', fonts.text.sm)}>
          {info.getValue()}
        </div>
      ),
      header: () => "Buyer name",
    }),
    columnHelper.accessor('total', {
      size: 120,
      id: "total",
      cell: (info) => (
        <div className={clsx('text-shades-black font-light tracking-[0.06em] text-center', fonts.text.sm)}>
          {info.getValue()}
        </div>
      ),
      header: () => "Total",
    }),
    columnHelper.accessor('season', {
      size: 120,
      id: "season",
      cell: (info) => (
        <div className={clsx('text-shades-black font-light tracking-[0.06em] text-center', fonts.text.sm)}>
          {info.getValue()}
        </div>
      ),
      header: () => "Season",
    }),
    columnHelper.accessor('orderDate', {
      size: 120,
      id: "orderDate",
      cell: (info) => (
        <div className={clsx('text-shades-black font-light tracking-[0.06em] text-center', fonts.text.sm)}>
          {info.getValue()}
        </div>
      ),
      header: () => "Order date",
    }),
    columnHelper.accessor('approve', {
      size: 120,
      id: 'approve',
      cell: () => (
        <div>
          <Button variant="outlined">Approve</Button>
        </div>
      ),
      header: () => "",
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
      tableData={orders}
      columns={columns}
      className="w-full max-w-[1120px] [&>tbody>tr>td]:pt-4"
    />
  )
}

export default OrderListTable;
