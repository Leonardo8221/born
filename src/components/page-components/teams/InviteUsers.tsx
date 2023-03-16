import { FC, useState } from 'react';
import { Button } from '@/components/molecules/Button';
import Dropdown from '@/components/molecules/Dropdown';
import { Icon } from '@/components/molecules/Icon';
import Input from '@/components/molecules/Inputs/Input';

export type User = {
  id: number;
  email: string;
  role: string;
}

interface InviteUsersProps {
  handleInviteUsers: (
    users: User[]
  ) => void;
}

const InviteUsers: FC<InviteUsersProps> = ({ handleInviteUsers }) => {
  const [inviteUsers, setInviteUsers] = useState([
    {
      id: Date.now(),
      email: '',
      role: '',
    },
  ]);

  const options = [
    {
      name: 'Owner',
      value: 'owner',
    },
    {
      name: 'Manager',
      value: 'manager',
    },
  ];

  const handleChange = ({
    id,
    name,
    value,
  }: {
    id: number;
    name: 'email' | 'role';
    value: string;
  }) => {
    const items = [...inviteUsers];
    const selectedItem = items.filter((item) => item.id === id)[0];
    selectedItem[name] = value;
    setInviteUsers([
      ...inviteUsers.map((item) => (item.id === id ? selectedItem : item)),
    ]);
  };

  return (
    <div>
      <div className="mt-4">
        {inviteUsers.map((item) => (
          <div key={item.id} className="flex items-center gap-x-4">
            <Input
              value={item.email}
              label="Email"
              onChange={(value: string) =>
                handleChange({ id: item.id, name: 'email', value })
              }
              inputWrapperClasses="!h-[48px] w-[279px]"
              isValid={!!item.email}
            />
            <Dropdown
              label="Role"
              options={options}
              isValid
              onChange={(option) =>
                handleChange({
                  id: item.id,
                  name: 'role',
                  value: option?.value || '',
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
              { email: '', role: '', id: Date.now() },
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
          onClick={handleInviteUsers}
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

export default InviteUsers;
