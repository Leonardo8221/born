import React from "react";
import OrderListTable from "../../organisms/Tables/OrderList";

export const Confirmed = () => {
  const orders = [
    {
      buyerName: "Julie McKenzie",
      name: "Missoma X Selfridges - AW 23",
      orderDate: "02/09/23",
      retailerName: "Selfridges",
      season: "Spring 23",
      total: "33,034.00",
    },
    {
      buyerName: "Julie McKenzie",
      name: "Missoma X Selfridges - AW 23",
      orderDate: "02/09/23",
      retailerName: "Selfridges",
      season: "Spring 23",
      total: "33,034.00",
    },
    {
      buyerName: "Julie McKenzie",
      name: "Missoma X Selfridges - AW 23",
      orderDate: "02/09/23",
      retailerName: "Selfridges",
      season: "Spring 23",
      total: "33,034.00",
    },
    {
      buyerName: "Julie McKenzie",
      name: "Missoma X Selfridges - AW 23",
      orderDate: "02/09/23",
      retailerName: "Selfridges",
      season: "Spring 23",
      total: "33,034.00",
    },
  ];
  return (
    <div>
      <OrderListTable orders={[]} />
    </div>
  );
};
