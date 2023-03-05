import React from 'react';
import { createColumnHelper } from "@tanstack/react-table";
import clsx from 'clsx';
import { Table } from '../../../Table';
import ImageText from '../../../../molecules/ImageText';
import Badges from '../Badges';
import { fonts } from '@/config/fonts';
import { Icon } from '@/components/molecules/Icon';

const OrderListTable = ({ products }) => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor((row) => row, {
      size: 222,
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
      size: 96,
      id: "season",
      cell: (info) => <Badges items={info.getValue()} />,
      header: () => "Season",
    }),
    columnHelper.accessor('department', {
      size: 128,
      id: "department",
      cell: (info) => <Badges items={info.getValue()} />,
      header: () => "Department",
    }),
    columnHelper.accessor('wholesalePrice', {
      size: 153,
      id: "wholesalePrice",
      cell: (info) => (
        <div className={clsx('text-shades-black tracking-[0.06em] text-center', fonts.text.xl)}>
          {info.getValue()}
        </div>
      ),
      header: () => "Wholesale Price",
    }),
    columnHelper.accessor('quantities', {
      size: 95,
      id: "quantites",
      cell: (info) => (
        <div className={clsx('text-shades-black tracking-[0.06em] text-center', fonts.text.xl)}>
          {info.getValue()}
        </div>
      ),
      header: () => "Quantities",
    }),
    columnHelper.accessor('totalWholesalePrice', {
      size: 180,
      id: "totalWholesalePrice",
      cell: (info) => (
        <div className={clsx('text-shades-black tracking-[0.06em] text-center', fonts.text.xl)}>
          {info.getValue()}
        </div>
      ),
      header: () => "Total Wholesale price",
    }),
    columnHelper.accessor('chat', {
      size: 124,
      id: 'chat',
      cell: () => (
        <Icon
          name="icon-message-square"
          className="text-center cursor-pointer text-shades-black"
        />
      ),
      header: () => "",
    })
  ];

  return (
    <Table
      tableData={products}
      columns={columns}
      className="w-full max-w-[1120px] [&>tbody>tr>td]:pt-4"
    />
  )
}

export default OrderListTable;
