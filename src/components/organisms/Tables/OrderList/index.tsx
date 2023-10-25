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
import { DropdownMenu } from '@/components/molecules/DropdownMenu';
import { formatCurrency } from '@/utils/formatCurrency';
import { Checkbox } from '@/components/molecules/Checkbox';
export interface OrderListTableProps {
  orders: OrderGraphqlDto[];
  orderType: string;
  loading: boolean;
  handleActions: (action: string, id: number) => void;
  actionsLoading?: boolean;
  handleDelete?: (id: number) => void;
  selectedItems?: number[];
  handleOnOrderSelect: (id: number) => void;
}

const OrderListTable: FC<OrderListTableProps> = ({
  orders,
  orderType,
  loading,
  handleActions,
  handleDelete,
  selectedItems,
  handleOnOrderSelect,
}) => {
  const columnHelper: any = createColumnHelper();

  const columns = [
    columnHelper.accessor('name', {
      size: 341,
      id: 'name',
      cell: (info: any) => {
        const id: number = info?.row?.original?.id;
        return (
          <div className="flex items-center">
            <div className="flex items-center justify-center px-2">
              <Checkbox
                variant="accent"
                checked={selectedItems?.includes(id)}
                onChange={() => handleOnOrderSelect(id)}
              />
            </div>
            <Link href={`${location.pathname}/${info.row.original.id}`}>
              <div
                className={clsx(
                  'text-[#333333] pl-4 hover:text-accent-b-200',
                  fonts.text.lg
                )}
              >
                {info.getValue()}
              </div>
            </Link>
          </div>
        );
      },
      header: () => 'Order name',
    }),
    columnHelper.accessor('retailer_data', {
      size: 120,
      id: 'retailerName',
      cell: (info: any) => (
        <div className={clsx('text-[#333333] text-center', fonts.text.md)}>
          {info.getValue()?.store_name}
        </div>
      ),
      header: () => 'Retailer name',
    }),
    columnHelper.accessor('buyer_data', {
      size: 120,
      id: 'buyerName',
      cell: (info: any) => (
        <div className={clsx('text-[#333333] text-center', fonts.text.md)}>
          {info.getValue()?.buyer_name}
        </div>
      ),
      header: () => 'Buyer name',
    }),
    columnHelper.accessor('total_price', {
      size: 120,
      id: 'total',
      cell: (info: any) => (
        <div className={clsx('text-[#333333] text-center', fonts.text.md)}>
          {formatCurrency(
            info?.row?.original?.pricing_condition?.split('_')?.[0] as any
          )?.format(info.getValue())}
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
                onClick={() => handleActions('approve', row.original.id)}
                variant="outlined"
                className="h-8 text-[12px] text-[#333333] border-[#999999]"
              >
                Approve
              </Button>
            </div>
          ) : orderType === 'approved' ? null : orderType ===
            'cancelled' ? null : (
            <div>
              <Button
                onClick={() => handleActions('confirm', row.original.id)}
                variant="outlined"
                className="h-8 text-[12px] text-[#333333] border-[#999999]"
                disabled={!row?.original?.total_quantity}
              >
                Confirm
              </Button>
            </div>
          )}
        </>
      ),
      header: () => '',
    }),
    columnHelper.accessor((row: any) => row, {
      size: 60,
      id: 'confirm',
      cell: (info: any) => {
        let options = [];
        if (
          info?.row?.original?.order_status === 'DRAFT' ||
          info?.row?.original?.order_status === 'CONFIRMED'
        ) {
          options.push({
            label: 'Delete',
            value: 'delete',
            action: () => handleDelete?.(info?.row?.original?.id),
          });
        }

        if (info?.row?.original?.order_status === 'CONFIRMED') {
          options.push({
            label: 'Cancel',
            value: 'cancel',
            action: () => handleActions('cancel', info?.row?.original?.id),
          });
        }

        options.push({
          label: 'Clone',
          value: 'clone',
          action: () => handleActions('clone', info?.row?.original?.id),
        })

        return (
          !!options.length && (
            <div className="[&>div]:justify-center">
              <DropdownMenu options={options} variant="dots" />
            </div>
          )
        );
      },
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
