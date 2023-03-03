import PropTypes from "prop-types";
import clsx from "clsx";
import { flexRender } from "@tanstack/react-table";
import { fonts } from "../../../config/fonts";

export const TableBody = ({ table, className = "" }) => {
  const { getRowModel } = table;

  return (
    <tbody>
      {getRowModel().rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td
              className={clsx(
                "px-3 font-normal min-h-[80px] first:!pl-0",
                fonts.text.md,
                fonts.fontWeights.light,
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

TableBody.propTypes = {
  table: PropTypes.shape({
    getRowModel: PropTypes.func,
  }).isRequired,
  className: PropTypes.string,
};
