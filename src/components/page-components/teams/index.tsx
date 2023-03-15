import { Button } from '@/components/molecules/Button';
import Dropdown from '@/components/molecules/Dropdown';
import { Heading } from '@/components/molecules/Heading';
import { Icon } from '@/components/molecules/Icon';
import Input from '@/components/molecules/Inputs/Input';
import { Paragraph } from '@/components/molecules/Paragraph';
import TeamOverView from '@/components/organisms/Tables/TeamOverview';
import { teams } from '@/components/organisms/Tables/TeamOverview/data';
import { useState } from 'react';

const Teams = () => {
  const [invites, setInvites] = useState([
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
  return (
    <div>
      <Paragraph size="xl" className="!text-shades-black !font-light">
        Invite co-workers to join your company account.
      </Paragraph>
      <div className="mt-4">
        {invites.map((item) => (
          <div key={item.id} className="flex items-center gap-x-4">
            <Input value={item.email} label="Email" onChange={() => {}} inputWrapperClasses="!h-[48px] w-[279px]" />
            <Dropdown
              label="Role"
              options={options}
              isValid
              onChange={() => {}}
              className="!h-[48px] !w-[185px] [&>div]:!w-full"
            />
            <Icon
              name="icon-close"
              className="text-shades-black cursor-pointer"
              height={16}
              width={16}
              onClick={(e) => {
                e.preventDefault();
                const newInvites = [...invites];
                setInvites(newInvites.filter((i) => i.id !== item.id));
              }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2">
        <Button
          className="inline-flex cursor-pointer !bg-shades-white !text-shades-black !px-2 !h-8 !w-[108px] !text-[12px] tracking-[0.06em]"
          onClick={() =>
            setInvites([...invites, { email: '', role: '', id: Date.now() }])
          }
        >
          <Icon name="icon-add" className="cursor-pointer" height={16} width={16} /> Add more
        </Button>
      </div>
      <div className="mt-4">
        <Button className="!h-[32px] !w-[132px] !mx-0 !text-[12px]">Upload</Button>
      </div>
      <div>
        <Paragraph
          size="xl"
          className="mb-4 mt-8 !text-shades-black !font-light"
        >
          Team Overview
        </Paragraph>
        <TeamOverView teams={teams} />
      </div>
    </div>
  );
};

export default Teams;
