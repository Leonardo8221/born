import DescriptionField from '@/components/molecules/DescriptionField/DescriptionField';

interface Props {
  size: Record<string, any>[];
  quantity: Record<string, any>[];
  description?: string;
  handleDescription: (val: string) => void;
}

const TableComponent: React.FC<Props> = ({
  size,
  quantity,
  description,
  handleDescription,
}) => {
  return (
    <table className="table w-full text-[12px] !border-none">
      <tbody className="!border-none">
        <tr className="h-[39px] !border-none">
          <td className="border border-[#D8D8D8] w-[144px] px-3">Size</td>
          {size.map((item, index) => (
            <td
              key={index}
              className={'border border-[#D8D8D8] p-3 text-center'}
            >
              {item.value}
            </td>
          ))}
        </tr>
        <tr className="h-[39px] !border-none">
          <td className="border border-[#D8D8D8] w-[144px] px-3">Quantity</td>
          {quantity.map((item, index) => (
            <td
              key={index}
              className={'border border-[#D8D8D8] p-3 text-center'}
            >
              {item.value}
            </td>
          ))}
        </tr>
        <tr>
          <td colSpan={2}>
            <DescriptionField
              onChange={handleDescription}
              value={description}
              className="mt-4 w-full"
              label="Product Note"
              placeholder="This Product...."
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default TableComponent;
