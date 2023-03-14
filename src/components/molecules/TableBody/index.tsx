import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import { flexRender } from '@tanstack/react-table';
import { fonts } from '@/config/fonts';
import Loading from '@/components/page-components/Loading';

interface TableBodyProps {
  table: {
    getRowModel: any;
  };
  className?: string;
  loading?: boolean;
}

export const TableBody: FC<TableBodyProps> = ({
  table,
  className = '',
  loading,
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
        ))}
    </tbody>
  );
};
