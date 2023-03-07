import React from "react";
import OrderListTable from "../../../../components/organisms/Tables/Product/OrderListTable";
import OrderDetails from "../../../../components/molecules/OrderDetails/OrderDetails";
import Dropdown from "../../../../components/molecules/Dropdown";
import Input from "../../../../components/molecules/Inputs/Input";
import { TotalQuantity } from "../../../../components/atoms/TotalQuantity/TotalQuantity";
import { Button } from "../../../../components/molecules/Button";
import { gql, useQuery } from "@apollo/client";
import { useRouter } from "next/router";

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

  const columnData = {
    column1: [
      {
        key: "Purchase order",
        value: "092356",
      },
      {
        key: "Retailer",
        value: "Selfrdiges",
      },
      {
        key: "Buyer name",
        value: "Julie McKenzie",
      },
      {
        key: "Email address",
        value: "jem@selfridges.com",
      },
    ],
    column2: [
      {
        key: "Billing address",
        value:
          "Yox Net-A-Porter Group SPA (DC4) C/O Class S.P.A NET-A-PORTER Inbound Stock Via Privata Paolo Baffi, 2 Landriano (Pavia), 27015 Italy",
      },
      {
        key: "Delivery address",
        value:
          "Yox Net-A-Porter Group SPA (DC4) C/O Class S.P.A NET-A-PORTER Inbound Stock Via Privata Paolo Baffi, 2 Landriano (Pavia), 27015 Italy",
      },
    ],
    column3: [
      {
        key: "Payment terms",
        value: "Net 60",
      },
      {
        key: "Delivery lead time",
        value: "09/03/2023 - 12/06/2023",
      },
      {
        key: "Last updated",
        value: "09/03/2023",
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
  const { loading, error, data } = useQuery(GET_ORDER_BY_ID, {
    variables: { orderId: orderId },
  });
  console.log({ data, error, loading });

  const handleDropdownChange = () => {
    console.log("DropDown Changed");
  };
  const handleError = () => {
    console.log("Error Handled");
  };
  const handleChange = () => {
    console.log("Input Changes Handled");
  };

  return (
    <div className="container">
      Order Preview
      <OrderDetails
        column1={columnData.column1}
        column2={columnData.column2}
        column3={columnData.column3}
      />
      <div className="flex flex-wrap">
        <Dropdown
          options={dropdownmenu}
          isValid={true}
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
      <Button variant="outlined" label="Export" />
      <OrderListTable products={[]} />
    </div>
  );
}

export default OrderPreview;
