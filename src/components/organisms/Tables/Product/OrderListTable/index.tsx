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
      size: 244,
      id: 'name',
      cell: ({ row }: any) => (
        <div>
          <ImageText
            title={row?.original?.product?.style_name || ''}
            subTitle={row?.original?.product?.style_number || ''}
            altText={row?.original?.product?.style_name + 'logo'}
            imgSrc={row?.original?.product?.attachments?.[0]?.medium_image_url}
            variant="product"
            deliveryLeadTime={row?.original?.product.delivery_lead_time || ''}
          />
        </div>
      ),
      header: () => 'Product name',
    }),
    columnHelper.accessor((row: any) => row, {
      size: 122,
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
                'text-shades-black tracking-[0.06em] text-center print:w-[60px]',
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
    columnHelper.accessor('materials', {
      size: 128,
      id: 'materials',
      cell: ({ row }: any) => (
        <div
          className={clsx(
            'text-shades-black tracking-[0.06em] text-center',
            fonts.text.xl
          )}
        >
          {row?.original?.product?.materials?.join(', ')}
        </div>
      ),
      header: () => 'Materials',
    }),
    columnHelper.accessor('first_category', {
      size: 142,
      id: 'category',
      cell: ({ row }: any) => (
        <Badges items={[row?.original?.product?.first_category]} />
      ),
      header: () => 'Category',
    }),
    columnHelper.accessor((row: any) => row, {
      size: 142,
      id: 'country_of_origin',
      cell: ({ row }: any) => (
        <Badges items={[row?.original?.product?.country_of_origin]} />
      ),
      header: () => 'Country of Origin',
    }),
    columnHelper.accessor('msrp', {
      size: 108,
      id: 'msrp',
      cell: (info: any) => (
        <div
          className={clsx(
            'text-shades-black tracking-[0.06em] text-center',
            fonts.text.lg
          )}
        >
          {formatCurrency(pricing_condition?.split('_')?.[0] as any)?.format(
            info.getValue() || 0
          )}
        </div>
      ),
      header: () => 'MSRP',
    }),
    columnHelper.accessor('wholesale_price', {
      size: 126,
      id: 'wholesalePrice',
      cell: (info: any) => (
        <div
          className={clsx(
            'text-shades-black tracking-[0.06em] text-center',
            fonts.text.lg
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
      size: 79,
      id: 'total_quantity',
      cell: (info: any) => (
        <div
          className={clsx(
            'text-shades-black tracking-[0.06em] text-center',
            fonts.text.lg
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
            fonts.text.lg
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
      cell: ({ row }: any) =>
        editMode && (
          <div className="print:hidden flex">
            <div className="flex-1 text-center">
              <Icon
                name="icon-message-square"
                className="cursor-pointer text-shades-black mx-auto"
                onClick={() =>
                  handleOrderNote?.(row?.original?.id, row?.original?.note)
                }
              />
            </div>
            <div className="flex-1 text-right">
              <Icon
                name="icon-trash"
                className="cursor-pointer text-shades-black ml-auto"
                onClick={() => handleDelete?.(row?.original?.product?.id)}
              />
            </div>
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
      className="!w-full [&>tbody>tr>td]:pt-4 order__list-table"
      size={true}
      editMode={editMode}
    />
  );
};

export default OrderListTable;
