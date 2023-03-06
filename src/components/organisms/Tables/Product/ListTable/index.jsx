import React from 'react';
import { createColumnHelper } from "@tanstack/react-table";
import clsx from 'clsx';
import { Table } from '../../../Table';
import ImageText from '../../../../molecules/ImageText';
import { DropdownMenu } from '../../../../molecules/DropdownMenu';
import LivePreviewToggle from '../../../../molecules/LivePreviewToggle';
import ListPrices from '../../../ProductDetails/ListPrices';
import Badges from '../Badges';
import { fonts } from '@/config/fonts';

const ListTable = ({ products }) => {
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
      size: 221,
      id: "name",
      cell: ({ row }) => (
        <div>
          <ImageText
            title={row?.original?.name || ''}
            subTitle={row?.original?.title || ''}
            imgSrc={row?.original?.imageUrl}
            variant="product"
          />
        </div>
      ),
      header: () => "Product name",
    }),
    columnHelper.accessor('colors', {
      size: 122,
      id: "colors",
      cell: (info) => {
        const colors = info.getValue();
        return (
          <div className='flex flex-col gap-y-2'>
            {colors.map(item => (
              <div key={item.value} className='flex items-center gap-x-2'>
                <div
                  className="h-4 w-4 rounded border-2 border-shades-white"
                  style={item.value && { backgroundColor: item.value }}
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        )
      },
      header: () => "Color name",
    }),
    columnHelper.accessor('season', {
      size: 87,
      id: "season",
      cell: (info) => <Badges items={info.getValue()} />,
      header: () => "Season",
    }),
    columnHelper.accessor('collections', {
      size: 190,
      id: "collections",
      cell: (info) => <Badges items={info.getValue()} />,
      header: () => "Collections",
    }),
    columnHelper.accessor('currencies', {
      size: 83,
      id: "currencies",
      cell: (info) => (
        <div className={clsx('text-shades-black tracking-[0.06em]', fonts.text.sm)}>
          {info.getValue()?.join(', ')}
        </div>
      ),
      header: () => "Currency",
    }),
    columnHelper.accessor('priceList', {
      size: 271,
      id: "priceList",
      cell: (info) => (
        <div className='[&>div]:flex-wrap'>
          <ListPrices items={info.getValue() || []} isSmall />
        </div>
      ),
      header: () => "Prices",
    }),
    columnHelper.accessor('status', {
      size: 106,
      id: 'status',
      cell: (info) => (
        <div>
          <LivePreviewToggle showPreview={info.getValue()} />
        </div>
      ),
      header: () => "Status",
    }),
    columnHelper.accessor('options', {
      size: 39,
      id: 'options',
      cell: () => (
        <div>
          <DropdownMenu options={options} variant="dots" />
        </div>
      ),
      header: () => "",
    })
  ];

  return (
    <Table
      tableData={products}
      columns={columns}
      className="w-full max-w-[1119px] [&>tbody>tr>td]:pt-4"
    />
  )
}

export default ListTable;
