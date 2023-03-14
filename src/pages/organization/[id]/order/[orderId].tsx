import React, { useState } from 'react';
import OrderListTable from '../../../../components/organisms/Tables/Product/OrderListTable';
import OrderDetails from '../../../../components/molecules/OrderDetails/OrderDetails';
import Dropdown from '../../../../components/molecules/Dropdown';
import Input from '../../../../components/molecules/Inputs/Input';
import { TotalQuantity } from '../../../../components/atoms/TotalQuantity/TotalQuantity';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Footer from '@/components/layouts/Footer';
import Header from '@/components/page-components/order/Header';
import { GET_ORDER_BY_ID } from '../../../../queries/orders/details';
import { Button } from '@/components/molecules/Button';

function OrderPreview() {
  const router = useRouter();
  const orderId = Number(router?.query?.orderId);
  const [editMode, setEditMode] = useState(false);
  const { loading, error, data } = useQuery(GET_ORDER_BY_ID, {
    variables: { orderId: orderId },
  });
  const details = data?.orderByOrderId || {};
  const handleEditInputs = (key: any, val: string) => {
    console.log(val, key);
  };

  const columnData = {
    column1: [
      {
        key: 'Purchase order',
        value: details?.purchase_order,
      },
      {
        key: 'Retailer',
        value: details?.retailer,
      },
      {
        key: 'Buyer name',
        value: details?.buyer_name,
      },
      {
        key: 'Email address',
        value: details?.email_address,
      },
    ],
    column2: [
      {
        key: 'Billing address',
        value: details?.billing_address,
      },
      {
        key: 'Delivery address',
        inputType: 'textarea',
        value: details?.delivery_address,
      },
    ],
    column3: [
      {
        key: 'Payment terms',
        value: details?.payment_terms,
      },
      {
        key: 'Delivery lead time',
        value: '09/03/2023 - 12/06/2023',
      },
      {
        key: 'Last updated',
        value: details?.last_updated,
      },
      {
        key: 'Last modified',
        value: 'Stephanie Lomal',
      },
    ],
  };
  const dropdownmenu = [
    {
      value: '0',
      name: 'USD -Landed',
      isDisabled: false,
    },
    {
      value: '1',
      name: 'Option A',
      isDisabled: false,
    },
    {
      value: '2',
      name: 'Option B',
      isDisabled: true,
    },
    {
      value: '3',
      name: 'Option C',
      isDisabled: false,
    },
  ];

  const handleDropdownChange = () => {
    console.log('DropDown Changed');
  };
  const handleError = () => {
    console.log('Error Handled');
  };
  const handleChange = () => {
    console.log('Input Changes Handled');
  };

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div className="mx-auto overflow-x-hidden">
      <Header heading={'Missoma X Selfridges - AW23'} />
      <div className="mx-auto w-full max-w-[1440px] px-16 py-16">
        <div className="bg-[#fff]]">
          <div className="flex flex-1 justify-end mb-6">
            <div className="flex items-center">
              <Button
                onClick={() => setEditMode(true)}
                variant="outlined"
                className="bg-[#E8E8E8] text-[#333333] !text-[12px] !font-normal mr-[14px]"
              >
                Edit Details
              </Button>
              <Button
                onClick={() => setEditMode(false)}
                className="!text-[12px] !font-normal"
              >
                Save
              </Button>
            </div>
          </div>
          <div>
            <OrderDetails
              editMode={editMode}
              handleEditInputs={handleEditInputs}
              column1={columnData.column1}
              column2={columnData.column2}
              column3={columnData.column3}
            />
          </div>
          <div className="flex px-9 py-10 shadow-sm rounded-md">
            <Dropdown
              options={dropdownmenu}
              isValid={false}
              label="Select Category"
              onChange={handleDropdownChange}
              className="mr-8"
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
              className="mr-8"
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
              className="mr-8"
            />
            <TotalQuantity title="Total Quantity" value={30} />
            <TotalQuantity title="Total price" value={3345.0} />
          </div>
        </div>
        <div className="py-6 !flex !justify-end">
          <div className="flex-1"></div>
          <Button
            variant="outlined"
            className="!max-w-[74px] !text-[12px] !font-normal"
          >
            Select
          </Button>
        </div>
        <OrderListTable products={details.order_details} />
      </div>
      <Footer />
    </div>
  );
}

export default OrderPreview;
