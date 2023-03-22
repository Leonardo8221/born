import { FC, useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { TableHead } from '@/components/molecules/TableHead';
import { TableBody } from '@/components/molecules/TableBody';

export interface TableProps {
  tableData: any[];
  columns: any[];
  className?: string;
  loading?: boolean;
  size?: boolean;
  editMode?: boolean;
  handleQuantities?: (val: string, id: number) => void;
  handleOrderNote?: (val: string, id: number, details: any) => void;
}

export const Table: FC<TableProps> = ({
  tableData = [],
  columns,
  className = '',
  loading = false,
  editMode = false,
  size,
  handleQuantities,
  handleOrderNote,
}) => {
  const [data, setData] = useState([...tableData]);

  useEffect(() => {
    if (tableData && Array.isArray(tableData) && tableData.length) {
      setData(tableData);
    } else {
      setData([])
    }
  }, [tableData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const colWidthStyle = useMemo(
    () =>
      table.getVisibleFlatColumns()?.map(({ columnDef: col }: any) => {
        if (col.minWidth && col.maxWidth)
          return `minmax(${col.minWidth}, ${col.maxWidth})`;
        if (col.minWidth) return `minmax(${col.minWidth}, 1fr)`;
        if (col.maxWidth) return `minmax(150px, ${col.maxWidth})`;

        return `minmax(150px, 1fr)`;
      }),
    [table.getVisibleFlatColumns()]
  );

  return (
    <div>
      <table
        className={clsx('border-collapse', className)}
        style={{ gridTemplateColumns: colWidthStyle.join(' ') }}
      >
        <TableHead table={table} />
        <TableBody
          handleQuantities={handleQuantities}
          handleOrderNote={handleOrderNote}
          size={size}
          loading={loading}
          table={table}
          editMode={editMode}
        />
      </table>
      <div className="h-4" />
    </div>
  );
};
