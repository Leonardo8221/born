import { StoryFn } from '@storybook/react';
import FooterNav, { FooterNavProps } from './FooterNav';

export default {
  title: 'Molecules/FooterNav',
  component: FooterNav,
};

const Template = (args: FooterNavProps) => <FooterNav {...args} />;

export const Primary: StoryFn<FooterNavProps> = Template.bind ({});
Primary.args = {
  nav: [
    {
      name: 'CONTACT SUPPORT',
      url: '/support',
    },
    {
      name: 'TERMS & CONDITIONS',
      url: '/terms-condition',
    },
    {
      name: 'PRIVACY POLICY',
      url: '/policy',
    }
  ],
};
