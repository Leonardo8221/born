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
import productPlaceholderImage from '@/assets/images/product-image.png';
import { PriceGraphqlDto, ProductGraphqlDto } from '@/generated/types';

export interface ListTableProps {
  products: ProductGraphqlDto[];
}

const ListTable: FC<ListTableProps> = ({ products }) => {
  const columnHelper: any = createColumnHelper();

  const getPriceList = (prices?: PriceGraphqlDto[]) => {
    const items = prices?.map((item: any) => {
      const keys = Object.keys(item || {});
      const priceKeys = ['exworks', 'landed', 'retail']
      return {
        currency: item?.currency,
        items: keys?.map((i: any) => priceKeys.includes(i) && ({
          label: i,
          price: item?.[i] || '',
        }) || [])
      }
    })
    console.log(items)
    return items as any;
  }

  const options = [
    {
      label: 'Add to draft order',
      value: 'draft-order',
      action: () => console.log('Added to draft order'),
    },
    {
      label: 'Add to collections',
      value: 'add-collection',
      action: () => console.log('Added to collections!'),
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
        <div className='max-w-[221px]'>
          <ImageText
            title={row?.original?.style_name || ''}
            subTitle={row?.original?.style_number || ''}
            altText={row?.original?.style_name + 'logo'}
            imgSrc={row?.original?.imageUrl || productPlaceholderImage}
            variant="product"
            titleClassName='max-w-[125px] overflow-hidden text-ellipsis whitespace-nowrap'
          />
        </div>
      ),
      header: () => "Product name",
    }),
    columnHelper.accessor('colour_families', {
      size: 122,
      id: "colour_families",
      cell: (info: any) => {
        const colour_families = info.getValue();
        return (
          <div className='flex flex-col gap-y-2'>
            {colour_families?.map((item: any, index: number) => index === 0 && (
              <div key={item} className='flex items-center gap-x-2'>
                <div
                  className="h-4 w-4 rounded border-2 border-shades-white"
                  style={item && { backgroundColor: item }}
                />
                <span>{item}</span>
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
      cell: (info: any) => <Badges items={['SS23']} />,
      header: () => "Season",
    }),
    columnHelper.accessor('collections', {
      size: 190,
      id: "collections",
      cell: (info: any) => <Badges items={info?.getValue()?.map((item: any) => item?.name) || []} />,
      header: () => "Collections",
    }),
    columnHelper.accessor('associated_prices', {
      size: 105,
      id: "currencies",
      cell: (info: any) => (
        <div className={clsx('text-shades-black tracking-[0.06em]', fonts.text.sm)}>
          {info.getValue()?.map?.((item: any) => item?.currency)?.join(', ')}
        </div>
      ),
      header: () => "Currency",
    }),
    columnHelper.accessor('associated_prices', {
      size: 271,
      id: "associated_prices",
      cell: (info: any) => (
        <div className='[&>div]:flex-wrap'>
          {getPriceList?.(info.getValue() || []).map((item: any) => (
            <ListPrices key={item.currency} items={item?.items || []} isSmall />
          ))}
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
