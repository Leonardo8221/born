import { FC, useState } from 'react';

export interface TabsProps {
  tabs: string[];
}

const Tabs: FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState (0);

  return (
    <div>
      <div className="container mx-auto p-10">
        <div className="flex">
          {tabs.map ((tab, index) => (
            <div key={index} className="cursor-pointer">
              <span
                onClick={() => setActiveTab (index)}
                className={`${
                  index === activeTab
                    ? 'w-[124px] h-[56px] px-10 py-4 border-b-2 text-shades-black text-base tracking-[.08em]'
                    : 'w-[124px] h-[56px] px-10 py-4 text-neutral-700 text-base tracking-[.08em]'
                }`}
              >
                {tab}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="container mx-auto px-24 py-6">
        {activeTab}
      </div>
    </div>
  );
}

export default Tabs;
