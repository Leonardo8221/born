import { StoryFn } from '@storybook/react';
import Sidebar, { SidebarProps } from '..';
import BrandLogo from '@/assets/svgs/brand-logo.svg';
import productImage from '@/assets/images/products/product.png';

export default {
  title: 'Molecules/Sidebar',
  component: Sidebar,
};

const Template = (args: SidebarProps) => <Sidebar {...args} />;

export const Variant1: StoryFn<SidebarProps> = Template.bind({});
Variant1.args = {
  variant: 1,
  title: 'Missoma',
  logo: <BrandLogo />,
  currentIndexItem: 0,
  onChangeCurrentIndexItem: (index) => {},
  menuItems: [
    {
      name: 'Profile',
      icon: 'icon-user',
    },
    {
      name: 'Ordering',
      icon: 'icon-bag',
    },
    {
      name: 'Teams',
      icon: 'icon-users',
    },
    {
      name: 'Settings',
      icon: 'icon-settings',
    },
    {
      name: 'Switch Account',
      icon: 'icon-swap',
    },
  ],
};

export const Variant2: StoryFn<SidebarProps> = Template.bind({});
Variant2.args = {
  variant: 2,
  title: 'UMI',
  subTitle: 'VESD1567',
  logoUrl: productImage,
};
