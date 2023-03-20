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
  size?: boolean;
  handleQuantities?: (val: string, id: number) => void;
  handleOrderNote?: (val: string, details: any) => void;
}

export const TableBody: FC<TableBodyProps> = ({
  table,
  className = '',
  loading,
  size = false,
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
        getRowModel().rows.map((row: any) => (
          <>
            <tr key={row.id}>
              {row.getVisibleCells().map((cell: any) => (
                <td
                  className={clsx(
                    'px-3 font-normal min-h-[80px] first:!pl-0',
                    fonts.text.md,
                    fonts.fontWeights.light
                  )}
                  style={{
                    minWidth: (cell?.column?.getSize() || 150) + 'px',
                  }}
                  key={cell.id}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
            {size && (
              <tr>
                <td colSpan={row.getVisibleCells().length}>
                  <TableComponent
                    handleQuantities={handleQuantities}
                    orderDetailSizes={
                      row.getVisibleCells()[0].row.original.order_detail_sizes
                    }
                  />
                  <DescriptionField
                    onChange={(val) =>
                      handleOrderNote(
                        val,
                        row.getVisibleCells()[0].row.original.order_detail_sizes
                      )
                    }
                    value={row.getVisibleCells()[0].row.original.note}
                    className="mb-8 mt-4 w-2/3"
                    label="Order Note"
                    placeholder="This Order...."
                  />
                </td>
              </tr>
            )}
          </>
        ))}
    </tbody>
  );
};
