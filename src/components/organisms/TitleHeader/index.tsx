import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { Icon } from '../../molecules/Icon';
import { fonts } from '@/config/fonts';
import { Icons } from '@/components/atoms/Icons';
import Logo from '@/assets/svgs/logo.svg';

export interface TitleHeaderProps {
  logo?: ReactNode;
  title: string;
  description?: string;
  icon?: Icons;
}

const TitleHeader: FC<TitleHeaderProps> = ({ title, description, icon }) => {
  return (
    <div className='flex flex-col items-center'>
      <Logo className="w-[128px] h-[50px]" />
      {icon && (
        <div className='mt-4'>
          <Icon name={icon} className="h-10 w-10 [&>svg]:h-[25px] [&>svg]:w-[34px] text-shades-black" />
        </div>
      )}
      <h3 className={clsx('mt-4 text-shades-black tracking-[0.06em]', fonts.headings.sm)}>
        {title}
      </h3>
      {
        description && (
          <p className={clsx('mt-2 text-shades-black tracking-[0.06em]', fonts.text.xl)}>
            {description}
          </p>
        )
      }
    </div>
  )
}

export default TitleHeader;
