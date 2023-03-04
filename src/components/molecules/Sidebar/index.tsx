import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';
import { fonts } from '@/config/fonts';
import { icons } from '@/components/atoms/Icons';
import LivePreivewToggle from '../LivePreviewToggle';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { variantClasses, variantLogoClasses } from "./utils";

type Menu = {
  url: string;
  name: string;
  icon: keyof typeof icons;
}

export interface SidebarProps {
  variant: keyof typeof variantClasses;
  logoUrl?: StaticImageData | string;
  logo?: ReactNode,
  title: string;
  subTitle?: string;
  menuItems: Menu[];
}

const Sidebar: FC<SidebarProps> = ({
  variant = 1,
  logoUrl,
  logo,
  title,
  subTitle,
  menuItems
}) => {
  return (
    <div
      className={
        clsx(
          `relative left-0 top-0 min-h-screen bg-neutral-100 overflow-y-auto p-8`,
          variantClasses[variant]
        )
      }
    >
      <div className='flex flex-col min-h-[90vh]'>
        <div className='flex w-full flex-col items-center flex-1'>
          <div className='[&>svg]:h-[80px] [&>svg]:w-[80px] [&>svg]:rounded-full'>
            {logo ? logo : (
              logoUrl && (
                <Image src={logoUrl} alt={`${title} logo`} className={clsx(variantLogoClasses[variant])} />
              )
            )}
          </div>
          <h3 className={clsx(fonts.text.xl, 'text-shades-black mt-2')}>{title}</h3>
          {subTitle && (
            <h4 className={clsx('text-shades-black font-light mt-1', fonts.text.base)}>{subTitle}</h4>
          )}
          <div className='mt-3'>
            <LivePreivewToggle />
          </div>
          <ul className='flex w-full max-w-[192px] flex-col mt-10 gap-y-[24px]'>
            {menuItems?.map(item => (
              <li key={item.url}>
                <a
                  href={item.url + item.name}
                  key={item.url}
                  className={clsx(
                    "group flex h-10 items-center !font-light text-neutral-700 rounded px-4 gap-x-3 hover:bg-shades-black hover:text-shades-white",
                    fonts.text.lg,
                    item.name === 'Profile' && 'bg-shades-black text-shades-white',
                  )}
                >
                  <Icon
                    name={item.icon}
                    className={clsx(
                      "flex group-hover:text-shades-white",
                      item.name === 'Profile' ? 'text-shades-white' : 'text-shades-black'
                    )}
                  />
                  {item.name}
                </a>
              </li>
            ))}

          </ul>
        </div>
        <div className='w-full'>
          {variant === 1 && (
            <Button
              className="!w-full !max-w-[192px] !font-light !bg-neutral-100 !text-neutral-700 !border-none !justify-start !px-4 mt-10  hover:!bg-shades-black hover:!text-shades-white"
            >
              <Icon name="icon-arrow-left-circle" /> Sign out
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
