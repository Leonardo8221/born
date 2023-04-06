import React, { FC } from 'react';
import OrderListTable from '../../organisms/Tables/OrderList';
import { OrderGraphqlDto } from '@/generated/types';
import Filters, { Tags } from '../common/Filters';

export interface DraftTableProps {
  content: OrderGraphqlDto[];
  type: string;
  loading: boolean;
  handleActions: (action: string, id: number) => void;
  actionsLoading?: boolean;
  searchKeyword?: string;
  setSearchKeyword?: (value: string) => void;
  filterTags?: Tags[];
}

export const DraftTable: FC<DraftTableProps> = ({
  content,
  type,
  loading,
  handleActions,
  actionsLoading,
  searchKeyword,
  setSearchKeyword,
  filterTags,
}) => {
  return (
    <div>
      <div className='pb-4'>
        <Filters
          searchKeyword={searchKeyword}
          onSearch={setSearchKeyword}
          isOrder
          filterTags={filterTags}
        />
      </div>
      <OrderListTable
        handleActions={handleActions}
        actionsLoading={actionsLoading}
        loading={loading}
        orderType={type}
        orders={content}
      />
    </div>
  );
};
