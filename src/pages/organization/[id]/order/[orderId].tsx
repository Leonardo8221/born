import React from "react";
import OrderListTable from "../../../../components/organisms/Tables/Product/OrderListTable";
import OrderDetails from "../../../../components/molecules/OrderDetails/OrderDetails";
import Dropdown from "../../../../components/molecules/Dropdown";
import Input from "../../../../components/molecules/Inputs/Input";
import { TotalQuantity } from "../../../../components/atoms/TotalQuantity/TotalQuantity";
import { Pill } from "../../../../components/atoms/Pill";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/page-components/order/Header";
import { GET_ORDER_BY_ID } from "../../../../queries/orders/details";
import { Button } from "@/components/molecules/Button";

function OrderPreview() {
  const router = useRouter();
  const orderId = Number(router?.query?.orderId);

  const { loading, error, data } = useQuery(GET_ORDER_BY_ID, {
    variables: { orderId: orderId },
  });
  console.log({ error });
  const details = data?.orderByOrderId || {};

  const columnData = {
    column1: [
      {
        key: "Purchase order",
        value: details?.purchase_order,
      },
      {
        key: "Retailer",
        value: details?.retailer,
      },
      {
        key: "Buyer name",
        value: details?.buyer_name,
      },
      {
        key: "Email address",
        value: details?.email_address,
      },
    ],
    column2: [
      {
        key: "Billing address",
        value: details?.billing_address,
      },
      {
        key: "Delivery address",
        value: details?.delivery_address,
      },
    ],
    column3: [
      {
        key: "Payment terms",
        value: details?.payment_terms,
      },
      {
        key: "Delivery lead time",
        value: "09/03/2023 - 12/06/2023",
      },
      {
        key: "Last updated",
        value: details?.last_updated,
      },
      {
        key: "Last modified",
        value: "Stephanie Lomal",
      },
    ],
  };
  const dropdownmenu = [
    {
      value: "0",
      name: "USD -Landed",
      isDisabled: false,
    },
    {
      value: "1",
      name: "Option A",
      isDisabled: false,
    },
    {
      value: "2",
      name: "Option B",
      isDisabled: true,
    },
    {
      value: "3",
      name: "Option C",
      isDisabled: false,
    },
  ];

  const handleDropdownChange = () => {
    console.log("DropDown Changed");
  };
  const handleError = () => {
    console.log("Error Handled");
  };
  const handleChange = () => {
    console.log("Input Changes Handled");
  };

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div>
      <Header heading={"Missoma X Selfridges - AW23"} />
      <div className="max-w-[1240px] mx-auto min-h-[calc(100vh-170px)] pt-[72px]">
        <div className="mb-6 pl-[1100px]">
          <Button variant="outlined">Edit Details</Button>
        </div>
        <div className="w-[1000px]">
          <OrderDetails
            column1={columnData.column1}
            column2={columnData.column2}
            column3={columnData.column3}
          />
        </div>
        <div className="flex items-center shadow-lg shadow-xlg-top bg-white pl-[16px] p-6 my-7 ">
          <Dropdown
            options={dropdownmenu}
            isValid={false}
            label="Select Category"
            onChange={handleDropdownChange}
          />
          <Input
            value="90%"
            label="Discount"
            type="text"
            name="Brand"
            isError={false}
            isValid={false}
            onError={handleError}
            onChange={handleChange}
          />
          <Input
            value="100"
            label="Surcharge"
            type="text"
            name="Brand"
            isError={false}
            isValid={false}
            onError={handleError}
            onChange={handleChange}
          />
          <TotalQuantity title="Total Quantity" value={30} />
          <TotalQuantity title="Total price" value={3345.0} />
        </div>
        <div className="mb-6 pl-[1140px]">
          <Button variant="outlined">Select</Button>
        </div>
        <OrderListTable products={details.order_details} />
      </div>
      <Footer />
    </div>
  );
}

export default OrderPreview;
