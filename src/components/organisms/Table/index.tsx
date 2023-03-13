import { FC, useMemo, useState } from 'react';
import clsx from 'clsx';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { TableHead } from '@/components/molecules/TableHead';
import { TableBody } from '@/components/molecules/TableBody';
// import { CollectionGraphqlDto, OrderGraphqlDto, ProductGraphqlDto } from "@/generated/types";

export interface TableProps {
  tableData: any[];
  columns: any[];
  className?: string;
}

export const Table: FC<TableProps> = ({
  tableData,
  columns,
  className = '',
}) => {
  const [data, setData] = useState(tableData);
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
        <TableBody table={table} />
      </table>
      <div className="h-4" />
    </div>
  );
};
