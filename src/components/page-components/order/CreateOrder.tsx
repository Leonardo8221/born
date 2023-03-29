import React, { useState, FC } from 'react';
import Modal from '@/components/molecules/Modal';
import { Button } from '@/components/molecules/Button';
import Input from '@/components/molecules/Inputs/Input';
import { OrderResourceApi } from 'client/command';
import { apiConfig } from '@/utils/apiConfig';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';
import { ORDER_LIST } from '@/utils/constants';
import { OrderGraphqlDto } from '@/generated/types';

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
  retailer: string;
  buyer_name: string;
  discount: number;
  surcharge: number;
}

const initialState: OrderDetails = {
  name: '',
  purchase_order: '',
  retailer: '',
  buyer_name: '',
  discount: 0,
  surcharge: 0,
};

type StateKeys = 'name' | 'buyer_name' | 'purchase_order' | 'retailer';

export const CreateOrder: FC<CreatOrderProps> = ({
  showModal,
  productIds,
  closeModal,
  setSelectedOrder,
  resetProductIds,
  handleCloseModal
}) => {
  const router = useRouter();
  const client = useApolloClient();
  const [details, setDetails] = useState<OrderDetails>(initialState);
  const id = router?.query?.id || '';
  const organizationId: number = +id;
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
            <Input
              value={details.retailer}
              label="Retailer name"
              type="text"
              name="retailer"
              onChange={(val) => handleChange('retailer', val)}
              className="m-2 text-[14px] w-[324px]"
            />
            <Input
              value={details.buyer_name}
              label="Client name"
              type="text"
              name="buyer_name"
              onChange={(val) => handleChange('buyer_name', val)}
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
