import { FC, useState } from 'react';
import LogoImage from '@/assets/images/placeholders/user.png';
import { Heading } from '@/components/molecules/Heading';
import { theme } from '@/config/theme';

interface ShowcaseLogoProps {
  logoUrl?: string;
  name: string;
  headingSize?: keyof typeof theme.fonts.headings;
}

const ShowcaseLogo: FC<ShowcaseLogoProps> = ({ logoUrl, name, headingSize }) => {
  return (
    <div className="mt-8 text-center">
      <div className="relative flex items-center justify-center mx-auto h-[88px] w-[88px] rounded-full p-[7.33px] border border-neutral-200">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt="Bornwave logo"
            className={
              'object-cover !h-[73.33px] !w-[73.33px] !m-auto rounded-full'
            }
          />
        ) : (
          <img
            src={LogoImage.src}
            alt="Logo"
            className="h-10 w-10 rounded-fullm-auto"
          />
        )}
      </div>
      <Heading
        size={headingSize || "md"}
        as="h2"
        className="mt-4 mb-4 text-shades-black tracking-[0.06em]"
      >
        {name}
      </Heading>
    </div>
  );
};

export default ShowcaseLogo;
