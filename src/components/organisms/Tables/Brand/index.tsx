import React, { FC } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import Image from 'next/image';
import { Table } from '../../Table';
import { DropdownMenu } from '@/components/molecules/DropdownMenu';
import { fonts } from '@/config/fonts';
import { Icon } from '@/components/molecules/Icon';
import { Paragraph } from '@/components/molecules/Paragraph';

export interface BrandTableProps {
  brands: any[];
}

const BrandTable: FC<any> = ({ brands }) => {
  const columnHelper: any = createColumnHelper();

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
  ];

  const columns = [
    columnHelper.accessor((row: any) => row, {
      size: 209,
      id: 'organzation',
      cell: ({ row }: any) => (
        <div className="flex items-center gap-x-4 pl-4">
          <img
            src={
              typeof row?.original?.logoUrl === 'string'
                ? row?.original?.logoUrl
                : row?.original?.logoUrl?.src
            }
            alt={`${row?.original?.organization} logo`}
            className="h-12 w-12 rounded-full border border-neutral-200 p-1"
          />
          <h3
            className={clsx(
              'text-shades-blak tracking-[0.06em]',
              fonts.text.lg
            )}
          >
            {row?.original?.organization}
          </h3>
        </div>
      ),
      header: () => 'Organization',
    }),
    columnHelper.accessor('title', {
      size: 189,
      id: 'title',
      cell: (info: any) => (
        <div
          className={clsx(
            'text-shades-black font-light tracking-[0.06em] text-center',
            fonts.text.sm
          )}
        >
          {info.getValue()}
        </div>
      ),
      header: () => 'Title',
    }),
    columnHelper.accessor('permission', {
      size: 99,
      id: 'permission',
      cell: (info: any) => (
        <div
          className={clsx(
            'text-shades-black font-light tracking-[0.06em] text-center',
            fonts.text.sm
          )}
        >
          {info.getValue()}
        </div>
      ),
      header: () => 'Permission',
    }),
    columnHelper.accessor('actions', {
      size: 60,
      id: 'actions',
      cell: () => (
        <div>
          <DropdownMenu options={options} variant="dots" />
        </div>
      ),
      header: () => '',
    }),
    columnHelper.accessor('logout', {
      size: 65,
      id: 'logout',
      cell: () => (
        <Icon name="icon-logout" className="cursor-pointer text-shades-black" />
      ),
      header: () => '',
    }),
  ];

  return (
    <div>
      <Table
        tableData={brands}
        columns={columns}
        className="w-full max-w-[627px] [&>tbody>tr>td]:pt-4"
      />
      {!brands?.length && (
        <div className="max-w-[563] text-center">
          <Paragraph size="base" className="!text-shades-black !font-light">
            No data found!
          </Paragraph>
        </div>
      )}
    </div>
  );
};

export default BrandTable;
