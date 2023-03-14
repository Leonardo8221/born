import { useTable, Column } from 'react-table';

interface Props {
  data: Record<string, any>[];
  columns: Column<Record<string, any>>[];
}

const TableComponent: React.FC<Props> = ({ data, columns }) => {
  const { getTableProps, getTableBodyProps, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()} className="table w-full text-center">
      <tbody {...getTableBodyProps()} className="table-body ">
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              key={row.id}
              className="table-row text-#66666 w-[100px] border p-3"
            >
              {row.cells.map((cell, index) => (
                <td
                  {...cell.getCellProps()}
                  key={index}
                  className={'table-cell w-[144px] text-#66666 border p-3'}
                >
                  {cell.render('Cell')}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableComponent;
