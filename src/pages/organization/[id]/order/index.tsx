import React, { useEffect, useState } from 'react';
import { DraftTable } from '@/components/page-components/order/DraftsTable';
import Tabs from '@/components/molecules/Tab/Tabs';
import { Heading } from '@/components/molecules/Heading';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import ShowcaseLayout from '@/components/layouts/ShowcaseLayout';
import { GET_ORDERS } from '@/queries/orders/orders';
import { OrderResourceApi } from 'client/command';
import { apiConfig } from '@/utils/apiConfig';
import Toast from '@/components/page-components/Toast';
import { GET_ORDERS_LIST, seasons } from '@/utils/constants';
import useDebounce from '@/utils/debounce';
import { OrderStatus } from '@/generated/types';
import { BUYERS_QUERY, RETAILERS_QUERY } from '@/queries/filters';
import { Tags } from '@/components/page-components/common/Filters';

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
      rows: 100,
      search: debounceValue,
    },
    notifyOnNetworkStatusChange: true,
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
        retailers?.retailersByOrganizationId?.map((item: string) => ({
          id: item,
          label: item,
        })) || [],
      selectedItems: selectedRetailers,
      action: handleRetailersAction,
      onReset: () => setSelectedRetailers([]),
    },
    {
      label: 'Buyers',
      options:
        buyers?.buyersByOrganizationId?.map((item: string) => ({
          id: item,
          label: item,
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
    }
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

  const handleDeleteOrder = async (id: number) => {
    try {
      const config = await apiConfig();
      const api = new OrderResourceApi(config);
      await api.apiOrderDeleteOrderDelete(id);
      setSuccessMessage('Order Deleted successfully!');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error: any) {
      setErrorMessage(error?.message ?? 'Failed to delete order!');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      console.log(error);
    }
  }

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
        />
      ),
    },
  ];

  return (
    <ShowcaseLayout>
      <div className="max-w-[1120px] mt-6 mx-auto">
        <Heading fontWeight="light" size={'sm'} className="">
          Order Management
        </Heading>
        <Tabs tabs={tabs} active={activeTab} onTabChange={handleTabChange} />
      </div>
      <Toast successMessage={successMessage} errorMessage={errorMessage} />
    </ShowcaseLayout>
  );
};

export default OrderPage;
