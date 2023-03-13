import React, { FC } from 'react';
import { SearchInput } from '../../molecules/SearchInput';
import { TagCollection } from '../../molecules/TagCollection';
import OrderListTable from '../../organisms/Tables/OrderList';
import { Button } from '../../molecules/Button';
import { OrderGraphqlDto } from '@/generated/types';

export interface DraftTableProps {
  content: OrderGraphqlDto[];
}

export const Draft: FC<DraftTableProps> = ({ content }) => {
  return (
    <div>
      <div id="header" className="flex justify-between">
        <div className="flex items-center pb-4">
          <SearchInput
            onChange={() => {}}
            onClear={function noRefCheck() {}}
            onEnter={function noRefCheck() {}}
            value={''}
            placeholder="Search"
            className="mr-2"
          />
          <TagCollection
            tags={[
              {
                label: 'Retailers',
                size: 'default',
                type: 'default',
              },
              {
                label: 'Buyer',
                size: 'default',
                type: 'default',
              },
              {
                label: 'Season',
                size: 'default',
                type: 'default',
              },
              {
                label: 'Status',
                size: 'default',
                type: 'default',
              },
              {
                label: 'Order date',
                size: 'default',
                type: 'default',
              },
            ]}
          />
        </div>
        <div>
          <Button
            variant="outlined"
            className="h-8 border-[#999999] text-[12px] text-[#333333]"
          >
            Export
          </Button>
        </div>
      </div>
      <OrderListTable orderType="draft" orders={content} />
    </div>
  );
};
