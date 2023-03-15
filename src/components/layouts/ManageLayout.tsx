import { FC } from 'react';
import { icons } from '../atoms/Icons';
import Sidebar from '../molecules/Sidebar';
import TopBar from '../page-components/marketing/TopBar';
import Footer from './Footer';
import BrandLogo from '@/assets/svgs/brand-logo.svg';
import { useRouter } from 'next/router';

type MenuItem = {
  url: string;
  name: string;
  icon: keyof typeof icons;
};

interface ManageLayoutProps {
  children: any;
}

const ManageLayout: FC<ManageLayoutProps> = ({ children }) => {
  const router = useRouter();
  const organizationId = router?.query?.id;

  const menuItems: MenuItem[] = [
    {
      url: `/organization/${organizationId}/manage/profile`,
      name: 'Profile',
      icon: 'icon-user',
    },
    {
      url: `/organization/${organizationId}/manage/order`,
      name: 'Ordering',
      icon: 'icon-bag',
    },
    {
      url: `/organization/${organizationId}/manage/teams`,
      name: 'Teams',
      icon: 'icon-users',
    },
    {
      url: `/organization/${organizationId}/manage/settings`,
      name: 'Settings',
      icon: 'icon-settings',
    },
    {
      url: `#`,
      name: 'Switch Account',
      icon: 'icon-swap',
    },
  ];

  return (
    <div className="w-full">
      <div className='sticky z-[10] bg-shades-white w-full top-0'>
        <TopBar />
      </div>
      <div className='min-h-[calc(100vh-144px)]'>
        <div className="flex">
          <div className="w-[320px] min-h-full bg-neutral-100">
            <div className='fixed top-[72px] h-full h-[calc(100vh-125px)]'>
              <Sidebar title="Missoma" menuItems={menuItems} logo={<BrandLogo />} />
            </div>
          </div>
          <div className="px-8 py-6">{children}</div>
        </div>
      </div>
      <div className='relative z-[11]'>
        <Footer />
      </div>
    </div>
  );
};

export default ManageLayout;
