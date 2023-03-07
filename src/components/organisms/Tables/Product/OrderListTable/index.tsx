import { FC } from "react";
import { createColumnHelper } from "@tanstack/react-table";
import clsx from "clsx";
import ImageText from "@/components/molecules/ImageText";
import { Icon } from "@/components/molecules/Icon";
import { fonts } from "@/config/fonts";
import { Table } from "../../../Table";
import Badges from "../Badges";

export interface OrderListTableProps {
  products: any[];
}

const OrderListTable: FC<OrderListTableProps> = ({ products }) => {
  const columnHelper: any = createColumnHelper();

  const columns = [
    columnHelper.accessor((row: any) => row, {
      size: 222,
      id: "name",
      cell: ({ row }: any) => (
        <div>
          <ImageText
            title={row?.original?.name || ""}
            subTitle={row?.original?.title || ""}
            imgSrc={row?.original?.imageUrl}
            altText={row?.original?.title + " logo"}
            variant="product"
          />
        </div>
      ),
      header: () => "Product name",
    }),
    columnHelper.accessor("colors", {
      size: 122,
      id: "colors",
      cell: (info: any) => {
        const colors = info.getValue();
        return (
          <div className="flex flex-col gap-y-2">
            {colors.map((item: any) => (
              <div key={item.label} className="flex items-center gap-x-2">
                <div
                  className="h-4 w-4 rounded border-2 border-shades-white"
                  style={item.value && { backgroundColor: item.value }}
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        );
      },
      header: () => "Color name",
    }),
    columnHelper.accessor("season", {
      size: 96,
      id: "season",
      cell: (info: any) => <Badges items={info.getValue()} />,
      header: () => "Season",
    }),
    columnHelper.accessor("department", {
      size: 128,
      id: "department",
      cell: (info: any) => <Badges items={info.getValue()} />,
      header: () => "Department",
    }),
    columnHelper.accessor("wholesalePrice", {
      size: 153,
      id: "wholesalePrice",
      cell: (info: any) => (
        <div
          className={clsx(
            "text-shades-black tracking-[0.06em] text-center",
            fonts.text.xl
          )}
        >
          {info.getValue()}
        </div>
      ),
      header: () => "Wholesale Price",
    }),
    columnHelper.accessor("quantities", {
      size: 95,
      id: "quantites",
      cell: (info: any) => (
        <div
          className={clsx(
            "text-shades-black tracking-[0.06em] text-center",
            fonts.text.xl
          )}
        >
          {info.getValue()}
        </div>
      ),
      header: () => "Quantities",
    }),
    columnHelper.accessor("totalWholesalePrice", {
      size: 180,
      id: "totalWholesalePrice",
      cell: (info: any) => (
        <div
          className={clsx(
            "text-shades-black tracking-[0.06em] text-center",
            fonts.text.xl
          )}
        >
          {info.getValue()}
        </div>
      ),
      header: () => "Total Wholesale price",
    }),
    columnHelper.accessor("chat", {
      size: 124,
      id: "chat",
      cell: () => (
        <Icon
          name="icon-message-square"
          className="text-center cursor-pointer text-shades-black"
        />
      ),
      header: () => "",
    }),
  ];

  return (
    <Table
      tableData={products}
      columns={columns}
      className="w-full max-w-[1120px] [&>tbody>tr>td]:pt-4"
    />
  );
};

export default OrderListTable;
