import DescriptionField from '@/components/molecules/DescriptionField/DescriptionField';

interface Props {
  sizeAndQuantity: any;
  description?: string;
  handleDescription: (val: string) => void;
}

const TableComponent: React.FC<Props> = ({
  sizeAndQuantity,
  description,
  handleDescription,
}) => {
  const quanityAndSize =
    (sizeAndQuantity &&
      sizeAndQuantity.map((item: any) => {
        return item.order_detail_sizes;
      })) ||
    [];

  return (
    <div className="text-[12px] text-[#333333]">
      <div className="flex items-center border border-[#D8D8D8] h-[39px] rounded-t">
        <h2 className="border-r border-[#D8D8D8] px-[55px] py-[10px] pr-[173px] pl-3">
          Size
        </h2>
        {quanityAndSize[0] &&
          quanityAndSize[0].map((item: any) => (
            <p
              key={item.id}
              className="border-r  border-[#D8D8D8] w-[110px] p-[10px] text-center"
            >
              {item.size}
            </p>
          ))}
      </div>
      <div className="flex items-center border border-[#D8D8D8] border-t-0 h-[39px] rounded-b">
        <h2 className="border-r border-[#D8D8D8] py-[10px] pr-[141px] pl-[10px]">
          Quantities
        </h2>
        {quanityAndSize[0] &&
          quanityAndSize[0].map((item: any) => (
            <p
              key={item.id}
              className="border-r  border-[#D8D8D8] w-[110px] p-[10px] text-center"
            >
              {item.quantity}
            </p>
          ))}
      </div>
    </div>
  );
};

export default TableComponent;
