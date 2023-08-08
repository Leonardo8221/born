import React, { FC } from 'react';
import OrderListTable from '../../organisms/Tables/OrderList';
import { OrderGraphqlDto } from '@/generated/types';
import Filters, { Action, Tags } from '../common/Filters';

export interface DraftTableProps {
  content: OrderGraphqlDto[];
  type: string;
  loading: boolean;
  handleActions: (action: string, id: number) => void;
  actionsLoading?: boolean;
  searchKeyword?: string;
  setSearchKeyword?: (value: string) => void;
  filterTags?: Tags[];
  handleDelete?: (id: number) => void;
  selectedOrders: number[];
  handleOnSelect: () => void;
  handleOnOrderSelect: (id: number) => void;
  actions?: Action[];
  onDeselect?: () => void;
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
  handleDelete,
  selectedOrders,
  handleOnSelect,
  handleOnOrderSelect,
  actions,
  onDeselect,
}) => {
  return (
    <div>
      <div className="pb-4">
        <Filters
          searchKeyword={searchKeyword}
          onSearch={setSearchKeyword}
          isOrder
          filterTags={filterTags}
          className="!py-0"
          selectBtnText={'Select All'}
          selectedItems={selectedOrders}
          onSelect={handleOnSelect}
          isAllOrdersSelected={selectedOrders.length === content.length}
          isSelectable={!!selectedOrders.length}
          hideSelectBtn={selectedOrders.length === content.length}
          actions={actions}
          onDeselect={onDeselect}
        />
      </div>
      <OrderListTable
        handleActions={handleActions}
        actionsLoading={actionsLoading}
        loading={loading}
        orderType={type}
        orders={content}
        handleDelete={handleDelete}
        selectedItems={selectedOrders}
        handleOnOrderSelect={handleOnOrderSelect}
      />
    </div>
  );
};
