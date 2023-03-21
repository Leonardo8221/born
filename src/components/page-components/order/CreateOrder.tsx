import React, { useState, FC } from 'react';
import Modal from '@/components/molecules/Modal';
import { Button } from '@/components/molecules/Button';
import Input from '@/components/molecules/Inputs/Input';
import { OrderResourceApi } from 'client/command';
import { apiConfig } from '@/utils/apiConfig';
import Toast from '../Toast';
import { useRouter } from 'next/router';
import { useApolloClient } from '@apollo/client';
import { ORDER_LIST } from '@/utils/constants';

interface CreatOrderProps {
  showModal: boolean;
  closeModal: () => void;
}

interface OrderDetails {
  name: string;
  purchase_order: string;
  retailer: string;
  buyer_name: string;
  discount: number;
  surcharge: number;
}

type StateKeys = 'name' | 'buyer_name' | 'purchase_order' | 'retailer';

export const CreateOrder: FC<CreatOrderProps> = ({ showModal, closeModal }) => {
  const router = useRouter();
  const client = useApolloClient();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [details, setDetails] = useState<OrderDetails>({
    name: '',
    purchase_order: '',
    retailer: '',
    buyer_name: '',
    discount: 0,
    surcharge: 0
  });
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
      api.apiOrderCreateNewDraftOrderPost(organizationId, details);
      setSuccessMessage('Order details added successfully');
      closeModal();
      setDetails({
        name: '',
        purchase_order: '',
        retailer: '',
        buyer_name: '',
        discount: 0,
        surcharge: 0
      });
      await client.refetchQueries({
        include: [ORDER_LIST],
      });
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error: any) {
      setErrorMessage(error?.response?.message || 'Order failed to add');
      setTimeout(() => {
        setErrorMessage('');
      }, 3000);
      closeModal();
      setDetails({
        name: '',
        purchase_order: '',
        retailer: '',
        buyer_name: '',
        discount: 0,
        surcharge: 0
      });
      console.log(error);
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
      <Toast errorMessage={errorMessage} successMessage={successMessage} />
    </div>
  );
};
