import PropTypes from "prop-types";
import clsx from "clsx";
import { flexRender } from "@tanstack/react-table";
import styles from "./TableHead.module.css";
import { fonts } from "../../../config/fonts";

export const TableHead = ({ table, className = "" }) => {
  const { getHeaderGroups } = table;

  return (
    <thead className={clsx(styles.theadStyle, "min-h-[40px]")}>
      {getHeaderGroups().map((headerGroup) => (
        <tr className="min-h-[40px]" key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              className={clsx(
                "font-normal py-3 px-4 text-shades-white bg-neutral-700 first:text-left first:rounded-tl first:rounded-bl last:rounded-tr last:rounded-br",
                fonts.text.md,
                fonts.fontWeights.regular,
                className
              )}
              style={{
                minWidth: (header?.column?.getSize() || 150) + 'px',
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

TableHead.propTypes = {
  table: PropTypes.shape({
    getHeaderGroups: PropTypes.func,
  }).isRequired,
  className: PropTypes.string,
};
