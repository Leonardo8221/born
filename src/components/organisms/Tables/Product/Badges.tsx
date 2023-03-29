import { FC, useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/molecules/Badge';
import { Transition } from '@headlessui/react';
import TriangleDecorator from '@/components/molecules/DropdownMenu/TriangleDecorator';
import clsx from 'clsx';
import { fonts } from '@/config/fonts';

interface BadgeProps {
  items: string[];
  countLimit?: number;
}

const Badges: FC<BadgeProps> = ({ items = [], countLimit = 1 }) => {
  const itemsToShow = [...items]?.splice(0, countLimit);
  const itemsCount = [...items]?.splice(countLimit);
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<any>(null);

  const handleClickOutside = (e: any) => {
    if (!ref?.current?.contains?.(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-center gap-1">
      {itemsToShow?.map((item) => (
        <Badge
          key={item}
          size="xl"
          title={item}
          className="w-[111px] !leading-8 !inline-block text-ellipsis overflow-hidden whitespace-nowrap"
        >
          {item}
        </Badge>
      ))}
      <div className="relative"  ref={ref}>
        {itemsCount?.length > 0 && (
          <Badge
            size="xl"
            className="whitespace-nowrap cursor-pointer text-shades-black border border-shades-black"
            onClick={() => setIsOpen(!isOpen)}
          >
            + {itemsCount?.length}
          </Badge>
        )}
        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
          className="relative z-20"
        >
          <div className="absolute w-[180px] mt-[17px] !left-[50%] !translate-x-[-50%] right-0 mx-auto shadow-extra bg-shades-white z-50 rounded p-3">
            <div className="absolute left-[50%] translate-x-[-50%] -top-[9px]">
              <TriangleDecorator />
            </div>
            {items?.map?.((item: string) => (
              <div
                key={item}
                className={clsx(
                  'flex justify-between items-center text-shades-black h-[24px] mb-1 pl-1',
                  fonts.text.md
                )}
                onClick={() => setIsOpen(false)}
              >
                {item}
              </div>
            ))}
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default Badges;
