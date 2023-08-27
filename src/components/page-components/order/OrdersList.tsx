import React, { FC } from 'react';
import Modal from '@/components/molecules/Modal';
import AddOrders from '@/components/page-components/order/AddOrders';
import { OrderGraphqlDto } from '@/generated/types';

interface OrderListProps {
  isModalVisible: boolean;
  setModalIsVisible: (visible: boolean) => void;
  resetProductIds: () => void;
  productIds: number[];
  selectedOrder: OrderGraphqlDto | null;
  setSelectedOrder: (order: OrderGraphqlDto | null) => void;
}

export const OrderList: FC<OrderListProps> = ({
  isModalVisible,
  setModalIsVisible,
  resetProductIds,
  productIds,
  selectedOrder,
  setSelectedOrder,
}) => {
  return (
    <Modal
      isOpen={isModalVisible}
      onClose={() => {
        setModalIsVisible(false);
      }}
      title={'Choose order'}
      className="!max-h-[600px] !max-w-[736px] overflow-x-hidden overflow-y-auto !z-[999]"
    >
      <AddOrders
        handleCloseModal={() => setModalIsVisible(!isModalVisible)}
        productIds={productIds}
        resetProductIds={resetProductIds}
        selectedOrder={selectedOrder}
        setSelectedOrder={setSelectedOrder}
      />
    </Modal>
  );
};
