import { Button } from '@/components/molecules/Button';
import { Paragraph } from '@/components/molecules/Paragraph';
import { OrderGraphqlDto } from '@/generated/types';
import { OrderResourceApi } from 'client/command';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface NotificationProps {
  order: OrderGraphqlDto;
  onCancel: () => void;
}

const Notification: FC<NotificationProps> = ({
  order,
  onCancel,
}) => {
  const router = useRouter();
  const organizationId = Number(router?.query?.id);

  const handleCancel = async () => {
    onCancel();
    try {
      const config = await getConfig();
      const api = new OrderResourceApi(config);
      await api.apiOrderCancelOrderPut(order?.id);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div
      className="fixed top-0 left-0 w-full z-30 !bg-shades-white"
      style={{
        background:
          'linear-gradient(86.66deg, #77D5D3 -28.88%, rgba(255,255,255,0) 113.94%)',
      }}
    >
      <div className="h-[72px] w-full max-w-[1140px] mx-auto flex justify-between items-center gap-x-4">
        <Paragraph size="lg" className="text-black-shades">
          Your order &lsquo;{order?.name}&lsquo; has been created
        </Paragraph>
        <div className="flex items-center gap-x-4">
          <Button variant="outlined" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="outlined" size="sm" onClick={() => router.push(
              `/organization/${organizationId}/order/${order?.id}`
            )}>
            View order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
