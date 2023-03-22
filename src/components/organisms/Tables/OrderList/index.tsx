import { FC } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import { Table } from '../../Table';
import { fonts } from '@/config/fonts';
import { Button } from '@/components/molecules/Button';
import Link from 'next/link';
import { OrderGraphqlDto } from '@/generated/types';
import { formatDate } from '@/utils';
import { Paragraph } from '@/components/molecules/Paragraph';
export interface OrderListTableProps {
  orders: OrderGraphqlDto[];
  orderType: string;
  loading: boolean;
  handleActions: (action: string, id: number) => void;
  actionsLoading?: boolean;
}

const OrderListTable: FC<OrderListTableProps> = ({
  orders,
  orderType,
  loading,
  handleActions,
}) => {
  const columnHelper: any = createColumnHelper();

  const columns = [
    columnHelper.accessor('name', {
      size: 341,
      id: 'name',
      cell: (info: any) => (
        <Link href={`${location.pathname}/${info.row.original.id}`}>
          <div className={clsx('text-[#333333] pl-4', fonts.text.lg)}>
            {info.getValue()}
          </div>
        </Link>
      ),
      header: () => 'Order name',
    }),
    columnHelper.accessor('retailer', {
      size: 120,
      id: 'retailerName',
      cell: (info: any) => (
        <div className={clsx('text-[#333333] text-center', fonts.text.md)}>
          {info.getValue()}
        </div>
      ),
      header: () => 'Retailer name',
    }),
    columnHelper.accessor('buyer_name', {
      size: 120,
      id: 'buyerName',
      cell: (info: any) => (
        <div className={clsx('text-[#333333] text-center', fonts.text.md)}>
          {info.getValue()}
        </div>
      ),
      header: () => 'Buyer name',
    }),
    columnHelper.accessor('total', {
      size: 120,
      id: 'total',
      cell: (info: any) => (
        <div className={clsx('text-[#333333] text-center', fonts.text.md)}>
          {info.getValue()}
        </div>
      ),
      header: () => 'Total',
    }),
    columnHelper.accessor('season', {
      size: 120,
      id: 'season',
      cell: (info: any) => (
        <div className={clsx('text-[#333333] text-center', fonts.text.md)}>
          {info.getValue()}
        </div>
      ),
      header: () => 'Season',
    }),
    columnHelper.accessor('created_date', {
      size: 120,
      id: 'orderDate',
      cell: (info: any) => (
        <div className={clsx('text-[#333333] text-center', fonts.text.md)}>
          {formatDate(info.getValue())}
        </div>
      ),
      header: () => 'Order date',
    }),
    columnHelper.accessor((row: any) => row, {
      size: 120,
      id: 'confirm',
      cell: ({ row }: any) => (
        <>
          {orderType === 'confirmed' ? (
            <div className="flex items-center">
              <Button
                onClick={() => handleActions('cancel', row.original.id)}
                variant="outlined"
                className="h-8 text-[12px] text-[#333333] border-[#999999] mr-2"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleActions('approve', row.original.id)}
                variant="outlined"
                className="h-8 text-[12px] text-[#333333] border-[#999999]"
              >
                Approve
              </Button>
            </div>
          ) : orderType === 'approved' ? (
            <div>
              <Button
                onClick={() => handleActions('cancel', row.original.id)}
                variant="outlined"
                className="h-8 text-[12px] text-[#333333] border-[#999999]"
              >
                Cancel
              </Button>
            </div>
          ) : orderType === 'cancelled' ? null : (
            <div>
              <Button
                onClick={() => handleActions('confirm', row.original.id)}
                variant="outlined"
                className="h-8 text-[12px] text-[#333333] border-[#999999]"
              >
                Confirm
              </Button>
            </div>
          )}
        </>
      ),
      onclick: () => console.log('click'),
      header: () => '',
    }),
  ];

  return (
    <>
      <Table
        tableData={orders?.length ? orders : []}
        columns={columns}
        loading={loading}
        className="w-full max-w-[1120px] [&>tbody>tr>td]:pt-4"
      />
      {!orders?.length && !loading && (
        <div className="max-w-[563] text-center">
          <Paragraph size="base" className="!text-shades-black !font-light">
            No data found!
          </Paragraph>
        </div>
      )}
    </>
  );
};

export default OrderListTable;
