import React from 'react';
import FooterNav from './FooterNav';

export default {
  title: 'Molecules/FooterNav',
  component: FooterNav,
};

const Template = args => <FooterNav {...args} />;

export const Primary = Template.bind ({});
Primary.args = {
  nav: ['CONTACT SUPPORT', 'TERMS & CONDITIONS', 'PRIVACY POLICY'],
};
