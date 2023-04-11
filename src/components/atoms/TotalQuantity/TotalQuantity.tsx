import { FC } from 'react';

export interface TotalQuantityProps {
  title: string;
  value: number | string;
}

export const TotalQuantity: FC<TotalQuantityProps> = ({ title, value }) => (
<div className="max-w-[200px] min-w-[105px] mx-6">
    <div className="text-[32px] font-normal	text-shades-black leading-[48px] tracking-[0.06em]">
      {value}
    </div>
    <div className="text-[14px] font-light text-neutral-600 leading-6 tracking-[0.06em]">
      {title}
    </div>
  </div>
);
