import { FC } from 'react';
import { createColumnHelper } from '@tanstack/react-table';
import clsx from 'clsx';
import ImageText from '@/components/molecules/ImageText';
import { DropdownMenu } from '@/components/molecules/DropdownMenu';
import LivePreviewToggle from '@/components/molecules/LivePreviewToggle';
import ListPrices from '../../../ProductDetails/ListPrices';
import { Table } from '../../../Table';
import Badges from '../Badges';
import { fonts } from '@/config/fonts';
import {
  PriceGraphqlDto,
  ProductWithCollectionsGraphqlDto,
} from '@/generated/types';
import { Paragraph } from '@/components/molecules/Paragraph';
import { VariantColors } from '@/components/molecules/ColorVariant';

export interface ListTableProps {
  products: ProductWithCollectionsGraphqlDto[];
  hanldeAddToDraftOrder?: (id: number) => void;
  handleAddToCollection?: (id: number) => void;
  handleDeleteProduct?: (id: number) => void;
  isSelectable?: boolean;
  selectedProducts?: Array<number | string>;
  onSelect?: (id: number) => void;
  type?: 'products' | 'collection';
}

const ListTable: FC<ListTableProps> = ({
  products,
  handleAddToCollection,
  handleDeleteProduct,
  hanldeAddToDraftOrder,
  selectedProducts,
  isSelectable,
  onSelect,
  type = 'products',
}) => {
  const columnHelper: any = createColumnHelper();

  const getPriceList = (prices?: PriceGraphqlDto[]) => {
    const items = prices?.map((item: any) => {
      const keys = Object.keys(item || {});
      const priceKeys = ['exworks', 'landed', 'retail'];
      return {
        currency: item?.currency,
        items: keys?.map(
          (i: any) =>
            (priceKeys.includes(i) && {
              label: i,
              price: item?.[i] || '',
            }) ||
            []
        ),
      };
    });
    return items as any;
  };

  const columns = [
    columnHelper.accessor((row: any) => row, {
      size: 221,
      id: 'name',
      cell: ({ row }: any) => (
        <div className="min-w-[221px]">
          <ImageText
            isSelectable={isSelectable}
            onSelect={() => onSelect?.(row?.original?.id)}
            isSelected={selectedProducts?.includes(row?.original?.id)}
            title={row?.original?.style_name || ''}
            subTitle={row?.original?.style_number || ''}
            altText={row?.original?.style_name + 'logo'}
            imgSrc={row?.original?.attachments?.[0]?.medium_image_url || ''}
            variant="product"
            titleClassName="max-w-[125px] overflow-hidden text-ellipsis whitespace-nowrap"
          />
        </div>
      ),
      header: () => 'Product name',
    }),
    columnHelper.accessor('colour_families', {
      size: 122,
      id: 'colour_families',
      cell: (info: any) => {
        const colour_families = info.getValue();
        return (
          <div className="flex items-center gap-2">
            <VariantColors colors={colour_families || []} />
            <div
              className={clsx(
                'text-shades-black tracking-[0.06em] max-w-[90px] text-ellipsis whitespace-nowrap overflow-hidden',
                fonts.text.sm
              )}
              title={info?.row?.original?.colour_name}
            >
              {info?.row?.original?.colour_name}
            </div>
          </div>
        );
      },
      header: () => 'Color name',
    }),
    columnHelper.accessor('season', {
      size: 90,
      id: 'season',
      cell: (info: any) => <Badges items={[info.getValue()]} />,
      header: () => 'Season',
    }),
    columnHelper.accessor('collections', {
      size: 190,
      id: 'collections',
      cell: (info: any) => (
        <Badges
          items={info?.getValue()?.map((item: any) => item?.name) || []}
        />
      ),
      header: () => 'Collections',
    }),
    columnHelper.accessor('currency', {
      size: 83,
      id: 'currencies',
      cell: (info: any) => (
        <div
          className={clsx('text-shades-black tracking-[0.06em]', fonts.text.sm)}
        >
          {info
            .getValue()
            ?.map?.((item: any) => item?.currency)
            ?.join(', ')}
        </div>
      ),
      header: () => 'Currency',
    }),
    columnHelper.accessor('associated_prices', {
      size: 271,
      id: 'associated_prices',
      cell: (info: any) => (
        <div className="[&>div]:flex-wrap">
          {getPriceList?.(info.getValue() || []).map((item: any) => (
            <ListPrices key={item.currency} items={item?.items || []} isSmall />
          ))}
        </div>
      ),
      header: () => 'Prices',
    }),
    columnHelper.accessor('status', {
      size: 106,
      id: 'status',
      cell: (info: any) => (
        <div>
          <LivePreviewToggle showPreview={info.getValue()} />
        </div>
      ),
      header: () => 'Status',
    }),
    columnHelper.accessor('options', {
      size: 37,
      id: 'options',
      cell: (info: any) => {
        const options = [
          {
            label: 'Add to draft order',
            value: 'draft-order',
            action: () => hanldeAddToDraftOrder?.(info?.row?.original?.id),
          },
          {
            label:
              type === 'products'
                ? 'Add to collection'
                : 'Remove from collection',
            value: type === 'products' ? 'add-collection' : 'remove-collection',
            action: () => handleAddToCollection?.(info?.row?.original?.id),
          },
          {
            label: 'Delete',
            value: 'delete',
            action: () => handleDeleteProduct?.(info?.row?.original?.id),
          },
        ];

        return (
          <div>
            <DropdownMenu
              className={type === 'collection' ? '!w-[165px]' : ''}
              options={options}
              variant="dots"
            />
          </div>
        );
      },
      header: () => '',
    }),
  ];

  return (
    <div>
      <Table
        tableData={products}
        columns={columns}
        className="w-full max-w-[1119px] [&>tbody>tr>td]:pt-4"
      />
      {!products.length && (
        <div className="max-w-[563] text-center">
          <Paragraph size="base" className="!text-shades-black !font-light">
            No data found!
          </Paragraph>
        </div>
      )}
    </div>
  );
};

export default ListTable;
