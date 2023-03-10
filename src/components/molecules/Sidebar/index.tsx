import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';
import { fonts } from '@/config/fonts';
import { icons } from '@/components/atoms/Icons';
import LivePreivewToggle from '../LivePreviewToggle';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { variantClasses, variantLogoStyles } from './utils';

type Menu = {
  name: string;
  icon: keyof typeof icons;
  value: number | string;
};

export interface TabMenu {
  currentTab: number | string;
  onTabChange: (item: number | string) => void;
}

export interface SidebarProps extends TabMenu {
  variant?: keyof typeof variantClasses;
  logoUrl?: StaticImageData | string;
  logo?: ReactNode;
  title: string;
  subTitle?: string;
  menuItems: Menu[];
  onSignOut?: () => void;
}

const Sidebar: FC<SidebarProps> = ({
  variant = 1,
  logoUrl,
  logo,
  title,
  subTitle,
  menuItems,
  currentTab,
  onTabChange,
  onSignOut
}) => {
  const {
    height: heightLogo,
    width: widthLogo,
    className: classNameLogo,
  } = variantLogoStyles[variant];

  return (
    <div
      className={clsx(
        `relative left-0 top-0 min-h-screen bg-neutral-100 overflow-y-auto p-8`,
        variantClasses[variant]
      )}
    >
      <div className="flex flex-col min-h-[90vh]">
        <div className="flex w-full flex-col items-center flex-1">
          <div className="[&>svg]:h-[80px] [&>svg]:w-[80px] [&>svg]:rounded-full">
            {logo
              ? logo
              : logoUrl && (
                  <div
                    className={`w-[${widthLogo}px] h-[${heightLogo}px] rounded-full border-2 border-neutral-200 flex justify-center items-center`}
                  >
                    <Image
                      src={logoUrl}
                      alt={`${title} logo`}
                      width={heightLogo - 12}
                      height={widthLogo - 12}
                      className={classNameLogo}
                    />
                  </div>
                )}
          </div>
          <h3 className={clsx(fonts.text.xl, 'text-shades-black mt-2')}>
            {title}
          </h3>
          {subTitle && (
            <h4
              className={clsx(
                'text-shades-black font-light mt-1',
                fonts.text.base
              )}
            >
              {subTitle}
            </h4>
          )}
          <div className="mt-3">
            <LivePreivewToggle />
          </div>
          <ul className="flex w-full max-w-[192px] flex-col mt-10 gap-y-[24px]">
            {menuItems?.map((item, index) => {
              const isActive = currentTab === item.value;
              return (
                <li
                  onClick={() => onTabChange(item.value)}
                  className={clsx(
                    'group cursor-pointer flex h-10 items-center !font-light text-neutral-700 rounded px-4 gap-x-3 hover:bg-shades-black hover:text-shades-white',
                    fonts.text.lg,
                    isActive && 'bg-shades-black text-shades-white'
                  )}
                  key={`${index} item sidebar`}
                >
                  <Icon
                    name={item.icon}
                    className={clsx(
                      'flex group-hover:text-shades-white',
                      isActive ? 'text-shades-white' : 'text-shades-black'
                    )}
                  />
                  {item.name}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="w-full">
          {variant === 1 && (
            <Button onClick={onSignOut} className="!w-full !max-w-[192px] !font-light !bg-neutral-100 !text-neutral-700 !border-none !justify-start !px-4 mt-10  hover:!bg-shades-black hover:!text-shades-white">
              <Icon name="icon-arrow-left-circle" /> Sign out
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
