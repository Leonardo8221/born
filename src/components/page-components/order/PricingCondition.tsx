import { TotalQuantity } from '@/components/atoms/TotalQuantity/TotalQuantity';
import Dropdown from '@/components/molecules/Dropdown';
import Input from '@/components/molecules/Inputs/Input';
import { OrderGraphqlDto } from '@/generated/types';
import { PRICING_CONDITIONS_QUERY } from '@/queries/orders/details';
import { formatCurrency } from '@/utils/formatCurrency';
import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { FC } from 'react';

interface PricingConditionProps {
  details: OrderGraphqlDto;
  handleChange: (name: string, value: any) => void;
  handleDropdownChange: (option: any) => void;
  disabled?: boolean;
}

const PricingCondition: FC<PricingConditionProps> = ({
  details,
  handleChange,
  handleDropdownChange,
  disabled,
}) => {
  const { data } = useQuery(PRICING_CONDITIONS_QUERY, {
    variables: { orderId: details?.id },
  });
  const dropdownmenu =
    data?.pricingConditionsByOrderId?.map((item: any) => ({
      name: `${item?.currency} - ${item?.label}`,
      value: `${item?.currency}_${item?.label}`,
    })) || [];

  const selectedOption = dropdownmenu.filter(
    (item: any) =>
      item?.value?.toLowerCase() === details?.pricing_condition?.toLowerCase()
  )?.[0];

  const isDisabled = details?.order_status && !['DRAFT'].includes(details?.order_status);

  return (
    <div className="flex items-center justify-between px-9 py-10 mb-6 shadow-md rounded-md items-center">
      <div className="flex items-center">
        <div>
          <Dropdown
            options={dropdownmenu}
            isValid={false}
            label="Select Category"
            onChange={(option) => handleDropdownChange(option?.value)}
            className={clsx(
              'mr-8 w-[278px]',
              isDisabled &&
                '!pointer-events-none'
            )}
            selectedOption={selectedOption}
          />
        </div>
        <Input
          value={details?.discount}
          label="Discount (%)"
          min={0}
          type="number"
          name="discount"
          isError={false}
          isValid={false}
          onChange={(val) => handleChange('discount', val)}
          className={clsx("mr-8 w-[139px] h-[56px]", isDisabled ? '!cursor-auto' : '')}
          disabled={isDisabled || disabled}
        />
        <Input
          value={details?.surcharge}
          label="Surcharge (%)"
          type="number"
          name="surcharge"
          min={0}
          isError={false}
          isValid={false}
          onChange={(val) => handleChange('surcharge', val)}
          className={clsx("mr-8 w-[139px] h-[56px]", isDisabled ? '!cursor-auto' : '')}
          disabled={isDisabled || disabled}
        />
      </div>
      <div className="flex items-center center">
        <TotalQuantity
          title="Total Quantity"
          value={details?.total_quantity || 0}
        />
        <TotalQuantity
          title="Total price"
          value={formatCurrency(
            details?.pricing_condition?.split('_')?.[0] as any
          )?.format(details?.total_price)}
        />
      </div>
    </div>
  );
};

export default PricingCondition;
