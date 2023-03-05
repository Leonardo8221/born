import { FC } from 'react';
import { createColumnHelper } from "@tanstack/react-table";
import clsx from 'clsx';
import ImageText from '@/components/molecules/ImageText';
import { DropdownMenu } from '@/components/molecules/DropdownMenu';
import LivePreviewToggle from '@/components/molecules/LivePreviewToggle';
import ListPrices from '../../../ProductDetails/ListPrices';
import { Table } from '../../../Table';
import Badges from '../Badges';
import { fonts } from '@/config/fonts';

export interface ListTableProps {
  products: any[];
}

const ListTable: FC<ListTableProps> = ({ products }) => {
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
  ]

  const columns = [
    columnHelper.accessor((row: any) => row, {
      size: 221,
      id: "name",
      cell: ({ row }: any) => (
        <div>
          <ImageText
            title={row?.original?.name || ''}
            subTitle={row?.original?.title || ''}
            altText={row?.original?.title + 'logo'}
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
      cell: (info: any) => {
        const colors = info.getValue();
        return (
          <div className='flex flex-col gap-y-2'>
            {colors.map((item: any) => (
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
      cell: (info: any) => <Badges items={info.getValue()} />,
      header: () => "Season",
    }),
    columnHelper.accessor('collections', {
      size: 190,
      id: "collections",
      cell: (info: any) => <Badges items={info.getValue()} />,
      header: () => "Collections",
    }),
    columnHelper.accessor('currencies', {
      size: 83,
      id: "currencies",
      cell: (info: any) => (
        <div className={clsx('text-shades-black tracking-[0.06em]', fonts.text.sm)}>
          {info.getValue()?.join(', ')}
        </div>
      ),
      header: () => "Currency",
    }),
    columnHelper.accessor('priceList', {
      size: 271,
      id: "priceList",
      cell: (info: any) => (
        <div className='[&>div]:flex-wrap'>
          <ListPrices items={info.getValue() || []} isSmall />
        </div>
      ),
      header: () => "Prices",
    }),
    columnHelper.accessor('status', {
      size: 106,
      id: 'status',
      cell: (info: any) => (
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
