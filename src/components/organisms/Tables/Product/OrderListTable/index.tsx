import { FC, Fragment, useState } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import ImageText from '@/components/molecules/ImageText';
import { Icon } from '@/components/molecules/Icon';
import { fonts } from '@/config/fonts';
import { Table } from '../../../Table';
import Badges from '../Badges';
import Modal from '@/components/molecules/Modal';
import DescriptionField from '@/components/molecules/DescriptionField/DescriptionField';
import { Button } from '@/components/molecules/Button';
import ProductImage from '@/assets/images/products/product.png';
import TableComponent from '@/components/page-components/order/TableComponent';
export interface OrderDetails {
  products: any[];
}

const OrderListTable: FC<OrderDetails> = ({ products }) => {
  console.log(products, 'orderByOrderId');

  const size = [{ small: 'S' }, { medium: 'M' }, { large: 'L' }];

  const quantity = [{ small: '20' }, { medium: '30' }, { large: '0' }];

  const [open, setOpen] = useState<boolean>(false);
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
    columnHelper.accessor('chat', {
      id: 'chat',
      cell: () => (
        <Icon
          onClick={() => setOpen(true)}
          name="icon-message-square"
          className="text-center cursor-pointer text-shades-black"
        />
      ),
      header: () => '',
    }),
  ];

  return (
    <Fragment>
      <Table
        tableData={products}
        columns={columns}
        className="w-full [&>tbody>tr>td]:pt-4"
      />
      <TableComponent size={size} quantity={quantity} />
      <Modal
        title="Add a Product Note"
        isOpen={open}
        onClose={() => setOpen(false)}
        className="w-[50%]"
      >
        <DescriptionField
          className="mb-8"
          label="Product Note"
          placeholder="This Product...."
        />
        <Button label="Save" />
      </Modal>
    </Fragment>
  );
};

export default OrderListTable;
