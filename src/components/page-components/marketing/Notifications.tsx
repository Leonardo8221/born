import { Button } from '@/components/molecules/Button';
import Switch from '@/components/molecules/Switch';
import React from 'react'

const Notifications = () => {
  return (
    <>
      <p className="text-shades-black leading-8 text-[18px] mb-[26px]">
        Your personal details
      </p>
      <div className="flex flex-col">
        <div>
          <Switch
            label={"New product like"}
            classNameLabel="min-w-[275px]"
          />
        </div>
        <div className="mt-[32px]">
          <Switch label={"New follow"} classNameLabel="min-w-[275px]" />
        </div>
        <div className="mt-[32px]">
          <Switch
            label={"New message"}
            classNameLabel="min-w-[275px]"
          />
        </div>
        <div className="mt-[32px]">
          <Switch
            label={"New draft order"}
            classNameLabel="min-w-[275px]"
          />
        </div>
      </div>
      <Button className="ml-0 w-auto mt-[36px]">Save</Button>
    </>
  );
}

export default Notifications