import { OrderGraphqlDto } from '@/generated/types';
import { Button } from '@/components/molecules/Button';
import { formatCurrency } from '@/utils/formatCurrency';
import { Paragraph } from '@/components/molecules/Paragraph';

interface HorizontalCardProps extends OrderGraphqlDto {
  onSelect: (id: number) => void;
  isActive: boolean;
}

export default function HorizontaOrderLists({
  name,
  id,
  billing_address,
  total_price,
  buyer_data,
  pricing_condition,
  isActive,
  onSelect,
}: HorizontalCardProps) {
  return (
    <div
      className={`${
        isActive ? 'border' : ''
      } rounded w-full flex items-center h-20 border border-[transparent] hover:border-shades-black p-4 gap-4`}
    >
      <div className="flex-1 flex justify-between items-center gap-4">
        <Paragraph size="lg" className="!text-shades-black">
          {name}
        </Paragraph>
        <Paragraph size="md" className="!text-shades-black">
          {buyer_data?.buyer_name}
        </Paragraph>
        <Paragraph size="md" className="!text-shades-black">
          {billing_address}
        </Paragraph>
        <Paragraph size="md" className="!text-shades-black">
          {formatCurrency(pricing_condition?.split('_')?.[0] as any)?.format(
            total_price
          )}
        </Paragraph>
      </div>
      <Button
        onClick={() => onSelect(id)}
        variant="outlined"
        label="Select"
        className="h-8 border-[#999999] text-[#333333] text-[12px] font-light"
      />
    </div>
  );
}
