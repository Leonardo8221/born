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
import { formatCurrency } from '@/utils/formatCurrency';

export interface ListTableProps {
  products: ProductWithCollectionsGraphqlDto[];
  hanldeAddToDraftOrder?: (id: number) => void;
  handleAddToCollection?: (id: number) => void;
  handleDeleteProduct?: (id: number) => void;
  isSelectable?: boolean;
  selectedProducts?: Array<number | string>;
  onSelect?: ({
    id,
    selectedVariant,
  }: {
    id: number;
    selectedVariant: number;
    isVariant?: boolean;
  }) => void;
  type?: 'products' | 'collection';
  selectedVariants?: number[];
}

const ListTable: FC<ListTableProps> = ({
  products,
  handleAddToCollection,
  handleDeleteProduct,
  hanldeAddToDraftOrder,
  isSelectable,
  onSelect,
  type = 'products',
  selectedVariants,
  selectedProducts,
}) => {
  const columnHelper: any = createColumnHelper();

  const getPriceList = (prices?: PriceGraphqlDto[]) => {
    const items = prices?.map((item: any) => {
      const keys = Object.keys(item || {});
      const priceKeys = ['exworks', 'landed', 'retail'];
      console.log(item.currency);
      return {
        currency: item?.currency,
        items: keys?.map(
          (i: any) =>
            (priceKeys.includes(i) && {
              label: i,
              price:
                item?.[i] || item?.[i] === 0
                  ? formatCurrency(item.currency).format(item?.[i])
                  : null,
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
      cell: ({ row }: any) => {
        const getSelectedVariantImageUrl = () => {
          if (
            row?.original?.productVariants?.some((variant: any) =>
              selectedVariants?.includes(variant?.id)
            )
          ) {
            const images: any = row?.original?.productVariants?.filter(
              (item: any) => selectedVariants?.includes(item?.id)
            )?.[0]?.attachments?.[0];
            return images?.medium_image_url;
          } else {
            return row?.original?.attachments?.[0]?.medium_image_url;
          }
        };

        return (
          <div className="min-w-[221px]">
            <ImageText
              isSelectable={isSelectable}
              onSelect={() =>
                onSelect?.({
                  id: row?.original?.id,
                  selectedVariant: row?.original?.id,
                })
              }
              isSelected={selectedProducts?.includes(row?.original?.id)}
              title={row?.original?.style_name || ''}
              subTitle={row?.original?.style_number || ''}
              altText={row?.original?.style_name + 'logo'}
              imgSrc={getSelectedVariantImageUrl()}
              variant="product"
              titleClassName="max-w-[125px]"
            />
          </div>
        );
      },
      header: () => 'Product name',
    }),
    columnHelper.accessor('colour_families', {
      size: 122,
      id: 'colour_families',
      cell: (info: any) => {
        const colour_families = info.getValue();
        const id = info?.row?.original?.id;
        const variants = info?.row?.original?.productVariants || [];
        return (
          <div>
            <div className="flex items-center gap-2">
              <div>
                <VariantColors
                  colors={colour_families || []}
                  type="card"
                  active={
                    selectedVariants?.includes(info?.row?.original?.id) ||
                    !variants.some((item: any) =>
                      selectedVariants?.includes(item?.id)
                    )
                  }
                  onClick={(e) => {
                    e.preventDefault();
                    onSelect?.({
                      id,
                      selectedVariant: id,
                      isVariant: true,
                    });
                  }}
                />
              </div>
              <div>
                <div
                  className={clsx(
                    'text-shades-black tracking-[0.06em] max-w-[80px] break-words',
                    fonts.text.sm
                  )}
                  title={info?.row?.original?.colour_name}
                >
                  {info?.row?.original?.colour_name}
                </div>
              </div>
            </div>
            {info?.row?.original?.productVariants?.map((item: any) => (
              <div className="flex items-center gap-2 mt-2" key={item?.id}>
                <div>
                  <VariantColors
                    colors={item?.colour_families || []}
                    type="card"
                    onClick={(e) => {
                      e.preventDefault();
                      onSelect?.({
                        id,
                        selectedVariant: item?.id,
                        isVariant:
                          selectedVariants?.includes(id) ||
                          selectedVariants?.includes(item?.id)
                            ? true
                            : false,
                      });
                    }}
                    active={selectedVariants?.includes(item.id)}
                  />
                </div>
                <div>
                  <div
                    className={clsx(
                      'text-shades-black tracking-[0.06em] !max-w-[80px] break-words',
                      fonts.text.sm
                    )}
                    title={item?.colour_name}
                  >
                    {item?.colour_name}
                  </div>
                </div>
              </div>
            ))}
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
