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
import DropdownFilter from './Dropdown';
import Dropdown from '@/components/molecules/Dropdown';
import { BUYERS_QUERY, RETAILERS_QUERY } from '@/queries/filters';

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
  retailer_id: null | string;
  buyer_id: null | string;
  discount: number;
  surcharge: number;
  season: string;
}

const initialState: OrderDetails = {
  name: '',
  purchase_order: '',
  retailer_id: null,
  buyer_id: null,
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
  const id = router?.query?.id || '';
  const organizationId: number = +id;

  const { data, loading } = useQuery(BUYERS_QUERY, {
    variables: {
      organizationId,
      retailerId: details.retailer_id
    },
    skip: !id,
  });

  const { data: retailers, loading: isLoadingRetailers } = useQuery(
    RETAILERS_QUERY,
    {
      variables: {
        organizationId,
      },
      skip: !id,
    }
  );

  console.log(retailers, data)

  const handleChange = (key: StateKeys, value: string) => {
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
        className="!max-h-[417px] !max-w-[736px] overflow-x-hidden overflow-y-auto"
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
              items={retailers?.retailersByOrganizationId?.map((item: any) => ({
                id: item?.id,
                label: item?.store_name,
              }))}
              label="Retailer name"
              loading={isLoadingRetailers}
            />
            <DropdownFilter
              items={data?.buyersByOrganizationAndRetailerId?.map(
                (item: any) => ({ id: item?.id, label: item?.buyer_name })
              )}
              label="Customer name"
              loading={loading}
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
