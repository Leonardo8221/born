import FooterNav from "@/components/molecules/FooterNav/FooterNav";
import { SocialBar } from "../molecules/SocialBar/SocialBar";
import FacebookIcon from '@/assets/svgs/social/icon-facebook.svg';
import InstagramIcon from '@/assets/svgs/social/icon-instagram.svg';
import TwitterIcon from '@/assets/svgs/social/icon-twitter.svg';
import { Logo } from "../atoms/Logo";

const Footer = () => {
  const footerMenuItems = [
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
  ];

  const socialIcons = [
		{ name: 'facebook', link: 'https://www.facebook.com', Icon: FacebookIcon },
		{
			name: 'instagram',
			link: 'https://www.instagram.com',
			Icon: InstagramIcon,
		},
		{ name: 'twitter', link: 'https://twitter.com', Icon: TwitterIcon },
	]

  return (
    <div className="print:hidden bg-shades-black">
      <div className="w-full max-w-[1440px] flex mx-auto items-center justify-between">
        <div className="flex-1">
          <FooterNav nav={footerMenuItems} />
        </div>
        <div className="flex-1 text-center">
          <span className="text-neutral-600 text-[11px] leading-[14px] tracking-[0.16em] uppercase">
            Enhanced by
          </span>
          <Logo variant="neutral" className="mx-auto max-w-[96px]" />
        </div>
        <div className="flex-1">
          <SocialBar icons={socialIcons} className="ml-auto mr-0" />
        </div>
      </div>
    </div>
  )
}

export default Footer;
