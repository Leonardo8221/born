import React from 'react';
import clsx from 'clsx';
import { Icon } from '../Icon';
import { fonts } from '../../../config/fonts';

const Header = ({
  title,
  onClose,
}) => (
  <div className="flex justify-between px-9 py-4 border-b border-b-neutral-400">
    <h3 className={clsx(fonts.text['2xl'], 'text-shades-black tracking-[0.06em]')}>{title}</h3>
    <Icon name="icon-close" onClick={onClose} className="flex h-10 w-10 cursor-pointer items-center justify-center text-shades-black" />
  </div>
)

export default Header;
