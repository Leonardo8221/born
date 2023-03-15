import React, { useState, FC } from 'react';
import Modal from '@/components/molecules/Modal';
import { Button } from '@/components/molecules/Button';
import Input from '@/components/molecules/Inputs/Input';

interface CreatOrderProps {
  showModal: boolean;
  closeModal: () => void;
}

interface OrderDetails {
  name: string;
  purchase_order: string;
  retailer: string;
  buyer_name: string;
}

type StateKeys = 'name' | 'buyer_name' | 'purchase_order' | 'retailer';

export const CreateOrder: FC<CreatOrderProps> = ({ showModal, closeModal }) => {
  const [details, setDetails] = useState<OrderDetails>({
    name: '',
    purchase_order: '',
    retailer: '',
    buyer_name: '',
  });
  const handleChange = (key: StateKeys, value: string) => {
    setDetails((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  console.log(details);

  const handleSave = () => {
    console.log('akhon');
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
              value="Xotil X Selfridges - SS23"
              label="Draft order name"
              type="text"
              onChange={(val) => handleChange('name', val)}
              name="name"
              className="m-2 text-[14px] w-[324px]"
            />
            <Input
              value=""
              label="Purchase order number"
              type="number"
              onChange={(val) => handleChange('purchase_order', val)}
              name="purchase_order"
              className="m-2 text-[14px] w-[324px]"
            />
          </div>
          <div className="flex w-full">
            <Input
              value="Selfridges"
              label="Retailer name"
              type="text"
              name="retailer"
              onChange={(val) => handleChange('retailer', val)}
              className="m-2 text-[14px] w-[324px]"
            />
            <Input
              value="Julie McKenzie"
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
