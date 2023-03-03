import React, {useState} from 'react';
import PropTypes from 'prop-types';
function Tabs({tabs}) {
  const [activeTab, setActiveTab] = useState (0);

  return (
    <div>
      <div className="container mx-auto p-10">
        <div className="flex">
          {tabs.map ((tab, index) => (
            <div key={index} className="cursor-pointer">
              <span
                onClick={() => setActiveTab (index)}
                className={`${index === activeTab ? 'w-[124px] h-[56px] px-10 py-4 border-b-2 text-shades-black text-base tracking-[.08em]' : 'w-[124px] h-[56px] px-10 py-4 text-neutral-700 text-base tracking-[.08em]'}`}
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

Tabs.propType = {
  tabs: PropTypes.arrayOf (PropTypes.string).isRequired,
};

Tabs.defaultProps = {
  tabs: ['Draft'],
};

export default Tabs;
