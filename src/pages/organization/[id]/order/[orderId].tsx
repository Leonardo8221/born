import React, { useEffect, useMemo, useState } from "react";
import OrderListTable from "@/components/organisms/Tables/Product/OrderListTable";
import OrderDetails from "@/components/molecules/OrderDetails/OrderDetails";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Footer from "@/components/layouts/Footer";
import Header from "@/components/page-components/order/Header";
import { GET_ORDER_BY_ID } from "@/queries/orders/details";
import { Button } from "@/components/molecules/Button";
import { OrderDetailResourceApi, OrderResourceApi } from "client/command";
import { apiConfig } from "@/utils/apiConfig";
import Toast from "@/components/page-components/Toast";
import AddNote from "@/components/page-components/order/AddNote";
import Loading from "@/components/page-components/Loading";
import PricingCondition from "@/components/page-components/order/PricingCondition";
import DescriptionField from "@/components/molecules/DescriptionField/DescriptionField";
import { orderTypes, seasons } from "@/utils/constants";
import Dropdown from "@/components/molecules/Dropdown";
import clsx from "clsx";

export enum OrderProductsSort {
  None = "NONE",
  EarliestFirst = "EARLIEST_FIRST",
  LatestFirst = "LATEST_FIRST",
}

function OrderPreview() {
  const router = useRouter();

  const orderId = Number(router?.query?.orderId);
  const [editMode, setEditMode] = useState(false);
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false);
  const [orderDetails, setDetails] = useState<any>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [orderNote, setOrderNote] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [orderDetailId, setorderDetailId] = useState(null);
  const [sortProductsBy, setSortProductsBy] = useState({
    name: "None",
    value: OrderProductsSort.None,
  });

  const SortOptions = [
    {
      name: "None",
      value: OrderProductsSort.None,
    },
    {
      name: "Delivery Date (Earliest First)",
      value: OrderProductsSort.EarliestFirst,
    },
    {
      name: "Delivery Date (Latest First)",
      value: OrderProductsSort.LatestFirst,
    },
  ];

  const { loading, data, refetch } = useQuery(GET_ORDER_BY_ID, {
    variables: { orderId },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only",
    skip: !orderId,
  });

  const details = data?.orderByOrderId;
  useEffect(() => {
    if (details) {
      setDetails({
        buyer_id: details?.buyer_data?.id,
        retailer_id: details?.retailer_data?.id,
        ...details,
        total_quantity: details?.total_quantity,
      });
    }
  }, [data]);

  const handleEditInputs = (key: any, val: any, item?: any) => {
    let payload = { ...orderDetails };
    payload[key] = val;
    if (key === "buyer_id" && item) {
      payload.buyer_data = item;
    }
    if (key === "retailer_id" && item) {
      payload.retailer_data = item;
    }
    setDetails(payload);
  };

  const columnData = useMemo(
    () => ({
      column1: [
        {
          name: "Purchase order",
          key: "purchase_order",
          value: orderDetails?.purchase_order,
        },
        {
          name: "Retailer",
          key: "retailer_id",
          value: `${orderDetails?.retailer_data?.store_name || ""} ${
            orderDetails?.retailer_data?.billing_store_address_line_1 || ""
          }`,
        },
        {
          name: "Buyer name",
          key: "buyer_id",
          value: orderDetails?.buyer_data?.buyer_name || "",
          retailer_id: orderDetails?.retailer_id,
        },
        {
          name: "Email Address",
          key: "email_address",
          value: orderDetails?.buyer_data?.email || orderDetails?.email_address,
        },
      ],
      column2: [
        {
          name: "Billing address",
          key: "billing_address",
          value: orderDetails?.billing_address,
        },
        {
          name: "Delivery address",
          key: "delivery_address",
          inputType: "textarea",
          value: orderDetails?.delivery_address,
        },
      ],
      column3: [
        {
          name: "Payment terms",
          key: "payment_terms",
          value: orderDetails?.payment_terms,
        },
        {
          name: "Delivery lead time",
          key: "delivery_lead_time",
          inputType: "datepicker",
          value: `${orderDetails?.delivery_window_start_date || ""} - ${
            orderDetails?.delivery_window_end_date || ""
          }`,
        },
        {
          name: "Last updated",
          key: "last_updated",
          value: orderDetails?.last_updated,
        },
        {
          name: "Last modified",
          key: "last_modified_by",
          value: orderDetails?.last_modified_by,
        },
        {
          name: "Order type",
          key: "order_type",
          value: orderDetails?.order_type,
          options: orderTypes,
        },
        {
          name: "Season",
          key: "season",
          value: orderDetails?.season,
          options: seasons,
        },
      ],
    }),
    [orderDetails]
  );

  const handleErrorMessage = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  const handleSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const config: any = await apiConfig();
      const api = new OrderResourceApi(config);
      const apiOrderDetails = new OrderDetailResourceApi(config);
      const europeBerlinTimeZone = "Europe/Zurich";
      orderDetails.delivery_window_start_date = convertToTimeZone(
        orderDetails.delivery_window_start_date,
        europeBerlinTimeZone
      );
      orderDetails.delivery_window_end_date = convertToTimeZone(
        orderDetails.delivery_window_end_date,
        europeBerlinTimeZone
      );

      await api.apiOrderUpdateDraftOrderPut(orderId, orderDetails);
      await apiOrderDetails.apiOrderUpdateDraftOrderDetailPut(orderId, {
        order_details: orderDetails.order_details,
      });
      await refetch();
      setIsLoading(false);
      setEditMode(false);
      setIsLoading(false);
      handleSuccessMessage("Changes saved successfully.");
    } catch (error: any) {
      setIsLoading(false);
      handleErrorMessage(error?.response?.message || "Failed to save changes.");
      console.log(error);
    }
  };

  const convertToTimeZone = (date: Date, timeZone: string): Date =>
    new Date(date.toLocaleString("en-US", { timeZone }));

  const handleSaveNote = async () => {
    if (!orderNote && !orderNote.length) return;
    if (orderDetailId) {
      const orders = [...orderDetails.order_details];
      const selectedOrderIndex = orders.findIndex(
        (i) => i.id === orderDetailId
      );
      const selectedorder = orders[selectedOrderIndex];
      orders[selectedOrderIndex] = { ...selectedorder, note: orderNote };
      setDetails({
        ...orderDetails,
        order_details: orders,
      });
    } else {
      setDetails({
        ...orderDetails,
        note: orderNote,
      });
    }
    setIsAddNoteOpen(false);
  };

  const handleDropdownChange = async (val: any) => {
    setDetails({
      ...orderDetails,
      pricing_condition: val,
    });
  };

  const handleQuantities = async (
    val: string,
    orderDetailId: number,
    id: number
  ) => {
    const orders = [...orderDetails.order_details];
    const selectedOrderIndex = orders.findIndex((i) => i.id === orderDetailId);
    const selectedorder = orders[selectedOrderIndex];
    const sizes = [...selectedorder.order_detail_sizes];
    const selectedSizeIndex = sizes.findIndex((i) => i.id === id);
    const selectedSize = sizes[selectedOrderIndex];
    selectedSize[selectedSizeIndex] = { ...selectedSize, quantity: val };
    sizes[selectedSizeIndex] = selectedSize;
    orders[selectedOrderIndex] = selectedorder;
    setDetails({
      ...orderDetails,
      order_details: orders,
    });
  };

  const handleChange = async (key: any, val: any) => {
    setDetails({ ...orderDetails, [key]: val });
  };

  const handleDelete = async (id: number) => {
    setIsLoading(true);
    try {
      const config: any = await apiConfig();
      const api = new OrderResourceApi(config);
      await api.apiOrderRemoveProductsFromDraftOrderPut(orderId, [id]);
      await refetch();
      setIsLoading(false);
      handleSuccessMessage("Order detail deleted successfully");
    } catch (error: any) {
      handleErrorMessage(
        error?.response?.message || "Failed to remove order detail!"
      );
      setIsLoading(false);
      console.log(error);
    }
  };

  const handleClear = async () => {
    setIsLoading(true);
    try {
      const config: any = await apiConfig();
      const api = new OrderResourceApi(config);
      await api.apiOrderCleanOrderDataPut(orderId);
      await refetch();
      setIsLoading(false);
      handleSuccessMessage("cleared order details successfully!");
    } catch (error: any) {
      handleErrorMessage(
        error?.response?.message || "Failed to clear order detail!"
      );
      setIsLoading(false);
      console.log(error);
    }
  };

  if (!details && loading) {
    return <Loading message="Loading details..." />;
  }

  const isDisabled =
    orderDetails?.order_status &&
    !["DRAFT"].includes(orderDetails?.order_status);

  return (
    <div className="mx-auto overflow-x-hidden pdf_view">
      <Header
        id={orderDetails?.id}
        heading={orderDetails?.name}
        status={{
          confirmed: orderDetails?.order_status === "CONFIRMED",
          approved: orderDetails?.order_status === "APPROVED",
          cancelled: orderDetails?.order_status === "CANCELLED",
          draft: orderDetails?.order_status === "DRAFT",
        }}
        handleErrorMessage={handleErrorMessage}
        addNote={() => {
          setIsAddNoteOpen(!isAddNoteOpen);
          setOrderNote(orderDetails?.note);
        }}
        setSuccessMessage={handleSuccessMessage}
        setErrorMessage={handleErrorMessage}
        refetch={refetch}
        total_quantities={orderDetails?.total_quantity}
        onChange={(value) => handleEditInputs("name", value)}
        editMode={editMode}
        handleSave={handleSave}
      />

      <div className="mx-auto w-full max-w-[1120px] pt-16">
        <div className="bg-[#fff]]">
          {orderDetails?.order_status === "DRAFT" && (
            <div className="print:hidden flex flex-1 justify-end mb-6">
              <div className="flex items-center">
                <Button
                  size="sm"
                  onClick={() => setEditMode(!editMode)}
                  variant="outlined"
                  className="!text-shades-black !text-[12px] !font-normal !px-[18.5] hover:!text-shades-white"
                >
                  {editMode ? "Cancel" : "Edit Details"}
                </Button>
                {editMode && (
                  <>
                    <Button
                      size="sm"
                      onClick={handleClear}
                      variant="outlined"
                      className="!text-shades-black !text-[12px] !font-normal !px-[18.5] hover:!text-shades-white ml-2"
                    >
                      Clear all
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleSave}
                      className="!text-[12px] !font-normal !px-[18.5] !py-0 ml-2"
                      disabled={isLoading}
                    >
                      Save
                    </Button>
                  </>
                )}
              </div>
            </div>
          )}
          <div className="flex flex-col">
            <OrderDetails
              editMode={!isDisabled && editMode}
              handleEditInputs={handleEditInputs}
              column1={columnData.column1}
              column2={columnData.column2}
              column3={columnData.column3}
              loading={isLoading}
            />
          </div>
          {orderDetails?.note && (
            <DescriptionField
              value={orderDetails?.note}
              label="Order note"
              onChange={() => {}}
              readOnly
              className="mb-6 mt-2"
            />
          )}
          <PricingCondition
            details={orderDetails}
            handleChange={handleChange}
            handleDropdownChange={handleDropdownChange}
            disabled={isLoading}
          />
        </div>
      </div>
      {orderDetails?.order_status !== "CANCELLED" && (
        <div className="max-w-[1376px] mx-auto flex justify-end items-center pb-4 pt-4">
          <Dropdown
            options={SortOptions}
            isValid={false}
            label="Sort products"
            onChange={(option: any) => setSortProductsBy(option)}
            className={clsx("w-[278px]", isDisabled && "!pointer-events-none")}
            selectedOption={sortProductsBy}
          />
        </div>
      )}
      <div className="max-w-[1376px] mx-auto pb-16 overflow-x-auto">
        <OrderListTable
          handleOrderNote={(id, note) => {
            setIsAddNoteOpen(true);
            setorderDetailId(id);
            setOrderNote(note || "");
          }}
          products={orderDetails?.order_details}
          pricing_condition={orderDetails?.pricing_condition}
          quantity={orderDetails?.quantity}
          total_price={orderDetails?.total_price}
          editMode={!isDisabled && !isLoading}
          handleDelete={handleDelete}
          handleQuantities={handleQuantities}
        />
      </div>
      <AddNote
        note={orderNote}
        handleSaveNote={handleSaveNote}
        isOpen={isAddNoteOpen}
        onClose={() => {
          setIsAddNoteOpen(!isAddNoteOpen);
          setOrderNote("");
          setorderDetailId(null);
        }}
        handleChange={setOrderNote}
      />
      <Toast errorMessage={errorMessage} successMessage={successMessage} />
      <Footer />
    </div>
  );
}

export default OrderPreview;
