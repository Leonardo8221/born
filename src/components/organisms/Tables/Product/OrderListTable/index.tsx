import { FC, Fragment, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import ImageText from '@/components/molecules/ImageText';
import { fonts } from '@/config/fonts';
import { Table } from '../../../Table';
import Badges from '../Badges';
import { formatCurrency } from '@/utils/formatCurrency';
import { Icon } from '@/components/molecules/Icon';
import ColorVairant, {
  VariantColors,
} from '@/components/molecules/ColorVariant';

export interface OrderDetails {
  products: any[];
  quantity?: number;
  total_price?: number;
  pricing_condition?: any;
  editMode?: boolean;
  handleQuantities?: (val: string, id: number) => void;
  handleOrderNote?: (id?: any, note?: string) => void;
  handleDelete?: (id: number) => void;
}

const OrderListTable: FC<OrderDetails> = ({
  products,
  editMode,
  pricing_condition,
  handleQuantities,
  handleOrderNote,
  handleDelete,
}) => {
  const columnHelper: any = createColumnHelper();
  const columns = [
    columnHelper.accessor((row: any) => row, {
      size: 180,
      id: 'name',
      cell: ({ row }: any) => (
        <div>
          <ImageText
            title={row?.original?.product?.style_name || ''}
            subTitle={row?.original?.product?.style_number || ''}
            altText={row?.original?.product?.style_name + 'logo'}
            imgSrc={row?.original?.product?.attachments?.[0]?.medium_image_url}
            variant="product"
          />
        </div>
      ),
      header: () => 'Product name',
    }),
    columnHelper.accessor((row: any) => row, {
      size: 110,
      id: 'colors',
      cell: ({ row }: any) => {
        const colors = row?.original?.product?.colour_families || [];
        return (
          <div className="flex items-center gap-x-2">
            <div>
              <VariantColors
                colors={colors?.map((item: any) => item?.toLowerCase()) || []}
              />
            </div>
            <span
              className={clsx(
                'text-shades-black tracking-[0.06em] text-center',
                fonts.text.md
              )}
            >
              {row?.original?.product?.colour_name}
            </span>
          </div>
        );
      },
      header: () => 'Color name',
    }),
    columnHelper.accessor((row: any) => row, {
      size: 96,
      id: 'season',
      cell: ({ row }: any) => (
        <Badges items={[row?.original?.product?.season]} />
      ),
      header: () => 'Season',
    }),
    columnHelper.accessor('wholesale_price', {
      size: 130,
      id: 'wholesalePrice',
      cell: (info: any) => (
        <div
          className={clsx(
            'text-shades-black tracking-[0.06em] text-center',
            fonts.text.xl
          )}
        >
          {formatCurrency(pricing_condition?.split('_')?.[0] as any)?.format(
            info.getValue() || 0
          )}
        </div>
      ),
      header: () => 'Wholesale Price',
    }),
    columnHelper.accessor('total_quantity', {
      size: 95,
      id: 'total_quantity',
      cell: (info: any) => (
        <div
          className={clsx(
            'text-shades-black tracking-[0.06em] text-center',
            fonts.text.xl
          )}
        >
          {info.getValue()}
        </div>
      ),
      header: () => 'Quantities',
    }),
    columnHelper.accessor('wholesale_total_price', {
      size: 160,
      id: 'wholesale_total_price',
      cell: (info: any) => (
        <div
          className={clsx(
            'text-shades-black tracking-[0.06em] text-center',
            fonts.text.xl
          )}
        >
          {formatCurrency(pricing_condition?.split('_')?.[0] as any)?.format(
            info.getValue() || 0
          )}
        </div>
      ),
      header: () => 'Total Wholesale price',
    }),
    columnHelper.accessor((row: any) => row, {
      size: 124,
      id: 'actions',
      cell: ({ row }: any) => editMode && (
        <div className="flex">
          <Icon
            name="icon-message-square"
            className="cursor-pointer text-shades-black ml-[28px] mr-[48px]"
            onClick={() => handleOrderNote?.(row?.original?.id, row?.original?.note)}
          />
          <Icon
            name="icon-trash"
            className="cursor-pointer text-shades-black"
            onClick={() => handleDelete?.(row?.original?.product?.id)}
          />
        </div>
      ),
      header: () => '',
    }),
  ];

  return (
    <Table
      tableData={products}
      handleQuantities={handleQuantities}
      columns={columns}
      className="w-full [&>tbody>tr>td]:pt-4"
      size={true}
      editMode={editMode}
    />
  );
};

export default OrderListTable;
