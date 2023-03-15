import React, { FC } from 'react';
import Modal from '@/components/molecules/Modal';
import AddOrders from '@/components/page-components/order/AddOrders';

interface OrderListProps {
  isModalVisible: boolean;
  setModalIsVisible: (visible: boolean) => void;
}

export const OrderList: FC<OrderListProps> = ({
  isModalVisible,
  setModalIsVisible,
}) => {
  return (
    <Modal
      isOpen={isModalVisible}
      onClose={() => {
        setModalIsVisible(false);
      }}
      title={'Choose order'}
      className="!max-h-[417px] !max-w-[736px] overflow-x-hidden overflow-y-auto"
    >
      <AddOrders onSelect={() => console.log('jo be ayega dekha jayega')} />
    </Modal>
  );
};
