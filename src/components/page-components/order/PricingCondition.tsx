import { TotalQuantity } from '@/components/atoms/TotalQuantity/TotalQuantity';
import Dropdown from '@/components/molecules/Dropdown';
import Input from '@/components/molecules/Inputs/Input';
import { OrderGraphqlDto } from '@/generated/types';
import { formatCurrency } from '@/utils/formatCurrency';
import { FC } from 'react';

interface PricingConditionProps {
  details: OrderGraphqlDto;
  handleChange: (name: string, value: any) => void;
  handleDropdownChange: (option: any) => void;
}

const PricingCondition: FC<PricingConditionProps> = ({
  details,
  handleChange,
  handleDropdownChange,
}) => {
  const dropdownmenu = [
    {
      value: 'USD_LANDED',
      name: 'USD - Landed',
    },
    {
      value: 'USD_EXWORKS',
      name: 'USD - ExWork',
    },
    {
      value: 'GBP_LANDED',
      name: 'GBP - Landed',
    },
    {
      value: 'GBP_EXWORKS',
      name: 'GBP - ExWork',
    },
    {
      value: 'EUR_LANDED',
      name: 'EUR - Landed',
    },
    {
      value: 'EUR_EXWORKS',
      name: 'EUR - ExWork',
    },
  ];

  const selectedOption = dropdownmenu.filter(
    (item) =>
      item?.value?.toLocaleLowerCase() ===
      details?.pricing_condition?.toLowerCase()
  )?.[0];

  return (
    <div className="flex px-9 py-10 mb-6 shadow-md rounded-md items-center">
      <div>
        <Dropdown
          options={dropdownmenu}
          isValid={false}
          label="Select Category"
          onChange={(option) => handleDropdownChange(option?.value)}
          className="mr-8 w-[278px]"
          selectedOption={selectedOption}
        />
      </div>
      <Input
        value={details?.discount}
        label="Discount (%)"
        type="number"
        name="discount"
        isError={false}
        isValid={false}
        onChange={(val) => handleChange('discount', val)}
        className="mr-8 w-[139px] h-[56px]"
      />
      <Input
        value={details?.surcharge}
        label="Surcharge (%)"
        type="number"
        name="surcharge"
        isError={false}
        isValid={false}
        onChange={(val) => handleChange('surcharge', val)}
        className="mr-8 w-[139px] h-[56px]"
      />
      <TotalQuantity
        title="Total Quantity"
        value={details?.total_quantity || ''}
      />
      <TotalQuantity
        title="Total price"
        value={formatCurrency(details?.pricing_condition?.split('_')?.[0] as any)?.format(
          details?.total_price
        )}
      />
    </div>
  );
};

export default PricingCondition;
