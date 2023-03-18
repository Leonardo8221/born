import { log } from 'console';

interface Props {
  size: Record<string, any>[];
  quantity: Record<string, any>[];
}

const TableComponent: React.FC<Props> = ({ size, quantity }) => {
  size.map((item) => {
    console.log(item.value);
  });

  return (
    <table className="table w-full text-[12px]">
      <tbody className=" ">
        <tr className="h-[39px]">
          <td className="border w-[144px] px-3">Size</td>
          {size.map((item, index) => (
            <td key={index} className={' border p-3 text-center'}>
              {item.value}
            </td>
          ))}
        </tr>
        <tr className="h-[39px]">
          <td className="border w-[144px] px-3">Quantity</td>
          {quantity.map((item, index) => (
            <td key={index} className={'border p-3 text-center'}>
              {item.value}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};

export default TableComponent;
