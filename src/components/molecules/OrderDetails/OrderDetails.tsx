import { FC } from 'react';
import clsx from 'clsx';
import { theme } from '@/config/theme';
import Input from '../Inputs';
import { formatDate } from '@/utils';
import RetailersSearchDropdown from '@/components/page-components/order/RetailersSearchDropdown';
import BuyersSearchDropdown from '@/components/page-components/order/BuyersSearchDropdown';

type Column = {
  key: string;
  value: string;
  inputType?: string;
  name: string;
  options?: string[];
  retailer_id?: number;
};

export interface OrderDetailsProps {
  column1: Column[];
  column2: Column[];
  column3: Column[];
  editMode: boolean;
  handleEditInputs?: any;
  loading?: boolean;
}

const OrderDetails: FC<OrderDetailsProps> = ({
  column1,
  column2,
  column3,
  editMode,
  handleEditInputs,
  loading,
}) => {
  const format = (date: any) => {
    const dates: any = date?.split(' - ') || [];
    return `${dates[0] ? formatDate(dates[0]) : ''} - ${
      dates[1] ? formatDate(dates[1]) : ''
    }`;
  };

  return (
    <div
      className={clsx(
        'grid gap-4 grid-cols-3 font-light tracking-[.06em]',
        theme.fonts.text['md']
      )}
    >
      <div className="h-auto">
        {column1.map((item, index) => (
          <div key={index} className="flex">
            {editMode ? (
              <>
                {item.key === 'retailer_id' && (
                  <RetailersSearchDropdown
                    label={item.name}
                    value={item.value}
                    handleSelect={(e) => {
                      handleEditInputs(item.key, e);
                    }}
                  />
                )}

                {item.key === 'buyer_id' && (
                  <BuyersSearchDropdown
                    label={item.name}
                    value={item.value}
                    retailerId={item.retailer_id}
                    handleSelect={(e: number) => handleEditInputs(item.key, e)}
                  />
                )}

                {item.key !== 'buyer_id' && item.key !== 'retailer_id' && (
                  <Input
                    onChange={(event: any) => {
                      console.log(event.target.value, item.value);
                      handleEditInputs(item.key, event?.target?.value);
                    }
                    }
                    editMode={editMode}
                    label={item.name}
                    value={item.value}
                    className="mb-2"
                    disabled={loading}
                  />
                )}
              </>
            ) : (
              <>
                <div className="text-[12px] font-light leading-[16px] text-neutral-600 w-[116px] mx-2 my-2">
                  {item.name}
                </div>
                <div className="text-shades-black w-[188px] mx-2 my-2">
                  {item.value}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div>
        {column2.map((item, index) => (
          <div
            key={index}
            className={clsx(
              'flex',
              item.inputType === 'textarea' && 'h-[140px]'
            )}
          >
            {editMode ? (
              <Input
                editMode={editMode}
                inputType={item.inputType}
                label={item.name}
                value={item.value}
                disabled={loading}
                onChange={(event: any) =>
                  handleEditInputs(item.key, event.target.value)
                }
                className="mb-2"
              />
            ) : (
              <>
                <div className="text-[12px] font-light leading-[16px] text-neutral-600 w-[116px] mx-2 my-2">
                  {item.name}
                </div>
                <div className="text-shades-black w-[188px] mx-2 my-2">
                  {item.value}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div>
        {column3.map((item, index) => (
          <div key={index} className="flex">
            {editMode ? (
              <>
                <Input
                  editMode={editMode}
                  label={item.name}
                  value={item.value}
                  inputType={
                    item.inputType || (item.options ? 'dropdown' : 'text')
                  }
                  options={item.options}
                  handleSelect={(value: string) =>
                    item.options ? handleEditInputs(item.key, value) : {}
                  }
                  className="mb-2"
                  handleStartDate={(date) =>
                    handleEditInputs('delivery_window_start_date', date)
                  }
                  handleEndDate={(date) =>
                    handleEditInputs('delivery_window_end_date', date)
                  }
                  disabled={loading}
                  onChange={(event: any) =>
                    !item.options
                      ? handleEditInputs(item.key, event.target.value)
                      : {}
                  }
                />
              </>
            ) : (
              <>
                <div className="text-[12px] font-light leading-[16px] text-neutral-600 w-[116px] mx-2 my-2">
                  {item.name}
                </div>
                <div className="text-[12px] font-light leading-[16px] text-shades-black w-[188px] mx-2 my-2">
                  {item.inputType === 'datepicker'
                    ? format(item.value)
                    : item.value}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
