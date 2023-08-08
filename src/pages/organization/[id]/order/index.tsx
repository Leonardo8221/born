import React, { useCallback, useEffect, useState } from 'react';
import { DraftTable } from '@/components/page-components/order/DraftsTable';
import Tabs from '@/components/molecules/Tab/Tabs';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { GET_ORDERS } from '@/queries/orders/orders';
import { OrderResourceApi } from 'client/command';
import { apiConfig } from '@/utils/apiConfig';
import Toast from '@/components/page-components/Toast';
import { GET_ORDERS_LIST, seasons } from '@/utils/constants';
import useDebounce from '@/utils/debounce';
import { OrderStatus } from '@/generated/types';
import { BUYERS_QUERY, RETAILERS_QUERY } from '@/queries/filters';
import { Action, Tags } from '@/components/page-components/common/Filters';
import Footer from '@/components/layouts/Footer';
import TopBar from '@/components/page-components/marketing/TopBar';

const OrderPage = () => {
  const router: any = useRouter();
  const id = router?.query?.id || '';
  const organizationId: number = Number(id);
  const tabState = router.query.tab;
  const [activeTab, setActiveTab] = useState<OrderStatus>(OrderStatus.Draft);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedBuyers, setSelectedBuyers] = useState<string[]>([]);
  const [selectedRetailers, setSelectedRetailers] = useState<string[]>([]);
  const [selectedSeasons, setSelectedSeasons] = useState<string | null>(null);
  const [selectedOrders, setSelectedOrders] = useState<number[]>([]);

  const debounceValue = useDebounce(searchKeyword, 600);

  const { data, refetch, loading } = useQuery(GET_ORDERS, {
    variables: {
      key: GET_ORDERS_LIST,
      organizationId,
      retailers: selectedRetailers,
      buyers: selectedBuyers,
      season: selectedSeasons,
      orderStatus: tabState,
      start: 0,
      rows: 500,
      search: debounceValue,
    },
    fetchPolicy: 'network-only',
  });

  const { data: buyers } = useQuery(BUYERS_QUERY, {
    variables: {
      organizationId,
    },
  });

  const { data: retailers } = useQuery(RETAILERS_QUERY, {
    variables: { organizationId },
  });

  const handleBuyersAction = (e: { id: number | string; label: string }) => {
    if (selectedBuyers.includes(e.label)) {
      setSelectedBuyers(selectedBuyers?.filter((c) => c !== e.label));
    } else {
      setSelectedBuyers([...selectedBuyers, e.label]);
    }
  };

  const handleRetailersAction = (e: { id: number | string; label: string }) => {
    if (selectedRetailers.includes(e.label)) {
      setSelectedRetailers(selectedRetailers?.filter((c) => c !== e.label));
    } else {
      setSelectedRetailers([...selectedRetailers, e.label]);
    }
  };

  const filterTags: Tags[] = [
    {
      label: 'Retailers',
      options:
        retailers?.retailersByOrganizationIdAndStoreName?.map((item: any) => ({
          id: item?.id,
          label: item.store_name,
        })) || [],
      selectedItems: selectedRetailers,
      action: handleRetailersAction,
      onReset: () => setSelectedRetailers([]),
    },
    {
      label: 'Buyers',
      options:
        buyers?.buyersByOrganizationAndRetailerIdAndName?.map((item: any) => ({
          id: item?.id,
          label: item?.buyer_name,
        })) || [],
      selectedItems: selectedBuyers,
      action: handleBuyersAction,
      onReset: () => setSelectedBuyers([]),
    },
    {
      label: 'Season',
      options: seasons.map((s: string) => ({ id: s, label: s })),
      selectedItems: selectedSeasons ? [selectedSeasons] : [],
      action: (e: { id: string | number; label: string }) => {
        setSelectedSeasons(e.label);
      },
      onReset: () => {
        setSelectedSeasons(null);
      },
    },
  ];

  const actions: Action[] = [
    {
      name: 'Delete',
      action: () => handleDeleteOrder(),
      disabled: isLoading,
    },
  ];

  const handleTabChange = (id: string | number) => {
    if (!organizationId) return;
    router.push(`/organization/${organizationId}/order?tab=${id}`);
    setActiveTab(id as OrderStatus);
  };

  useEffect(() => {
    const status = router?.query?.tab?.toUpperCase() || 'DRAFT';
    handleTabChange(status);
  }, [router.isReady]);

  const ordersBySearch = data?.ordersBySearch?.content || [];

  const handleOnSelect = useCallback(() => {
    if (selectedOrders.length !== ordersBySearch.length) {
      setSelectedOrders(ordersBySearch.map((item: any) => item.id));
    } else {
      setSelectedOrders([]);
    }
  }, [selectedOrders]);

  const handleOnOrderSelect = useCallback(
    (id: number) => {
      if (!selectedOrders.includes(id)) {
        setSelectedOrders([...selectedOrders, id]);
      } else {
        const newOrders = [...selectedOrders];
        setSelectedOrders(newOrders.filter((item: number) => item !== id));
      }
    },
    [selectedOrders]
  );

  const handleActions = async (action: string, id: number) => {
    const config: any = await apiConfig();
    const api = new OrderResourceApi(config);
    try {
      setIsLoading(true);
      if (action === 'confirm') {
        await api.apiOrderConfirmOrderPut(id);
      }
      if (action === 'cancel') {
        await api.apiOrderCancelOrderPut(id);
      }
      if (action === 'approve') {
        await api.apiOrderApproveOrderPut(id);
      }
      refetch();
      setIsLoading(false);
      setSuccessMessage('Order modified successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error?.message ?? 'Order modified failed!');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      console.log(error);
    }
  };

  const handleDeleteOrder = async (id?: number) => {
    setIsLoading(true);
    try {
      const config = await apiConfig();
      const api = new OrderResourceApi(config);
      if (!id) {
        const promises = selectedOrders.map((item) =>
          api.apiOrderDeleteOrderDelete(item)
        );
        await Promise.all(promises);
        setSelectedOrders([]);
        setSuccessMessage(
          selectedOrders.length <= 1
            ? 'Order Deleted Successfully!'
            : `${selectedOrders.length} Orders Deleted successfully!`
        );
      } else {
        await api.apiOrderDeleteOrderDelete(id);
        setSuccessMessage('Order deleted successfully!');
      }
      await refetch();
      setIsLoading(false);
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error?.message ?? 'Failed to delete order!');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      console.log(error);
    }
  };

  const tabs = [
    {
      id: 'DRAFT',
      label: 'Draft',
      content: (
        <DraftTable
          handleActions={handleActions}
          actionsLoading={isLoading}
          loading={loading}
          type="draft"
          content={ordersBySearch}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          filterTags={filterTags}
          handleDelete={handleDeleteOrder}
          selectedOrders={selectedOrders}
          handleOnSelect={handleOnSelect}
          handleOnOrderSelect={handleOnOrderSelect}
          actions={actions}
          onDeselect={() => setSelectedOrders([])}
        />
      ),
    },
    {
      id: 'CONFIRMED',
      label: 'Confirmed',
      content: (
        <DraftTable
          handleActions={handleActions}
          actionsLoading={isLoading}
          loading={loading}
          type="confirmed"
          content={ordersBySearch}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          filterTags={filterTags}
          handleDelete={handleDeleteOrder}
          selectedOrders={selectedOrders}
          handleOnSelect={handleOnSelect}
          handleOnOrderSelect={handleOnOrderSelect}
          actions={actions}
          onDeselect={() => setSelectedOrders([])}
        />
      ),
    },
    {
      id: 'APPROVED',
      label: 'Approved',
      content: (
        <DraftTable
          handleActions={handleActions}
          actionsLoading={isLoading}
          loading={loading}
          type="approved"
          content={ordersBySearch}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          filterTags={filterTags}
          handleDelete={handleDeleteOrder}
          selectedOrders={selectedOrders}
          handleOnSelect={handleOnSelect}
          handleOnOrderSelect={handleOnOrderSelect}
          actions={actions}
          onDeselect={() => setSelectedOrders([])}
        />
      ),
    },
    {
      id: 'CANCELLED',
      label: 'Cancelled',
      content: (
        <DraftTable
          handleActions={handleActions}
          actionsLoading={isLoading}
          loading={loading}
          type="cancelled"
          content={ordersBySearch}
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          filterTags={filterTags}
          handleDelete={handleDeleteOrder}
          selectedOrders={selectedOrders}
          handleOnSelect={handleOnSelect}
          handleOnOrderSelect={handleOnOrderSelect}
          actions={actions}
          onDeselect={() => setSelectedOrders([])}
        />
      ),
    },
  ];

  const onBack = () => {
    const path = localStorage.getItem('previous_route');
    if (path) {
      router.push(path);
    }
  }

  return (
    <>
      <TopBar title="Order Management" onBack={onBack} />
      <div className="min-h-[calc(100vh-72px)] pt-[72px] mt-2">
        <div className="max-w-[1120px] mx-auto">
          <Tabs
            tabs={tabs}
            active={activeTab}
            onTabChange={handleTabChange}
            bordered
            tabListClasses="!w-[124px]"
          />
        </div>
        <Toast successMessage={successMessage} errorMessage={errorMessage} />
      </div>
      <Footer />
    </>
  );
};

export default OrderPage;
