import { FC } from 'react';
import clsx from 'clsx';
import { flexRender } from '@tanstack/react-table';
import { fonts } from '@/config/fonts';

interface TableBodyProps {
  table: {
    getRowModel: any;
  };
  className?: string;
}

export const TableBody: FC<TableBodyProps> = ({ table, className = '' }) => {
  const { getRowModel } = table;

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
