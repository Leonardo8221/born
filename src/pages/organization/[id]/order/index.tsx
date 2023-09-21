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
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '@/components/page-components/Loading';

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
  const [pageNo, setPageNo] = useState(0);
  const [rows] = useState(24);
  const [orders, setOrders] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(null);
  const [isOrderDelete, setIsOrderDelete] = useState(false);

  const debounceValue = useDebounce(searchKeyword, 600);

  const { data, refetch, loading } = useQuery(GET_ORDERS, {
    variables: {
      key: GET_ORDERS_LIST,
      organizationId,
      retailers: selectedRetailers,
      buyers: selectedBuyers,
      season: selectedSeasons,
      orderStatus: tabState,
      start: pageNo * rows,
      rows,
      search: debounceValue,
    },
    fetchPolicy: 'cache-and-network',
  });

  const ordersBySearch = data?.ordersBySearch?.content || [];

  useEffect(() => {
    const newOrders = data?.ordersBySearch?.content || [];
    const pages = data?.ordersBySearch?.total_pages;
    setTotalPages(pages ? pages : totalPages);
    if (!isOrderDelete) {
      if (
        !!selectedRetailers.length ||
        !!selectedBuyers.length ||
        !!selectedSeasons
      ) {
        setOrders(
          pageNo !== 0 && pageNo > 0 ? [...orders, ...newOrders] : newOrders
        );
      } else if (!!newOrders.length) {
        setOrders(pageNo !== 0 ? [...orders, ...newOrders] : newOrders);
      }
    }
  }, [data]);

  const { data: buyers } = useQuery(BUYERS_QUERY, {
    variables: {
      organizationId,
    },
  });

  const { data: retailers } = useQuery(RETAILERS_QUERY, {
    variables: { organizationId },
  });

  const handleBuyersAction = (e: { id: number | string; label: string }) => {
    setPageNo(0);
    if (selectedBuyers.includes(e.label)) {
      setSelectedBuyers(selectedBuyers?.filter((c) => c !== e.label));
    } else {
      setSelectedBuyers([...selectedBuyers, e.label]);
    }
  };

  const handleRetailersAction = (e: { id: number | string; label: string }) => {
    setPageNo(0);
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
      onReset: () => {
        setSelectedRetailers([]);
        setPageNo(0);
      },
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
      onReset: () => {
        setPageNo(0);
        setSelectedBuyers([]);
      },
    },
    {
      label: 'Season',
      options: seasons.map((s: string) => ({ id: s, label: s })),
      selectedItems: selectedSeasons ? [selectedSeasons] : [],
      action: (e: { id: string | number; label: string }) => {
        setPageNo(0);
        setSelectedSeasons(e.label);
      },
      onReset: () => {
        setPageNo(0);
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
    setSelectedOrders([]);
    if (!organizationId) return;
    router.push(`/organization/${organizationId}/order?tab=${id}`);
    setActiveTab(id as OrderStatus);
  };

  useEffect(() => {
    const status = router?.query?.tab?.toUpperCase() || 'DRAFT';
    handleTabChange(status);
  }, [router.isReady]);

  const handleOnSelect = useCallback(() => {
    if (
      !selectedOrders.length ||
      selectedOrders.length !== ordersBySearch.length
    ) {
      setSelectedOrders(ordersBySearch.map((item: any) => item.id));
    } else {
      setSelectedOrders([]);
    }
  }, [selectedOrders, ordersBySearch]);

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
    setIsOrderDelete(true);
    try {
      const config = await apiConfig();
      const api = new OrderResourceApi(config);
      if (!id) {
        const promises = selectedOrders.map((item) =>
          api.apiOrderDeleteOrderDelete(item)
        );
        await Promise.all(promises);
        setOrders(orders.filter((item) => !selectedOrders.includes(item.id)));
        setSelectedOrders([]);
        setSuccessMessage(
          selectedOrders.length <= 1
            ? 'Order Deleted Successfully!'
            : `${selectedOrders.length} Orders Deleted successfully!`
        );
      } else {
        await api.apiOrderDeleteOrderDelete(id);
        setOrders(orders.filter((item) => item.id !== id));
        setSuccessMessage('Order deleted successfully!');
      }
      await refetch();
      setIsLoading(false);
      setIsOrderDelete(false);
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error?.message ?? 'Failed to delete order!');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      setIsOrderDelete(false);
    }
  };

  const renderTabContent = (type: OrderStatus) => {
    return (
      <InfiniteScroll
        dataLength={orders.length}
        next={async () => {
          const start = pageNo + 1;
          totalPages && start < totalPages && setPageNo(start);
        }}
        hasMore={!!totalPages && pageNo < totalPages}
        loader={
          pageNo + 1 < (totalPages || 0) &&
          orders.length && <Loading message="Loading more items..." />
        }
      >
        <DraftTable
          handleActions={handleActions}
          actionsLoading={isLoading}
          loading={!orders.length && loading}
          type={type.toLowerCase()}
          content={orders}
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
      </InfiniteScroll>
    );
  };

  const tabs = [
    {
      id: 'DRAFT',
      label: 'Draft',
      content: renderTabContent(OrderStatus.Draft),
    },
    {
      id: 'CONFIRMED',
      label: 'Confirmed',
      content: renderTabContent(OrderStatus.Confirmed),
    },
    {
      id: 'APPROVED',
      label: 'Approved',
      content: renderTabContent(OrderStatus.Approved),
    },
    {
      id: 'CANCELLED',
      label: 'Cancelled',
      content: renderTabContent(OrderStatus.Draft),
    },
  ];

  const onBack = () => {
    const path = localStorage.getItem('previous_route');
    if (path) {
      router.push(path);
    }
  };

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
