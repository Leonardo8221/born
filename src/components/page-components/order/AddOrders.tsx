import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { OrderGraphqlDto } from '@/generated/types';
import PlusIcon from '@/assets/svgs/plus.svg';
import { fonts } from '@/config/fonts';
import { ORDER_BY_SEARCH } from '@/queries/orders/search';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Loading from '../Loading';
import HorizontaOrderLists from './HorizontalOrderLists';
import { CreateOrder } from './CreateOrder';
import { ORDER_LIST } from '@/utils/constants';

const AddOrders = () => {
  const router = useRouter();
  const id = router?.query?.id || '';
  const organizationId: number = +id;
  const [activeId, setActiveId] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data, loading, refetch } = useQuery(ORDER_BY_SEARCH, {
    variables: {
      key: ORDER_LIST,
      organizationId,
      start: 0,
      rows: 10,
      confirmed: false,
      cancelled: false,
    },
    fetchPolicy: 'no-cache',
    nextFetchPolicy: 'no-cache',
  });
  const content = data?.ordersBySearch?.content || [];

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="flex flex-col gap-y-6">
      <div className="flex items-center gap-x-4">
        <div className="flex h-[80px] w-[80px] cursor-pointer items-center justify-center bg-neutral-100 border border-neutral-400 rounded">
          <div className="inline-flex">
            <PlusIcon
              onClick={() => setShowModal(true)}
              height={43}
              width={43}
              className="text-shades-black"
            />
          </div>
        </div>
        <h3
          className={clsx(fonts.text.xl, 'text-shades-black tracking-[0.06em]')}
        >
          New order
        </h3>
      </div>

      {loading ? (
        <Loading message="Loading collections" />
      ) : (
        content?.map((order: OrderGraphqlDto) => (
          <HorizontaOrderLists
            key={order?.id}
            onSelect={(id) => setActiveId(id)}
            isActive={order.id === activeId}
            approved={true}
            confirmed={false}
            cancelled={false}
            name={order.name}
            id={order.id}
            billing_address={order.billing_address}
            total={order.total}
            buyer_name={order.buyer_name}
          />
        ))
      )}
      <CreateOrder
        showModal={showModal}
        closeModal={() => {
          refetch();
          setShowModal(false);
        }}
      />
    </div>
  );
};

export default AddOrders;
