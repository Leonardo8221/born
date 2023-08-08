import { ChangeEvent, FC } from 'react';
import { Button } from '@/components/molecules/Button';
import {
  GridType,
  IconButtonGroup,
} from '@/components/molecules/IconButtonGroup';
import { SearchInput } from '@/components/molecules/SearchInput';
import DropdownFilter from '@/components/molecules/DropdownFilter';
import { apiConfig } from '@/utils/apiConfig';
import { OrderReportResourceApi } from 'client/command';
import { useRouter } from 'next/router';
import { download } from '@/utils/downloadFile';
import clsx from 'clsx';

export type Action = {
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
  className?: string;
  selectBtnText?: string;
  hideSelectBtn?: boolean;
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
  className,
  selectBtnText,
  hideSelectBtn,
}) => {
  const router = useRouter();
  const handleExportOrders = async () => {
    try {
      const organizationId: number = Number(router?.query?.id);
      const status: any = router?.query?.tab;
      const config = await apiConfig();
      const api = new OrderReportResourceApi(config);
      let file: BlobPart;
      const response = await api.apiOrderDownloadOrderTableReportAsExcelGet(
        organizationId,
        undefined,
        undefined,
        undefined,
        undefined,
        selectedItems?.length ? selectedItems as any : undefined,
        status,
        undefined,
        undefined,
        undefined,
        { responseType: 'blob' }
      );
      file = response?.data as any;
      download(
        response.data as any,
        response?.headers?.['content-disposition']
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-[32px]">
      <div
        className={clsx(
          'w-full max-w-[1120px] mx-auto print:hidden py-4 flex items-center justify-between bg-shades-white z-[2]',
          className
        )}
        id="filters"
      >
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
            inputClasses="!pr-6 !pl-7"
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
        <>
          <div className="flex items-center">
            <div
              className={clsx(
                'flex items-center border-neutral-400',
                !isOrder ? 'pr-4 mr-4 border-r gap-2' : 'gap-4'
              )}
            >
              {isOrder && !!selectedItems?.length && (
                <Button
                  variant="outlined"
                  size="sm"
                  className="!inline-flex !max-w-auto !w-auto !border-neutral-600 text-shades-black !text-[12px] !px-3 !bg-neutral-300 hover:!bg-neutral-300 hover:!text-shades-black !rounded-[100px] !cursor-auto"
                >
                  {'Selected'}{' '}
                  {isSelectable && selectedItems && selectedItems?.length > 0 && (
                    <span className="flex items-center justify-center ml-[-6px] mt-[-1px] bg-accent-a-200 h-3 w-3 text-shades-white text-[8px] leading-[9.99px] tracking-[0.06em] rounded-full">
                      {selectedItems.length}
                    </span>
                  )}
                </Button>
              )}
              {!hideSelectBtn && (
                <Button
                  variant="outlined"
                  size="sm"
                  onClick={onSelect && onSelect}
                  className="!inline-flex !max-w-auto !w-auto !border-neutral-600 text-shades-black !text-[12px] !px-3"
                >
                  {selectBtnText || 'Select'}{' '}
                  {!isOrder && isSelectable && selectedItems && selectedItems?.length > 0 && (
                    <span className="flex items-center justify-center ml-[-6px] mt-[-1px] bg-accent-a-200 h-3 w-3 text-shades-white text-[8px] leading-[9.99px] tracking-[0.06em] rounded-full">
                      {selectedItems.length}
                    </span>
                  )}
                </Button>
              )}
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

              {isOrder && (
                <div>
                  <Button
                    variant="outlined"
                    size="sm"
                    className="!inline-flex !max-w-auto !w-auto !border-neutral-600 text-shades-black !text-[12px] !px-3"
                    onClick={handleExportOrders}
                  >
                    Export {selectedItems?.length ? 'Selection' : ''}
                  </Button>
                </div>
              )}
            </div>
            {!isOrder && (
              <div>
                <IconButtonGroup
                  value={gridType || 'grid'}
                  handleChange={onGridChange && onGridChange}
                />
              </div>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default Filters;
