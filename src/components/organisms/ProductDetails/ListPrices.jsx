import React from 'react';
import clsx from 'clsx';
import { fonts } from '../../../config/fonts';

const List = ({
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

const ListPrices = ({
  currency,
  items,
  isSmall,
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
