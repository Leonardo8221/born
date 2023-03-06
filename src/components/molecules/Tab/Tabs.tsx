import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

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
        <div className={clsx("flex", className)}>
          {tabs.map((tab, index) => (
            <div key={index} className="cursor-pointer">
              <span
                onClick={() => handleTabClick(tab.id)}
                className={`inline-flex justify-center ${
                  tab.id === activeTab
                    ? "w-[124px] h-[56px] py-4 border-b-2 text-shades-black text-base tracking-[.08em]"
                    : "w-[124px] h-[56px] py-4 text-neutral-700 text-base tracking-[.08em]"
                }`}
              >
                {tab.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="py-6">
        {tabs.map((tab) => (
          <div key={tab.id} className={tab.id === activeTab ? "active" : ""}>
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
