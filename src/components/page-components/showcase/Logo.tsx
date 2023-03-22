import { FC, useState } from 'react';
import Image from 'next/image';
import LogoImage from '@/assets/images/logo-image.png';
import { Heading } from '@/components/molecules/Heading';

interface ShowcaseLogoProps {
  logoUrl?: string;
  name: string;
}

const ShowcaseLogo: FC<ShowcaseLogoProps> = ({ logoUrl, name }) => {
  return (
    <div className="mt-8 text-center">
      <div className="relative mx-auto h-[88px] w-[88px] rounded-full p-[7.33px] border border-neutral-200">
        <img
          src={logoUrl || LogoImage.src}
          alt="Bornwave logo"
          className="object-cover !h-[73.33px] !w-[73.33px] !m-auto rounded-full"
        />
      </div>
      <Heading
        size="md"
        as="h2"
        className="mt-4 mb-4 text-shades-black tracking-[0.06em]"
      >
        {name}
      </Heading>
    </div>
  );
};

export default ShowcaseLogo;
