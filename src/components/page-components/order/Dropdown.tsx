import { FC, useEffect, useRef, useState } from 'react';
import { Transition } from '@headlessui/react';
import clsx from 'clsx';
import Input from '@/components/molecules/Inputs/Input';
import { fonts } from '@/config/fonts';
import Loading from '../Loading';

export type Item = {
  id: string | number;
  label: string;
};

interface DropdownFilterProps {
  label: string;
  items?: Item[];
  onChange?: (item: Item) => void;
  loading?: boolean;
}

const DropdownFilter: FC<DropdownFilterProps> = ({
  label,
  items,
  onChange,
  loading,
}) => {
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

  const renderItems = () => {
    return (items?.length ? (
      items?.map(
        (item: Item) =>
          item.label && (
            <div
              key={item.id}
              className={clsx(
                'flex justify-between items-center text-shades-black mb-1 cursor-pointer pl-1 py-2 hover:bg-neutral-100',
                fonts.text.md
              )}
              onClick={() => {
                onChange?.(item);
              }}
            >
              {item.label}
            </div>
          )
      )
    ) : (
      <div className={clsx('text-shades-black', fonts.text.md)}>
        No items found!
      </div>
    ));
  };

  return (
    <div className="relative z-[1] w-full" ref={dropdownRef}>
      <Input
        value=""
        onChange={() => {}}
        label={label}
        inputProps={{
          onFocus: () => setIsOpen(true),
        }}
        className="m-2"
      />
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
        className="z-20"
      >
        <div className="absolute w-[calc(100%-18px)] mt-[-8px] !left-[50%] !translate-x-[-50%] right-0 mx-auto shadow-extra bg-shades-white z-50 rounded p-3">
          <div className="max-h-[250px] overflow-x-hidden">
            {loading ? <Loading message="loading..." /> : renderItems()}
          </div>
        </div>
      </Transition>
    </div>
  );
};

export default DropdownFilter;
