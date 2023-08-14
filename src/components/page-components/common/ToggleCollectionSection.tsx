import { FC, useEffect, useState } from 'react';
import clsx from 'clsx';
import { Icon } from '@/components/molecules/Icon';

export interface ToggleCollectionSectionProps {
  showSection?: boolean;
  onChange?: (toggled: boolean) => void;
}

const ToggleCollectionSection: FC<ToggleCollectionSectionProps> = ({
  showSection,
  onChange,
}) => {
  const [isToggle, setToggle] = useState(true);

  useEffect(() => {
    showSection !== null && showSection !== undefined && setToggle(showSection);
  }, []);

  const handleOnChange = (toggled: boolean) => {
    onChange && onChange(toggled);
    setToggle(toggled)
  }

  return (
    <div className="inline-flex h-8 w-[79px] items-center">
      <div
        className={
          clsx(
            'flex items-center justify-center h-full w-full cursor-pointer border border-neutral-200 rounded-tl-[100px] rounded-bl-[100px]',
            isToggle ? 'bg-accent-b-200 text-shades-black' : 'bg-shades-white text-neutral-600'
          )
        }
        onClick={() => handleOnChange(true)}
      >
        <Icon name="icon-scale" className="h-6 w-6 flex items-center justify-center p-[2px]" />
      </div>
      <div
        className={
          clsx(
            'flex items-center justify-center h-full w-full cursor-pointer border border-neutral-200 rounded-tr-[100px] rounded-br-[100px]',
            !isToggle ? 'bg-accent-b-200 text-shades-black' : 'bg-shades-white text-neutral-600'
          )
        }
        onClick={() => handleOnChange(false)}
      >
        <Icon name="icon-unscale" className="h-6 w-6 flex items-center justify-center p-[2px]" />
      </div>
    </div>
  );
}

export default ToggleCollectionSection;
