import React, { useState, FC } from 'react';
import Modal from '@/components/molecules/Modal';
import { Button } from '@/components/molecules/Button';
import Input from '@/components/molecules/Inputs/Input';
import { OrderResourceApi } from 'client/command';
import { apiConfig } from '@/utils/apiConfig';
import { useRouter } from 'next/router';
import { useApolloClient, useQuery } from '@apollo/client';
import { ORDER_LIST, seasons } from '@/utils/constants';
import { OrderGraphqlDto } from '@/generated/types';
import DropdownFilter, { Item } from './Dropdown';
import Dropdown from '@/components/molecules/Dropdown';
import { GET_BUYERS, GET_RETAILERS } from '@/queries/filters';
import useDebounce from '@/utils/debounce';

interface CreatOrderProps {
  showModal: boolean;
  productIds: number[];
  closeModal: () => void;
  resetProductIds: () => void;
  handleCloseModal: () => void;
  setSelectedOrder: (order: OrderGraphqlDto | null) => void;
  handleAddProductsToOrder?: (
    id: number,
    orderDetails: OrderGraphqlDto
  ) => void;
}

interface OrderDetails {
  name: string;
  purchase_order: string;
  retailer_id: undefined | number;
  buyer_id: undefined | number;
  discount: number;
  surcharge: number;
  season: string;
}

const initialState: OrderDetails = {
  name: '',
  purchase_order: '',
  retailer_id: undefined,
  buyer_id: undefined,
  discount: 0,
  surcharge: 0,
  season: '',
};

type StateKeys =
  | 'name'
  | 'buyer_id'
  | 'purchase_order'
  | 'retailer_id'
  | 'season';

export const CreateOrder: FC<CreatOrderProps> = ({
  showModal,
  productIds,
  closeModal,
  setSelectedOrder,
  resetProductIds,
  handleCloseModal,
}) => {
  const router = useRouter();
  const client = useApolloClient();
  const [details, setDetails] = useState<OrderDetails>(initialState);
  const [storeName, setStoreName] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const id = router?.query?.id || '';
  const organizationId: number = +id;

  const debounceStoreName = useDebounce(storeName, 300);
  const debouncedBuyerName = useDebounce(buyerName, 300);

  const { data, loading } = useQuery(GET_BUYERS, {
    variables: {
      retailerId: details.retailer_id,
      buyerName: debouncedBuyerName,
    },
  });

  const { data: retailers, loading: isLoadingRetailers } = useQuery(
    GET_RETAILERS,
    {
      variables: {
        storeName: debounceStoreName,
      },
    }
  );

  const handleChange = (key: StateKeys, value: string | number | null) => {
    setDetails((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const config: any = await apiConfig();
      const api = new OrderResourceApi(config);
      const response: any = await api.apiOrderCreateNewDraftOrderPost(
        organizationId,
        { ...details, productIds }
      );
      handleCloseModal();
      setSelectedOrder?.(response?.data);
      setTimeout(() => {
        setSelectedOrder?.(null);
      }, 3000);
      closeModal();
      setDetails(initialState);
      await client.refetchQueries({
        include: [ORDER_LIST],
      });
      resetProductIds();
    } catch (error: any) {
      closeModal();
      handleCloseModal();
      setDetails(initialState);
    }
  };

  return (
    <div>
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={'Add Order Details'}
        className="!max-h-[500px] !max-w-[736px] overflow-x-hidden overflow-y-auto"
      >
        <div>
          <div className="flex w-full">
            <Input
              value={details.name}
              label="Draft order name"
              type="text"
              onChange={(val) => handleChange('name', val)}
              name="name"
              className="m-2 text-[14px] w-[324px]"
            />
            <Input
              value={details.purchase_order}
              label="Purchase order number"
              type="number"
              onChange={(val) => handleChange('purchase_order', val)}
              name="purchase_order"
              className="m-2 text-[14px] w-[324px]"
            />
          </div>
          <div className="flex w-full">
            <DropdownFilter
              items={retailers?.retailersByStoreName?.map((item: any) => ({
                id: item?.id,
                label: item?.store_name,
              }))}
              label="Retailer name"
              loading={isLoadingRetailers}
              value={storeName}
              onChange={(e: string) => {
                setStoreName(e);
                handleChange('retailer_id', null);
              }}
              onSelect={(item: Item) => {
                handleChange('retailer_id', item?.id);
                setStoreName(item?.label);
              }}
            />
            <DropdownFilter
              items={data?.buyersByRetailerIdAndName?.map((item: any) => ({
                id: item?.id,
                label: item?.buyer_name,
              }))}
              label="Customer name"
              loading={loading}
              value={buyerName}
              onChange={(e: string) => setBuyerName(e)}
              onSelect={(item: Item) => {
                handleChange('buyer_id', item?.id);
                setBuyerName(item.label);
              }}
            />
          </div>
          <div>
            <Dropdown
              label="Season"
              selectedOption={{ name: details.season, value: details.season }}
              options={seasons.map((item) => ({ name: item, value: item }))}
              isValid={false}
              onChange={({ value }: any) => handleChange('season', value)}
              className="m-2 text-[14px] w-[324px]"
            />
          </div>
          <Button
            label="Save"
            className="mt-6 w-[124px]"
            onClick={handleSave}
          />
        </div>
      </Modal>
    </div>
  );
};
