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
  handleQuantities?: (val: string, orderDetailId: number, id: number) => void;
  handleOrderNote?: (val: string, id: number, details: any) => void;
}

export const Table: FC<TableProps> = ({
  tableData,
  columns,
  className = '',
  loading = false,
  editMode = false,
  size,
  handleQuantities,
  handleOrderNote,
}) => {
  // const [data, setData] = useState<any[]>([]);

  // useEffect(() => {
  //   if (tableData && Array.isArray(tableData)) {
  //     setData(tableData);
  //   }
  // }, [tableData]);

  const table = useReactTable({
    data: tableData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table
        className={clsx('table border-collapse', className)}
        style={{ tableLayout: 'fixed' }}
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
