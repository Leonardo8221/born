import { OrderGraphqlDto } from '@/generated/types';
import { Button } from '@/components/molecules/Button';

interface HorizontalCardProps extends OrderGraphqlDto {
  onSelect: (id: number) => void;
  isActive: boolean;
}

export default function HorizontaOrderLists({
  name,
  id,
  billing_address,
  total,
  buyer_name,
  isActive,
  onSelect,
}: HorizontalCardProps) {
  return (
    <div
      className={`${
        isActive ? 'border' : ''
      } rounded w-full flex items-center h-20 p-4 mb-2`}
    >
      <div className="flex-1 flex justify-between items-center">
        <h5>{name}</h5>
        <p>{buyer_name}</p>
        <p>{billing_address}</p>
        <p>{total}</p>
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
