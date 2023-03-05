import { FC } from 'react';
import { Badge } from '@/components/molecules/Badge';

interface BadgeProps {
  items: string[];
  countLimit?: number;
}

const Badges: FC<BadgeProps> = ({ items = [], countLimit = 1 }) => {
  const itemsToShow = [...items]?.splice(0, countLimit);
  const itemsCount = [...items]?.splice(countLimit)?.length;
  return (
    <div className='flex max-w-[190px] flex-wrap items-centrer gap-1'>
      {itemsToShow?.map(item => (
        <Badge key={item} size='xl'>
          {item}
        </Badge>
      ))}
      {itemsCount > 0 && (
        <Badge size='xl' className="text-shades-black border border-shades-black">
          + {itemsCount}
        </Badge>
      )}
    </div>
  )
}

export default Badges;
