import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

export interface Tab {
  id: number;
  label: string;
  content?: React.ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  className?: string;
}

function Tabs({ tabs, className }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (tabId: number) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      <div className="mx-auto">
        <div className={clsx('flex', className)}>
          {tabs.map((tab, index) => (
            <div key={index} className="cursor-pointer">
              <span
                onClick={() => handleTabClick(tab.id)}
                className={`inline-flex justify-center w-atuo py-4 px-2 mr-2 text-base tracking-[.08em] h-[56px] ${
                  tab.id === activeTab
                    ? 'border-b-2 text-shades-black'
                    : 'text-neutral-700'
                }`}
              >
                {tab.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="py-4">
        {tabs.map((tab) => (
          <div key={tab.id} className={tab.id === activeTab ? 'active' : ''}>
            {tab.id === activeTab ? tab.content : null}
          </div>
        ))}
      </div>
    </div>
  );
}

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};

export default Tabs;
