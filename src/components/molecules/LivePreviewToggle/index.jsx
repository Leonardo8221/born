import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { Icon } from '../Icon';

const LivePreivewToggle = ({
  showPreview,
  onChange,
}) => {
  const [isToggle, setToggle] = useState(true);

  useEffect(() => {
    showPreview !== null && showPreview !== undefined && setToggle(showPreview);
  }, []);

  const handleOnChange = (toggled) => {
    onChange && onChange(toggled);
    setToggle(toggled)
  }

  return (
    <div className="inline-flex h-8 w-[79px] items-center">
      <div
        className={
          clsx(
            'h-full w-full cursor-pointer border border-neutral-200 rounded-tl-[100px] rounded-bl-[100px]',
            isToggle ? 'bg-accent-b-200 text-shades-black' : 'bg-shades-white text-neutral-600'
          )
        }
        onClick={() => handleOnChange(true)}
      >
        <Icon name="icon-show" className="h-full w-full flex items-center justify-center" />
      </div>
      <div
        className={
          clsx(
            'h-full w-full cursor-pointer border border-neutral-200 rounded-tr-[100px] rounded-br-[100px]',
            !isToggle ? 'bg-accent-b-200 text-shades-black' : 'bg-shades-white text-neutral-600'
          )
        }
        onClick={() => handleOnChange(false)}
      >
        <Icon name="icon-hide" className="h-full w-full flex items-center justify-center" />
      </div>
    </div>
  );
}

export default LivePreivewToggle;
