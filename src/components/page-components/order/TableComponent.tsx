interface Props {
  orderDetailSizes: any;
  handleQuantities?: (val: string, id: number) => void;
}

const TableComponent: React.FC<Props> = ({
  orderDetailSizes,
  handleQuantities,
}) => {
  return (
    <div className="text-[12px] text-[#333333]">
      <div className="flex items-center border border-[#D8D8D8] h-[39px] rounded-t">
        <h2 className="border-r border-[#D8D8D8] px-[55px] py-[10px] pr-[173px] pl-3">
          Size
        </h2>
        {orderDetailSizes?.map((item: any) => (
          <p
            key={item.id}
            className="border-r border-[#D8D8D8] w-[110px] p-[10px] text-center"
          >
            {item.size}
          </p>
        ))}
      </div>
      <div className="flex items-center border border-[#D8D8D8] border-t-0 h-[39px] rounded-b">
        <h2 className="border-r border-[#D8D8D8] py-[10px] pr-[141px] pl-[10px]">
          Quantities
        </h2>
        {orderDetailSizes?.map((item: any) => (
          <p
            key={item.id}
            className="border-r border-[#D8D8D8] w-[110px] text-center overflow-hidden"
          >
            <input
              type="number"
              onChange={(e: any) =>
                handleQuantities && handleQuantities(e.target.value, item.id)
              }
              defaultValue={item.quantity}
              className="p-[10px] outline-none"
            />
          </p>
        ))}
      </div>
    </div>
  );
};

export default TableComponent;
