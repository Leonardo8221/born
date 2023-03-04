import { FC } from 'react';
import clsx from 'clsx';
import { fonts } from '@/config/fonts';

interface ListProps {
  label: string;
  value: string;
  isSmall?: boolean;
}

const List: FC<ListProps> = ({
  label,
  value,
  isSmall,
}) => {
  return (
    <div className={isSmall ? 'mb-0' : "mb-3"}>
      <h4
        className={
          clsx(
            'text-neutral-800 tracking-[0.06em] font-light',
            fonts.text[isSmall ? 'sm' :'base']
          )
        }
      >
        {label}
      </h4>
      <p
        className={
          clsx(
            'text-neutral-600 tracking-[0.06em] font-light',
            fonts.text[isSmall ? 'xs' : 'sm'],
            !isSmall && 'mt-1'
          )
        }
      >
        {value}
      </p>
    </div>
  )
}

interface ListPricesProps {
  currency?: string;
  items?: {
    label: string;
    price: string;
  }[];
  isSmall?: boolean;
}

const ListPrices: FC<ListPricesProps> = ({
  currency,
  items,
  isSmall = false,
}) => {
  return (
    <div className={clsx('flex', isSmall ? 'gap-x-3' : 'gap-x-[25px]')}>
      {currency && (
        <List label={currency} value="currency" isSmall={isSmall} />
      )}
      {
        items?.map((item, index) => (
          <List key={index} label={item.price} value={item.label} isSmall={isSmall} />
        ))
      }
    </div>
  );
}

export default ListPrices;
