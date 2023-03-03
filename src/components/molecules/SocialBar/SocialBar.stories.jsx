import React from 'react';
import { SocialBar } from './SocialBar';
import FacebookIcon from '../../../assets/svgs/social/icon-facebook.svg';
import InstagramIcon from '../../../assets/svgs/social/icon-instagram.svg';
import TwitterIcon from '../../../assets/svgs/social/icon-twitter.svg';
export default {
	title: 'Molecules/SocialBar',
	component: SocialBar,
};

const Template = (args) => <SocialBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
	icons: [
		{ name: 'facebook', link: 'https://www.facebook.com', src: FacebookIcon },
		{
			name: 'instagram',
			link: 'https://www.instagram.com',
			src: InstagramIcon,
		},
		{ name: 'twitter', link: 'https://twitter.com', src: TwitterIcon },
	],
};
