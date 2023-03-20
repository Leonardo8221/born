import { FC, Fragment, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import ImageText from '@/components/molecules/ImageText';
import { fonts } from '@/config/fonts';
import { Table } from '../../../Table';
import Badges from '../Badges';
import ProductImage from '@/assets/images/products/product.png';
export interface OrderDetails {
  products: any[];
  handleQuantities?: (val: string, id: number) => void;
  handleOrderNote?: (val: string, details: any) => void;
}

const OrderListTable: FC<OrderDetails> = ({
  products,
  handleQuantities,
  handleOrderNote,
}) => {
  const columnHelper: any = createColumnHelper();
  const columns = [
    columnHelper.accessor((row: any) => row, {
      size: 180,
      id: 'name',
      cell: ({ row }: any) => (
        <div>
          <ImageText
            title={row?.original?.product?.upc || ''}
            subTitle={row?.original?.product?.title || ''}
            altText={row?.original?.product?.title + 'logo'}
            imgSrc={ProductImage}
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
          <div className="flex flex-col gap-y-2">
            {Array.isArray(colors) &&
              colors.map((item: any) => (
                <div key={item} className="flex items-center gap-x-2">
                  <div
                    className="h-4 w-4 rounded border-2 border-shades-white"
                    style={item && { backgroundColor: `${item}` }}
                  />
                  <span>{item}</span>
                </div>
              ))}
          </div>
        );
      },
      header: () => 'Color name',
    }),
    columnHelper.accessor((row: any) => row, {
      size: 96,
      id: 'season',
      cell: ({ row }: any) => <Badges items={row?.original?.product?.season} />,
      header: () => 'Season',
    }),
    columnHelper.accessor((row: any) => row, {
      size: 120,
      id: 'department',
      cell: ({ row }: any) => <Badges items={row?.original?.product?.season} />,
      header: () => 'Department',
    }),
    columnHelper.accessor('wholesalePrice', {
      size: 130,
      id: 'wholesalePrice',
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
      header: () => 'Wholesale Price',
    }),
    columnHelper.accessor('quantity', {
      size: 95,
      id: 'quantites',
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
    columnHelper.accessor('totalWholesalePrice', {
      size: 160,
      id: 'totalWholesalePrice',
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
      header: () => 'Total Wholesale price',
    }),
  ];

  return (
    <Fragment>
      <>
        <Table
          tableData={products}
          handleQuantities={handleQuantities}
          handleOrderNote={handleOrderNote}
          columns={columns}
          className="w-full [&>tbody>tr>td]:pt-4"
          size={true}
        />
      </>
    </Fragment>
  );
};

export default OrderListTable;
