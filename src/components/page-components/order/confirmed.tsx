import React, { FC } from 'react';
import OrderListTable from '../../organisms/Tables/OrderList';
import { OrderGraphqlDto } from '@/generated/types';

interface DraftTableProps {
  content: OrderGraphqlDto[];
}

export const Confirmed = ({ content }: DraftTableProps) => {
  return (
    <div>
      <OrderListTable orderType="confirmed" orders={content} />
    </div>
  );
};
