import { FC } from 'react';
import clsx from 'clsx';
import { flexRender } from '@tanstack/react-table';
import styles from './TableHead.module.css';
import { fonts } from '@/config/fonts';

interface TableHeadProps {
  table: any;
  className?: string;
}

export const TableHead: FC<TableHeadProps> = ({ table, className = '' }) => {
  const { getHeaderGroups } = table;

  return (
    <thead className={clsx(styles.theadStyle, 'min-h-[40px]')}>
      {getHeaderGroups().map((headerGroup: any) => (
        <tr
          className="z-[5]"
          key={headerGroup.id}
          id="table-header"
        >
          {headerGroup.headers.map((header: any) => (
            <th
              className={clsx(
                'sticky top-0 py-3 px-4 text-[#fff] bg-neutral-700 first:text-left first:rounded-tl first:rounded-bl last:rounded-tr last:rounded-br z-[1]',
                fonts.text.md,
                fonts.fontWeights.regular,
                className
              )}
              style={{
                width: (header?.column?.getSize() || 150) + 'px',
              }}
              key={header.id}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};
