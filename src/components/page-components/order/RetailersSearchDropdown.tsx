import { FC, HTMLProps, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { Icon } from '@/components/molecules/Icon';
import { useQuery } from '@apollo/client';
import { GET_RETAILERS } from '@/queries/filters';
import Loading from '../Loading';
import { fonts } from '@/config/fonts';
import useDebounce from '@/utils/debounce';

interface RetailersSearchDropdownProps extends HTMLProps<HTMLInputElement> {
  label: string;
  value: string;
  className?: string;
  handleSelect?: (id: string) => void;
}

const RetailersSearchDropdown: FC<RetailersSearchDropdownProps> = ({
  value,
  label,
  className,
  handleSelect,
}) => {
  const [searchKeyword, setSearchKeyword] = useState<any>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const debouncedValue = useDebounce(searchKeyword, 500);
  const inputRef = useRef<any>(null);

  const ref = useRef<any>(null);

  const handleClickOutside = (e: any) => {
    if (!ref?.current?.contains?.(e.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setSearchKeyword(value);
  }, [value]);

  const { data, loading } = useQuery(GET_RETAILERS, {
    variables: {
      storeName: debouncedValue || null,
    },
  });

  const options =
    data?.retailersByStoreName?.map((item: any) => ({
      id: item?.id,
      label: `${item.store_name || ''} ${
        item?.billing_store_address_line_1 || ''
      }`,
    })) || [];

  const focusInput = () => {
    setIsDropdownOpen(true);
    inputRef.current && inputRef?.current?.focus?.();
  };

  return (
    <div className={clsx('flex-1 mb-2', className)} ref={ref}>
      <div className="relative flex items-center">
        <div
          className={clsx(
            'relative flex cursor-text border border-[#D8D8D8] rounded w-full p-2 overflow-hidden h-[28px] items-center',
            isDropdownOpen ? 'rounded-bl-none rounded-br-none' : ''
          )}
          onClick={focusInput}
        >
          <label className="block cursor-text text-[#999999] font-light leading-tight mr-4 min-w-[132px] max-w-[132px]:">
            {label}
          </label>
          <input
            className="w-full text-[#666666] font-light leading-tight focus:outline-none focus:shadow-outline h-full"
            id="username"
            ref={inputRef}
            value={searchKeyword}
            onChange={(e: any) => setSearchKeyword(e?.target?.value)}
          />
          <Icon name="icon-chevron-down" />
        </div>
        {isDropdownOpen && (
          <div className="absolute w-full top-[28px] z-[2] bg-shades-white border border-t-0 border-neutral-500 rounded-bl rounded-br max-h-[250px] overflow-x-hidden">
            {!loading ? (
              options.length ? (
                options?.map((item: any) => (
                  <div
                    key={item?.id}
                    className="cursor-pointer flex items-center p-2"
                    onClick={() => {
                      handleSelect?.(item?.id);
                      setSearchKeyword(item?.label);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <div className="w-[132px] mr-4"></div>
                    <div>{item.label}</div>
                  </div>
                ))
              ) : (
                <div className={clsx('text-shades-black p-2', fonts.text.md)}>
                  No items found!
                </div>
              )
            ) : (
              <Loading message="Loading data..." />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RetailersSearchDropdown;
