import React, { FC, useEffect, useState } from 'react';
import { UserResourceApi } from 'client/command';
import { Button } from '@/components/molecules/Button';
import Switch from '@/components/molecules/Switch';
import { apiConfig } from '@/utils/apiConfig';
import Toast from '../Toast';
import { USER_WITH_ORGANIZATION_QUERY } from '@/queries/users';
import { useQuery } from '@apollo/client';
import Loading from '../Loading';

const intialState = {
  keycloak_id: '',
  keycloak_username: '',
  message_notification_enabled: false,
  order_notification_enabled: false,
  product_notification_enabled: false,
  follow_notification_enabled: false,
};

const Notifications: FC = () => {
  const [notifications, setNotifications] = useState(intialState);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { data: user, loading } = useQuery(USER_WITH_ORGANIZATION_QUERY);
  const data = user?.userWithOrganizationsAndUpdateLastLoggedInDate;

  useEffect(() => {
      setNotifications({
        keycloak_id: data?.keycloak_id || '',
        keycloak_username: data?.keycloak_username || '',
        message_notification_enabled: !!data?.message_notification_enabled,
        order_notification_enabled: !!data?.order_notification_enabled,
        product_notification_enabled: !!data?.product_notification_enabled,
        follow_notification_enabled: !!data?.follow_notification_enabled,
      });
  }, [data]);

  const handleChange = (key: keyof typeof intialState, value: any) => {
    setNotifications({
      ...notifications,
      [key]: value,
    });
  };

  const handleErrorMesssage = (message: string) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const handleSuccessMesssage = (message: string) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const config = await apiConfig();
      const api = new UserResourceApi(config);
      api.apiUserUpdateUserAndKcUserPut({ ...notifications });
      handleSuccessMesssage('Account settings updated successfully!');
      setIsLoading(false);
    } catch (error) {
      handleErrorMesssage('Failed to update account settings!');
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <>
      <p className="text-shades-black font-light leading-8 text-[18px] mb-[26px]">
        Each team member can set their own preferred notifications
      </p>
      {loading ? (
        <Loading message="Loading notifications..." />
      ) : (
        <>
          <div className="flex flex-col">
            <div>
              <Switch
                label={'New product like'}
                classNameLabel="min-w-[275px]"
                checked={notifications.product_notification_enabled}
                onChange={(checked) =>
                  handleChange('product_notification_enabled', checked)
                }
              />
            </div>
            <div className="mt-[32px]">
              <Switch
                label={'New follow'}
                classNameLabel="min-w-[275px]"
                checked={notifications.follow_notification_enabled}
                onChange={(checked) =>
                  handleChange('follow_notification_enabled', checked)
                }
              />
            </div>
            <div className="mt-[32px]">
              <Switch
                label={'New message'}
                classNameLabel="min-w-[275px]"
                checked={notifications.message_notification_enabled}
                onChange={(checked) =>
                  handleChange('message_notification_enabled', checked)
                }
              />
            </div>
            <div className="mt-[32px]">
              <Switch
                label={'New draft order'}
                classNameLabel="min-w-[275px]"
                checked={notifications.order_notification_enabled}
                onChange={(checked) =>
                  handleChange('order_notification_enabled', checked)
                }
              />
            </div>
          </div>
          <Button
            className="ml-0 w-auto mt-[36px]"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            Save
          </Button>
        </>
      )}
      <Toast successMessage={successMessage} errorMessage={errorMessage} />
    </>
  );
};

export default Notifications;
