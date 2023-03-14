import React, { useState } from 'react';
import { DraftTable } from '../../../../components/page-components/order/DraftsTable';
import Tabs from '../../../../components/molecules/Tab/Tabs';
import { Heading } from '../../../../components/molecules/Heading';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import ShowcaseLayout from '@/components/layouts/ShowcaseLayout';
import { GET_ORDERS } from '../../../../queries/orders/orders';
import { OrderGraphqlDto } from '@/generated/types';

export default function OrderManagement() {
  const router = useRouter();
  const id = router?.query?.id || '';
  const organizationId: number = +id;
  const tabState = router.query.tab;
  console.log(router.query.tab);
  const [activeTab, setActiveTab] = useState<string | number>('draft');

  const { data, error, refetch, loading } = useQuery(GET_ORDERS, {
    variables: {
      organizationId: organizationId,
      confirmed: tabState === 'confirmed',
      cancelled: tabState === 'cancelled',
      approved: tabState === 'approved',
      start: 0,
      rows: 10,
    },
    fetchPolicy: 'network-only',
  });

  const handleTabChange = (id: string | number) => {
    if (!router?.query?.id) return;
    router.push(`/organization/${router?.query?.id}/order?tab=${id}`);
    setActiveTab(id);
    refetch();
  };

  const ordersBySearch = data?.ordersBySearch?.content || [];
  const confirmedOrders = ordersBySearch.filter(
    (item: OrderGraphqlDto) => item.confirmed
  );

  const tabs = [
    {
      id: 'draft',
      label: 'Draft',
      content: (
        <DraftTable loading={loading} type="draft" content={ordersBySearch} />
      ),
    },
    {
      id: 'confirmed',
      label: 'Confirmed',
      content: (
        <DraftTable
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
    </ShowcaseLayout>
  );
}
