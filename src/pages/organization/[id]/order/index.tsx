import React, { useEffect, useState } from 'react';
import { DraftTable } from '../../../../components/page-components/order/DraftsTable';
import Tabs from '../../../../components/molecules/Tab/Tabs';
import { Heading } from '../../../../components/molecules/Heading';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import ShowcaseLayout from '@/components/layouts/ShowcaseLayout';
import { GET_ORDERS } from '../../../../queries/orders/orders';
import { OrderGraphqlDto } from '@/generated/types';
import { OrderResourceApi } from 'client/command';
import { apiConfig } from '@/utils/apiConfig';
import Toast from '@/components/page-components/Toast';

export default function OrderManagement() {
  const router = useRouter();
  const id = router?.query?.id || '';
  const organizationId: number = +id;
  const tabState = router.query.tab;
  const [activeTab, setActiveTab] = useState<string | number>('draft');
  const queryKey = `GET_ORDERS_${activeTab}`;
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { data, error, refetch, loading } = useQuery(GET_ORDERS, {
    variables: {
      key: queryKey,
      organizationId: organizationId,
      confirmed: tabState === 'confirmed' ? true : null,
      cancelled: tabState === 'cancelled' ? true : null,
      approved: tabState === 'approved' ? true : null,
      start: 0,
      rows: 10,
    },
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
  });

  const handleTabChange = (id: string | number) => {
    if (!router?.query?.id) return;
    router.push(`/organization/${router?.query?.id}/order?tab=${id}`);
    setActiveTab(id);
    refetch();
  };

  useEffect(() => {
    if (tabState) {
      setActiveTab(String(tabState));
    }
  }, [tabState]);

  const ordersBySearch = data?.ordersBySearch?.content || [];
  const confirmedOrders = ordersBySearch.filter(
    (item: OrderGraphqlDto) => item.confirmed
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
      setSuccessMessage('Order modified successfully');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error?.message ?? 'Order modified failed');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      console.log(error);
    }
  };

  const tabs = [
    {
      id: 'draft',
      label: 'Draft',
      content: (
        <DraftTable
          handleActions={handleActions}
          actionsLoading={isLoading}
          loading={loading}
          type="draft"
          content={ordersBySearch}
        />
      ),
    },
    {
      id: 'confirmed',
      label: 'Confirmed',
      content: (
        <DraftTable
          handleActions={handleActions}
          actionsLoading={isLoading}
          loading={loading}
          type="confirmed"
          content={confirmedOrders}
        />
      ),
    },
    {
      id: 'approved',
      label: 'Approved',
      content: (
        <DraftTable
          handleActions={handleActions}
          actionsLoading={isLoading}
          loading={loading}
          type="approved"
          content={ordersBySearch}
        />
      ),
    },
    {
      id: 'cancelled',
      label: 'Cancelled',
      content: (
        <DraftTable
          handleActions={handleActions}
          actionsLoading={isLoading}
          loading={loading}
          type="cancelled"
          content={ordersBySearch}
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
}
