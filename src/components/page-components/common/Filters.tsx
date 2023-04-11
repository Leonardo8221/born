import { ChangeEvent, FC, useState } from 'react';
import { TagProps } from '@/components/atoms/Tag';
import { Button } from '@/components/molecules/Button';
import {
  GridType,
  IconButtonGroup,
} from '@/components/molecules/IconButtonGroup';
import { SearchInput } from '@/components/molecules/SearchInput';
import DropdownFilter from '@/components/molecules/DropdownFilter';

type Action = {
  name: string;
  action: (e: any) => void;
  disabled?: boolean;
};

export type Tags = {
  action?: (e: { id: number | string; label: string }) => void;
  options?: { id: number | string; label: string }[];
  selectedItems?: string[];
  label: string;
  onReset?: () => void;
};

interface FiltersProps {
  onGridChange?: (grid: GridType) => void;
  gridType?: GridType;
  onSelect?: () => void;
  filterTags?: Tags[];
  actions?: Action[];
  isSelectable?: boolean;
  selectedItems?: Array<string | number>;
  searchKeyword?: string;
  onSearch?: (value: string) => void;
  isOrder?: boolean;
}

const Filters: FC<FiltersProps> = ({
  gridType,
  onGridChange,
  onSelect,
  filterTags,
  actions,
  isSelectable,
  selectedItems,
  searchKeyword,
  onSearch,
  isOrder,
}) => {
  return (
    <div className="sticky top-0 print:hidden py-4 flex items-center justify-between bg-shades-white z-[2]" id="collection-filter">
      <div className="flex items-center gap-2">
        <SearchInput
          value={searchKeyword || ''}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            onSearch && onSearch(e?.target?.value)
          }
          onClear={() => onSearch && onSearch('')}
          onEnter={function noRefCheck() {}}
          placeholder="Search"
          className="!max-w-[96px]"
          inputClasses="!pr-6 !pl-7 !border-neutral-600"
          autoFocus
        />
        {filterTags?.map((item) => (
          <DropdownFilter
            key={item.label}
            label={item.label}
            onChange={item.action}
            onReset={item.onReset}
            selectedItems={item.selectedItems}
            items={item.options}
          />
        ))}
      </div>
      {isOrder ? (
        <div>
          <Button
            variant="outlined"
            size="sm"
            className="!inline-flex !max-w-auto !w-auto !border-neutral-600 text-shades-black !text-[12px] !px-3"
          >
            Export
          </Button>
        </div>
      ) : (
        <>
          <div className="flex items-center">
            <div className="flex gap-2 items-center pr-4 mr-4 border-r border-neutral-400">
              <Button
                variant="outlined"
                size="sm"
                onClick={onSelect && onSelect}
                className="!inline-flex !max-w-auto !w-auto !border-neutral-600 text-shades-black !text-[12px] !px-3"
              >
                Select{' '}
                {selectedItems && selectedItems?.length > 0 && (
                  <span className="flex items-center justify-center ml-[-6px] mt-[-1px] bg-accent-a-200 h-3 w-3 text-shades-white text-[8px] leading-[9.99px] tracking-[0.06em] rounded-full">
                    {selectedItems.length}
                  </span>
                )}
              </Button>
              {isSelectable &&
                actions?.map((item) => (
                  <Button
                    key={item.name}
                    variant="outlined"
                    size="sm"
                    onClick={item.action}
                    disabled={item.disabled}
                    className="!inline-flex !max-w-auto !w-auto !border-neutral-600 text-shades-black !text-[12px] !px-3"
                  >
                    {item.name}
                  </Button>
                ))}
            </div>
            <div>
              <IconButtonGroup
                value={gridType || 'grid'}
                handleChange={onGridChange && onGridChange}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Filters;
