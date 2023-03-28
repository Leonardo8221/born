import { fonts } from '@/config/fonts';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import { FC, Ref, useEffect, useRef, useState } from 'react';
import { Badge } from '../Badge';
import { Button } from '../Button';
import TriangleDecorator from '../DropdownMenu/TriangleDecorator';
import { Icon } from '../Icon';
import { SearchInput } from '../SearchInput';

export type Item = {
  id: string | number;
  label: string;
};

interface DropdownFilterProps {
  label: string;
  items?: Item[];
  onChange?: (item: Item) => void;
  selectedItems?: string[];
  onReset?: (e: any) => void;
  isSearchable?: boolean;
}

const DropdownFilter: FC<DropdownFilterProps> = ({
  label,
  items,
  onChange,
  selectedItems,
  isSearchable,
  onReset,
}) => {
  console.log(selectedItems);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<any>(null);

  const handleClickOutside = (e: any) => {
    if (!dropdownRef?.current?.contains?.(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative z-[1]" ref={dropdownRef}>
      <Badge
        className={clsx(
          'cursor-pointer !h-[32px] border !border-neutral-600 !text-[12px] !px-4',
          selectedItems?.length && selectedItems.length > 0
            ? '!bg-neutral-300'
            : '!bg-shades-white'
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {label}
        {!!selectedItems?.length && (
          <span
            className={clsx(
              'flex items-center justify-center h-3 w-3 text-shades-white bg-accent-a-200 rounded-full ml-1',
              fonts.text.xs
            )}
          >
            {selectedItems.length}
          </span>
        )}
      </Badge>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        className="z-10"
      >
        <div className="absolute w-[260px] mt-[17px] !left-[50%] !translate-x-[-50%] right-0 mx-auto shadow-extra bg-shades-white z-50 rounded p-3">
          <div className="absolute left-[50%] translate-x-[-50%] -top-[9px]">
            <TriangleDecorator />
          </div>
          {isSearchable && (
            <div className="mb-2">
              <SearchInput
                value=""
                onClear={() => {}}
                onEnter={() => {}}
                className="!max-w-full !w-full"
              />
            </div>
          )}
          <div className='max-h-[250px] overflow-x-hidden'>
            {items?.length ? (
              items?.map((item: Item) => (
                <div
                  key={item.id}
                  className={clsx(
                    'flex justify-between items-center text-shades-black h-[24px] mb-1 cursor-pointer pl-1',
                    fonts.text.md,
                    selectedItems?.includes(item?.label) && 'font-medium'
                  )}
                  onClick={() => {
                    onChange?.(item);
                  }}
                >
                  {item.label}
                  {selectedItems?.includes(item?.label) && (
                    <Icon name="icon-check-circle" />
                  )}
                </div>
              ))
            ) : (
              <div className={clsx('text-shades-black', fonts.text.md)}>
                No items found!
              </div>
            )}
          </div>

          <div className='mt-3'>
            <Button
              variant="outlined"
              className="!h-[32px] !rounded !mr-0 !border-neutral-600 !text-[12px]"
              onClick={(e) => {
                onReset?.(e);
                setIsOpen(false);
              }}
            >
              Reset
            </Button>
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default DropdownFilter;
