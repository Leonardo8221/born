import React, { useEffect, useState } from 'react';
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
import { OrderDetailResourceApi, OrderResourceApi } from 'client/command';
import { apiConfig } from '@/utils/apiConfig';
import Toast from '@/components/page-components/Toast';
import AddNote from '@/components/page-components/order/AddNote';

function OrderPreview() {
  const router = useRouter();
  const orderId = Number(router?.query?.orderId);
  const [editMode, setEditMode] = useState(false);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [orderDetails, setDetails] = useState<any>({
    surcharge: null,
    discount: null,
    category: {},
    note: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { loading, error, data, refetch } = useQuery(GET_ORDER_BY_ID, {
    variables: { orderId: orderId },
  });
  const details = data?.orderByOrderId;

  useEffect(() => {
    if (data && details) {
      setDetails((prev: any) => {
        if (JSON.stringify(prev) !== JSON.stringify(details)) {
          return details;
        }
        return prev;
      });
    }

    return () => setDetails({});
  }, [data]);

  const handleEditInputs = (key: any, val: any) => {
    let payload = { ...orderDetails };
    payload[key] = val;
    setDetails(payload);
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

  const handleErrorMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const handleSave = async () => {
    try {
      const config: any = await apiConfig();
      const api = new OrderResourceApi(config);
      api.apiOrderUpdateDraftOrderPut(orderId, orderDetails);
      refetch();
      setIsLoading(false);
      setEditMode(false);
      setSuccessMessage('Order modified successfully');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error: any) {
      handleErrorMessage(error?.response?.message || 'Order update failed');
      console.log(error);
    }
  };

  const handleSaveNote = async () => {
    try {
      const config: any = await apiConfig();
      const api = new OrderResourceApi(config);
      if (!orderNote && !orderNote.length) return;
      api.apiOrderUpdateDraftOrderPut(orderId, {
        ...orderDetails,
        note: orderNote,
      });
      setIsAddNoteOpen(!isAddNoteOpen);
      refetch();
      setSuccessMessage('Order note added successfully');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error: any) {
      handleErrorMessage(error?.response?.message || 'Order note failed');
      console.log(error);
    }
  };

  const handleDropdownChange = (val: any) => {
    setDetails({ ...orderDetails, category: val });
  };

  const handleError = () => {
    console.log('Error Handled');
  };

  const debounce = (func: Function, delay: number) => {
    let timerId: any;
    return (...args: any[]) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func.apply(null, args);
      }, 600);
    };
  };

  const handleQuantities = async (val: string, id: number) => {
    try {
      const payload = {
        note: '',
        order_detail_sizes: [
          {
            order_detail_size_id: id,
            quantity: Number(val),
          },
        ],
      };
      const config: any = await apiConfig();
      const api = new OrderResourceApi(config);
      api.apiOrderUpdateDraftOrderPut(orderId, payload);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDebouncedOrderNote = async (
    note: string,
    id: number,
    details: any
  ) => {
    try {
      const orderDetailSizes = details.map((item: any) => ({
        order_detail_size_id: item.id,
        quantity: item.quantity,
      }));
      const payload = {
        note,
        order_detail_sizes: [...orderDetailSizes],
      };
      const config: any = await apiConfig();
      const api = new OrderDetailResourceApi(config);
      api.apiOrderUpdateDraftOrderDetailPut(id, orderId, payload);
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedHandleQuantities = debounce(handleQuantities, 600);
  const debouncedOrderNote = debounce(handleDebouncedOrderNote, 600);

  const handleChange = (key: any, val: any) => {
    setDetails({ ...orderDetails, [key]: val });
  };

  if (loading) {
    return <>Loading...</>;
  }

  return (
    <div className="mx-auto overflow-x-hidden">
      <Header
        heading={orderDetails?.name}
        handleErrorMessage={handleErrorMessage}
        addNote={() => setIsAddNoteOpen(!isAddNoteOpen)}
      />
      <div className="mx-auto w-full max-w-[1440px] overflow-hidden px-16 py-16">
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
              {editMode && (
                <Button
                  onClick={handleSave}
                  className="!text-[12px] !font-normal"
                >
                  Save
                </Button>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <OrderDetails
              editMode={editMode}
              handleEditInputs={handleEditInputs}
              column1={columnData.column1}
              column2={columnData.column2}
              column3={columnData.column3}
            />
          </div>
          <div className="flex py-10 shadow-sm rounded-md">
            <Dropdown
              options={dropdownmenu}
              isValid={false}
              label="Select Category"
              onChange={(val) => handleDropdownChange(val)}
              className="mr-8 w-[278px] h-[56px]"
              selectedOption={orderDetails?.category}
            />
            <Input
              value={orderDetails?.discount}
              label="Discount"
              type="number"
              name="discount"
              isError={false}
              isValid={false}
              onError={handleError}
              onChange={(val) => handleChange('discount', val)}
              className="mr-8 !p-0 !max-h-[1px]"
            />
            <Input
              value={orderDetails?.surcharge}
              label="Surcharge"
              type="number"
              name="number"
              isError={false}
              isValid={false}
              onError={handleError}
              onChange={(val) => handleChange('surcharge', val)}
              className="mr-8"
            />
            <TotalQuantity
              title="Total Quantity"
              value={orderDetails?.totalQuantity}
            />
            <TotalQuantity
              title="Total price"
              value={orderDetails?.orderPrice}
            />
          </div>
        </div>
        <div className="py-6 !flex !justify-end">
          <div className="flex-1"></div>
          <Button
            disabled={editMode}
            variant="outlined"
            className="!max-w-[74px] !text-[12px] !font-normal"
          >
            Select
          </Button>
        </div>
        <OrderListTable
          handleQuantities={debouncedHandleQuantities}
          handleOrderNote={debouncedOrderNote}
          products={details?.order_details}
          editMode={editMode}
        />
      </div>
      <AddNote
        note={orderNote || orderDetails.note}
        handleSaveNote={handleSaveNote}
        isOpen={isAddNoteOpen}
        onClose={() => setIsAddNoteOpen(!isAddNoteOpen)}
        handleChange={setOrderNote}
      />
      <Toast errorMessage={errorMessage} successMessage={successMessage} />
      <Footer />
    </div>
  );
}

export default OrderPreview;
