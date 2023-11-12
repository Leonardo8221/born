import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import { flexRender } from '@tanstack/react-table';
import { fonts } from '@/config/fonts';
import Loading from '@/components/page-components/Loading';
import TableComponent from '@/components/page-components/order/TableComponent';
import DescriptionField from '@/components/molecules/DescriptionField/DescriptionField';
interface TableBodyProps {
  table: {
    getRowModel: any;
  };
  className?: string;
  loading?: boolean;
  editMode?: boolean;
  size?: boolean;
  handleQuantities?: (
    val: number,
    orderIndex: number,
    sizeIndex: number
  ) => void;
  handleOrderNote?: (val: string, id: number, details: any) => void;
}

export const TableBody: FC<TableBodyProps> = ({
  table,
  className = '',
  loading,
  size = false,
  editMode = false,
  handleQuantities,
  handleOrderNote = () => {},
}) => {
  const { getRowModel } = table;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else setIsLoading(false);
  }, [loading]);

  if (isLoading) {
    return (
      <tr>
        <td className="text-center align-middle !w-full" colSpan={12}>
          <div className="py-16">
            <Loading />
          </div>
        </td>
      </tr>
    );
  }

  return (
    <tbody>
      {getRowModel()?.rows &&
        getRowModel().rows.map((row: any, index: number) => (
          <>
            <tr key={row.id} className="print:break-inside-avoid-page">
              {row.getVisibleCells().map((cell: any) => (
                <td
                  className={clsx(
                    'px-3 font-normal min-h-[80px] first:!pl-0',
                    fonts.text.md,
                    fonts.fontWeights.light
                  )}
                  style={{
                    width: (cell?.column?.getSize() || 150) + 'px',
                  }}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
            {size && (
              <tr>
                <td
                  colSpan={row.getAllCells().length}
                  className="!overflow-x-auto"
                >
                  <div className="w-full">
                    <TableComponent
                      editMode={editMode}
                      handleQuantities={(val: number, sizeIndex: number) =>
                        handleQuantities?.(val, index, sizeIndex)
                      }
                      orderDetailSizes={
                        row?.getVisibleCells()[0]?.row?.original
                          ?.order_detail_sizes
                      }
                    />
                  </div>
                  {row.getVisibleCells()[0].row.original.note && (
                    <DescriptionField
                      disabled={true}
                      onChange={(val) =>
                        handleOrderNote(
                          val,
                          row.getVisibleCells()[0].row.original.id,
                          row.getVisibleCells()[0].row.original
                            .order_detail_sizes
                        )
                      }
                      value={row.getVisibleCells()[0].row.original.note}
                      className="mb-8 mt-4 print:mt-10 w-2/3 disabled:!bg-shades-white"
                      label="Order Note"
                      placeholder="This Order...."
                    />
                  )}
                </td>
              </tr>
            )}
          </>
        ))}
    </tbody>
  );
};
