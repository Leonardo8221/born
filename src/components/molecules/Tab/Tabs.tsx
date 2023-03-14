import { useEffect, useState } from "react";
import clsx from "clsx";
import Link from "next/link";

export interface Tab {
  id: number | string;
  label: string;
  content?: React.ReactNode;
  link?: string;
}

interface TabsProps {
  tabs: Tab[];
  className?: string;
  onTabChange?: (tabId: number | string) => void;
  active?: string | number;
}

function Tabs({ tabs, className, onTabChange, active }: TabsProps) {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  const handleTabClick = (tabId: number | string) => {
    onTabChange ? onTabChange(tabId) : setActiveTab(tabId);
  };

  useEffect(() => {
    if (active) {
      setActiveTab(active);
    }
  }, [active]);

  return (
    <div>
      <div className="mx-auto">
        <div className={clsx("flex", className)}>
          {tabs.map((tab, index) => {
            const el = (
              <div key={index} className="cursor-pointer">
                <span
                  onClick={() => handleTabClick(tab.id)}
                  className={`inline-flex justify-center w-atuo py-4 px-2 mr-2 text-base tracking-[.08em] h-[56px] ${
                    tab.id === activeTab
                      ? "border-b-2 text-shades-black"
                      : "text-neutral-700"
                  }`}
                >
                  {tab.label}
                </span>
              </div>
            );
            if (tab.link) {
              return (
                <Link key={`${index}-tab-link`} href={tab.link}>
                  {el}
                </Link>
              );
            }
            return el;
          })}
        </div>
      </div>
      <div className="py-4">
        {tabs.map((tab) => (
          <div key={tab.id} className={tab.id === activeTab ? "active" : ""}>
            {tab.id === activeTab ? tab.content : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tabs;
