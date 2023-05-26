import { filter } from "lodash";
import { useCallback } from "react";

interface Props {
  orderDetailSizes: any;
  editMode?: boolean;
  handleQuantities?: (val: string, id: number) => void;
}

const TableComponent: React.FC<Props> = ({
  orderDetailSizes,
  handleQuantities,
  editMode,
}) => {
  return (
    <div className="text-[12px] text-[#333333]">
      <div className="flex items-center border border-[#D8D8D8] h-[39px] rounded-t">
        <h2 className="border-r border-[#D8D8D8] px-[55px] py-[10px] pr-[169px] pl-[10px]">
          Sizes
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
        <h2 className="border-r border-[#D8D8D8] px-[55px] py-[10px] pr-[141px] pl-[10px]">
          Quantities
        </h2>
        {orderDetailSizes?.map((item: any) => (
          <p
            key={item.id}
            className="border-r border-[#D8D8D8] w-[110px] text-center overflow-hidden"
          >
            <input
              type="number"
              min="0"
              disabled={!editMode}
              onChange={(e: any) =>
                handleQuantities && handleQuantities(e.target.value, item.id)
              }
              key={item.quantity}
              defaultValue={item.quantity}
              className="outline-none border-r bg-none border-[#D8D8D8] w-[110px] p-[10px] text-center"
            />
          </p>
        ))}
      </div>
    </div>
  );
};

export default TableComponent;
