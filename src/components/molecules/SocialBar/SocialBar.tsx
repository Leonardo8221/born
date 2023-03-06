import React, { FC } from 'react';
import Image, { StaticImageData } from 'next/image';
import clsx from 'clsx';

interface Icon {
  Icon: any;
  link: string;
  name: string;
  src?: StaticImageData | string;
}

export interface SocialBarProps {
  icons: Icon[];
  className?: string;
}

interface StyledImageProps {
  alt: string;
  src?: StaticImageData | string;
  Icon?: any;
}

const StyledImage: FC<StyledImageProps> = ({ alt, src, Icon }) => {
  if (Icon) {
    return <Icon className="w-5 h-5 ml-3 mr-3" />
  }

  return (
    <Image className="w-5 h-5 ml-3 mr-3" alt={alt} src={src || ''} />
  );
};

export const SocialBar: FC<SocialBarProps> = ({ icons, className }) => {
  return (
    <div className={clsx("bg-shades-black flex w-44 px-4 m-auto h-[72px] items-center justify-center", className)}>
      {icons.map (icon => (
        <a key={icon.link} href={icon.link} target="_blank" rel="noreferrer">
          <StyledImage src={icon.src} alt={`Logo ${icon.name}`} Icon={icon.Icon} />
        </a>
      ))}
    </div>
  );
};
