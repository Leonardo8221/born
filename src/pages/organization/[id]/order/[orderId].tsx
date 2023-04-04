import React, { useEffect, useState } from 'react';
import OrderListTable from '@/components/organisms/Tables/Product/OrderListTable';
import OrderDetails from '@/components/molecules/OrderDetails/OrderDetails';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Footer from '@/components/layouts/Footer';
import Header from '@/components/page-components/order/Header';
import { GET_ORDER_BY_ID } from '@/queries/orders/details';
import { Button } from '@/components/molecules/Button';
import { OrderDetailResourceApi, OrderResourceApi } from 'client/command';
import { apiConfig } from '@/utils/apiConfig';
import Toast from '@/components/page-components/Toast';
import AddNote from '@/components/page-components/order/AddNote';
import Loading from '@/components/page-components/Loading';
import PricingCondition from '@/components/page-components/order/PricingCondition';
import useDebounce from '@/utils/debounce';

function OrderPreview() {
  const router = useRouter();
  const orderId = Number(router?.query?.orderId);
  const [editMode, setEditMode] = useState(false);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [orderDetails, setDetails] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [orderNote, setOrderNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [discount, setDiscount] = useState(-1);
  const [surcharge, setSurchange] = useState(-1);
  const [orderDetailId, setorderDetailId] = useState();
  const debouncedDiscount = useDebounce(discount, 600);
  const debouncedSurcharge = useDebounce(surcharge, 600);

  const { loading, data, refetch } = useQuery(GET_ORDER_BY_ID, {
    variables: { orderId: orderId },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only',
  });
  const details = data?.orderByOrderId;

  useEffect(() => {
    if (details) {
      setDetails(details);
    }
  }, [details]);

  useEffect(() => {
    const oId = Number(router?.query?.orderId);
    const update = async () => {
      try {
        const config: any = await apiConfig();
        const api = new OrderResourceApi(config);
        await api.apiOrderUpdateDraftOrderPut(oId, {
          ...orderDetails,
          discount: Number(debouncedDiscount),
        });
        refetch();
      } catch (error) {
        console.error(error);
      }
    };
    debouncedDiscount !== -1 && update();
  }, [debouncedDiscount]);

  useEffect(() => {
    const oId = Number(router?.query?.orderId);
    const update = async () => {
      try {
        const config: any = await apiConfig();
        const api = new OrderResourceApi(config);
        await api.apiOrderUpdateDraftOrderPut(oId, {
          ...orderDetails,
          surcharge: Number(debouncedSurcharge),
        });
        refetch();
      } catch (error) {
        console.error(error);
      }
    };

    debouncedSurcharge !== -1 && update();
  }, [debouncedSurcharge]);

  const handleEditInputs = (key: any, val: any) => {
    let payload = { ...orderDetails };
    payload[key] = val;
    setDetails(payload);
  };

  const columnData = {
    column1: [
      {
        name: 'Purchase order',
        key: 'purchase_order',
        value: orderDetails?.purchase_order,
      },
      {
        name: 'Retailer',
        key: 'retailer',
        value: orderDetails?.retailer,
      },
      {
        name: 'Buyer name',
        key: 'buyer_name',
        value: orderDetails?.buyer_name,
      },
      {
        name: 'Email Address',
        key: 'email_address',
        value: orderDetails?.email_address,
      },
    ],
    column2: [
      {
        name: 'Billing address',
        key: 'billing_address',
        value: orderDetails?.billing_address,
      },
      {
        name: 'Delivery address',
        key: 'delivery_address',
        inputType: 'textarea',
        value: orderDetails?.delivery_address,
      },
    ],
    column3: [
      {
        name: 'Payment terms',
        key: 'payment_terms',
        value: orderDetails?.payment_terms,
      },
      {
        name: 'Delivery lead time',
        key: 'delivery_lead_time',
        value: '09/03/2023 - 12/06/2023',
      },
      {
        name: 'Last updated',
        key: 'last_updated',
        value: orderDetails?.last_updated,
      },
      {
        name: 'Last modified',
        key: 'last_modified_by',
        value: orderDetails?.last_modified_by,
      },
    ],
  };

  const handleErrorMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const handleSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const config: any = await apiConfig();
      const api = new OrderResourceApi(config);
      await api.apiOrderUpdateDraftOrderPut(orderId, orderDetails);
      refetch();
      setIsLoading(false);
      setEditMode(false);
      setIsLoading(false);
      handleSuccessMessage('Order modified successfully');
    } catch (error: any) {
      setIsLoading(false);
      handleErrorMessage(error?.response?.message || 'Order update failed');
      console.log(error);
    }
  };

  const handleSaveNote = async () => {
    try {
      const config: any = await apiConfig();
      if (!orderNote && !orderNote.length) return;
      if (orderDetailId) {
        const api = new OrderDetailResourceApi(config);
        await api.apiOrderUpdateDraftOrderDetailPut(orderDetailId, orderId, {
          note: orderNote,
        });  
      } else {
        const api = new OrderResourceApi(config);
        await api.apiOrderUpdateDraftOrderPut(orderId, {
          ...orderDetails,
          note: orderNote,
        });
      }
      setIsAddNoteOpen(!isAddNoteOpen);
      refetch();
      handleSuccessMessage('Note added successfully');
    } catch (error: any) {
      handleErrorMessage(error?.response?.message || 'Failed to add note!');
      console.log(error);
    }
  };

  const handleDropdownChange = async (val: any) => {
    try {
      const config: any = await apiConfig();
      const api = new OrderResourceApi(config);
      await api.apiOrderUpdateDraftOrderPut(orderId, {
        ...orderDetails,
        pricing_condition: val,
      });
      refetch();
    } catch (error) {
      console.error(error);
    }
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

  const handleQuantities = async (
    val: string,
    orderDetailId: number,
    id: number
  ) => {
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
      const api = new OrderDetailResourceApi(config);
      api.apiOrderUpdateDraftOrderDetailPut(orderDetailId, orderId, payload);
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const debouncedHandleQuantities = debounce(handleQuantities, 600);

  const handleChange = async (key: any, val: any) => {
    setDetails({ ...orderDetails, [key]: val });

    if (key === 'discount') {
      setDiscount(val);
    } else {
      setSurchange(val);
    }
  };

  const handleDelete = async(id?: number) => {
    try {
      const config: any = await apiConfig();
      refetch();
      handleSuccessMessage('Note added successfully');
    } catch (error: any) {
      handleErrorMessage(error?.response?.message || 'Failed to add note!');
      console.log(error);
    }
  }

  if (!details && loading) {
    return <Loading message="Loading details..." />;
  }

  return (
    <div className="mx-auto overflow-x-hidden">
      <Header
        id={orderDetails?.id}
        heading={orderDetails?.name}
        status={{
          confirmed: orderDetails?.order_status === 'CONFIRMED',
          approved: orderDetails?.order_status === 'APPROVED',
          cancelled: orderDetails?.order_status === 'CANCELLED',
          draft: orderDetails?.order_status === 'DRAFT',
        }}
        handleErrorMessage={handleErrorMessage}
        addNote={() => setIsAddNoteOpen(!isAddNoteOpen)}
        setSuccessMessage={handleSuccessMessage}
        setErrorMessage={handleErrorMessage}
        refetch={refetch}
      />
      
      <div className="mx-auto w-full max-w-[1120px] py-16">
        <div className="bg-[#fff]]">
          {orderDetails?.order_status === 'DRAFT' && (
            <div className="flex flex-1 justify-end mb-6">
              <div className="flex items-center">
                <Button
                  size="sm"
                  onClick={() => setEditMode(!editMode)}
                  variant="outlined"
                  className="!text-shades-black !text-[12px] !font-normal !px-[18.5] hover:!text-shades-white"
                >
                  {editMode ? 'Cancel' : 'Edit Details'}
                </Button>
                {editMode && (
                  <Button
                    size="sm"
                    onClick={handleSave}
                    className="!text-[12px] !font-normal !px-[18.5] !py-0 ml-2"
                    disabled={isLoading}
                  >
                    Save
                  </Button>
                )}
              </div>
            </div>
          )}
          <div className="flex flex-col">
            <OrderDetails
              editMode={orderDetails?.order_status === 'DRAFT' && editMode}
              handleEditInputs={handleEditInputs}
              column1={columnData.column1}
              column2={columnData.column2}
              column3={columnData.column3}
              loading={isLoading}
            />
          </div>
          <PricingCondition
            details={orderDetails}
            handleChange={handleChange}
            handleDropdownChange={handleDropdownChange}
          />
        </div>
        <OrderListTable
          handleQuantities={debouncedHandleQuantities}
          handleOrderNote={(id) => {
            setIsAddNoteOpen(true);
            setorderDetailId(id);
          }}
          products={details?.order_details}
          pricing_condition={orderDetails?.pricing_condition}
          quantity={orderDetails?.quantity}
          total_price={orderDetails?.total_price}
          editMode={true}
          handleDelete={handleDelete}
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
