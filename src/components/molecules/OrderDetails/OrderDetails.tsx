import { FC } from 'react';
import clsx from 'clsx';
import { theme } from '@/config/theme';
import Input from '../Inputs';

type Column = {
  key: string;
  value: string;
  inputType?: string;
  name: string;
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
  return (
    <div
      className={clsx(
        'grid gap-4 grid-cols-3 font-light tracking-[.06em]',
        theme.fonts.text['md']
      )}
    >
      <div>
        {column1.map((item, index) => (
          <div key={index} className="flex">
            {editMode ? (
              <Input
                onChange={(val) => console.log(val)}
                editMode={editMode}
                label={item.name}
                value={item.value}
                className="mb-2"
                disabled={loading}
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
        {column2.map((item, index) => (
          <div key={index} className={clsx("flex", item.inputType === 'textarea' && 'h-[140px]')}>
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
              <Input
                editMode={editMode}
                label={item.name}
                value={item.value}
                className="mb-2"
                disabled={loading}
              />
            ) : (
              <>
                <div className="text-[12px] font-light leading-[16px] text-neutral-600 w-[116px] mx-2 my-2">
                  {item.name}
                </div>
                <div className="text-[12px] font-light leading-[16px] text-shades-black w-[188px] mx-2 my-2">
                  {item.value}
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
