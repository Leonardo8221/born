import { FC, useState } from 'react';
import { Button } from '@/components/molecules/Button';
import Dropdown from '@/components/molecules/Dropdown';
import { Icon } from '@/components/molecules/Icon';
import Input from '@/components/molecules/Inputs/Input';
import TriangleDecorator from '@/components/molecules/DropdownMenu/TriangleDecorator';
import clsx from 'clsx';
import { fonts } from '@/config/fonts';
import { Transition } from '@headlessui/react';
import useDebounce from '@/utils/debounce';
import { useQuery } from '@apollo/client';
import { USER_BY_KEYCLOAK_EMAIL } from '@/queries/users';
import Loading from '../Loading';
import { Paragraph } from '@/components/molecules/Paragraph';

export type User = {
  id: number;
  email: string;
  role: 'MANAGER' | 'OWNER';
  user_id: string;
};

interface InviteUsersProps {
  handleInviteUsers: (users: any[], callback?: (val: any) => void) => void;
}

const InviteUsers: FC<InviteUsersProps> = ({ handleInviteUsers }) => {
  const [inviteUsers, setInviteUsers] = useState([
    {
      id: Date.now(),
      email: '',
      role: 'MANAGER',
      user_id: '',
    },
  ]);

  const [isOpen, setIsOpen] = useState<number | null>(null);
  const [keyword, setKeyword] = useState('');
  const debouncedValue = useDebounce(keyword, 1000);

  const { data, loading } = useQuery(USER_BY_KEYCLOAK_EMAIL, {
    variables: { keycloakEmail: debouncedValue },
  });
  const emails = data?.usersByKeycloakEmail;

  const options = [
    {
      name: 'Owner',
      value: 'OWNER',
    },
    {
      name: 'Manager',
      value: 'MANAGER',
    },
  ];

  const handleChange = ({
    id,
    name,
    value,
    user_id,
  }: {
    id: number;
    name: 'email' | 'role' | 'user_id';
    value: any;
    user_id?: string;
  }) => {
    const items = [...inviteUsers];
    const selectedItem = items.filter((item) => item.id === id)[0];
    selectedItem[name] = value;
    if(user_id) {
      selectedItem['user_id'] = user_id;
    }
    setInviteUsers(inviteUsers.map((item) => (item.id === id ? selectedItem : item)));
  };

  return (
    <div>
      <div className="mt-4">
        {inviteUsers.map((item) => (
          <div key={item.id} className="flex items-center gap-x-4">
            <div className="w-[279px]">
              <Input
                value={item.email}
                inputProps={{ value: item.email }}
                label="Email"
                onChange={(value: string) => {
                  setKeyword(value);
                  handleChange({ id: item.id, name: 'email', value });
                  setIsOpen(item.id);
                }}
                inputWrapperClasses="!h-[48px] w-[279px]"
                isValid={!!item.email}
              />
              <div className='relative w-full z-10'>
                <Transition
                  show={isOpen === item.id}
                  enter="transition ease-out duration-100 transform"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-75 transform"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                  className="z-10"
                >
                  <div className="absolute top-[5px] left-0 right-0 w-full bg-shades-white rounded shadow-extra z-10">
                    <div className="absolute right-1 -top-2">
                      <TriangleDecorator />
                    </div>
                    {!loading && !emails?.length && (
                      <Paragraph
                        size="base"
                        className="!text-shades-black !font-light !px-4 py-2"
                      >
                        No data found!
                      </Paragraph>
                    )}
                    {loading ? (
                      <div className="flex px-4 py-2 items-center [&>div]:!mt-0">
                        <Loading message="Loading..." />
                      </div>
                    ) : (
                      emails?.map((option: any) => (
                        <>
                          <button
                            key={option?.keycloak_email}
                            className="w-[calc(100%-16px)] text-left mx-2 py-2 my-1 rounded-[4px] text-shades-black hover:bg-neutral-200 focus:outline-none focus:bg-neutral-200"
                            onClick={(e) => {
                              e.preventDefault();
                              handleChange({
                                id: item.id,
                                name: 'email',
                                value: option?.keycloak_email,
                                user_id: option?.id,
                              });
                              setIsOpen(null);
                            }}
                            role="menuitem"
                          >
                            <div
                              className={clsx(
                                'px-2',
                                fonts.text.md,
                                fonts.fontWeights.regular
                              )}
                            >
                              {option?.keycloak_email}
                            </div>
                          </button>
                        </>
                      ))
                    )}
                  </div>
                </Transition>
              </div>
            </div>
            <Dropdown
              label="Role"
              options={options}
              isValid
              selectedOption={{
                name: item?.role,
                value: item?.role?.toUpperCase(),
              }}
              onChange={(option) =>
                handleChange({
                  id: item.id,
                  name: 'role',
                  value: option?.value || 'MANAGER',
                })
              }
              className="!h-[48px] !w-[185px] [&>div]:!w-full"
              width={185}
            />
            {inviteUsers.length > 1 && (
              <Icon
                name="icon-trash"
                className="text-error-100 cursor-pointer"
                height={20}
                width={20}
                onClick={(e) => {
                  e.preventDefault();
                  const newInviteUsers = [...inviteUsers];
                  setInviteUsers(
                    newInviteUsers.filter((i) => i.id !== item.id)
                  );
                }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="mt-2">
        <Button
          className="inline-flex cursor-pointer !bg-shades-white !text-shades-black !px-2 !h-8 !w-[108px] !text-[12px] tracking-[0.06em]"
          onClick={() =>
            setInviteUsers([
              ...inviteUsers,
              { email: '', role: 'MANAGER', id: Date.now(), user_id: '' },
            ])
          }
        >
          <Icon
            name="icon-add"
            className="cursor-pointer"
            height={16}
            width={16}
          />{' '}
          Add more
        </Button>
      </div>
      <div className="mt-4">
        <Button
          className="!h-[32px] !w-[132px] !mx-0 !text-[12px]"
          onClick={() => handleInviteUsers(inviteUsers, setInviteUsers)}
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

export default InviteUsers;
