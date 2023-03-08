import React from "react";
import OrderListTable from "../../../../components/organisms/Tables/Product/OrderListTable";
import OrderDetails from "../../../../components/molecules/OrderDetails/OrderDetails";
import Dropdown from "../../../../components/molecules/Dropdown";
import Input from "../../../../components/molecules/Inputs/Input";
import { TotalQuantity } from "../../../../components/atoms/TotalQuantity/TotalQuantity";
// import { Button } from "../../../../components/molecules/Button";
import { Pill } from "../../../../components/atoms/Pill";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Heading } from "../../../../components/molecules/Heading";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/page-components/order/Header";

const GET_ORDER_BY_ID = gql`
  query GetOrderByID($orderId: BigInteger!) {
    orderByOrderId(orderId: $orderId) {
      id
      billing_address
      buyer_name
      created_date
      delivery_address
      discount
      email_address
      last_modified_by
      last_updated
      note
      payment_terms
      pricing_condition
      purchase_order
      retailer
      approved
      cancelled
      confirmed
      size
      retailer
      order_details {
        note
        quantity
        product {
          id
          description
          colour_code
          colour_name
          colour_families
          associated_prices {
            currency
            exworks
            landed
            retail
          }
          first_category
          second_category
          third_category
          fourth_category
          compositions
          country_of_origin
          delivery_lead_time
          delivery_window_end_date
          delivery_window_start_date
          description
          upc
          style_number
          style_id
          size_type
          size_options
          size_category
          season
          min_order_value
          min_order_quantity
          measurements
          materials
        }
      }
    }
  }
`;

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
      name: "Clothing",
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
  console.log({ details });

  return (
    <div>
      <Header heading={"Missoma X Selfridges - AW23"} />
      <div className="max-w-[1240px] mx-auto min-h-[calc(100vh-170px)] pt-[72px]">
        <div className="mb-6 flex flex-row-reverse">
          <Pill label="Export" appearance={"outlined"} size={"md"} />
        </div>
        <div className="w-[1000px]">
          <OrderDetails
            column1={columnData.column1}
            column2={columnData.column2}
            column3={columnData.column3}
          />
        </div>
        <div className="flex shadow-lg shadow-xlg-top bg-white p-6 my-7">
          <Dropdown
            options={dropdownmenu}
            isValid={false}
            label="Select Category"
            onChange={handleDropdownChange}
          />
          <Input
            value="90"
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
            label="Discount"
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
        <div className="mb-6 flex flex-row-reverse">
          {/* <Button variant="outlined" label="Export" size="sm" /> */}
          <Pill label="Export" appearance={"outlined"} size={"md"} />
        </div>
        <OrderListTable products={[]} />
      </div>
      <Footer />
    </div>
  );
}

export default OrderPreview;
