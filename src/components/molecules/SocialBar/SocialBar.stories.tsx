import { StoryFn } from '@storybook/react';
import { SocialBar, SocialBarProps } from './SocialBar';
import FacebookIcon from '@/assets/svgs/social/icon-facebook.svg';
import InstagramIcon from '@/assets/svgs/social/icon-instagram.svg';
import TwitterIcon from '@/assets/svgs/social/icon-twitter.svg';

export default {
	title: 'Molecules/SocialBar',
	component: SocialBar,
};

const Template = (args: SocialBarProps) => <SocialBar {...args} />;

export const Primary: StoryFn<SocialBarProps> = Template.bind({});
Primary.args = {
	icons: [
		{ name: 'facebook', link: 'https://www.facebook.com', Icon: FacebookIcon },
		{
			name: 'instagram',
			link: 'https://www.instagram.com',
			Icon: InstagramIcon,
		},
		{ name: 'twitter', link: 'https://twitter.com', Icon: TwitterIcon },
	],
};
