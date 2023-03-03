import React from 'react';
import { PropTypes } from 'prop-types';
import Image from 'next/image';

const StyledImage = ({ alt, src, Icon }) => {
  if (Icon) {
    return <Icon className="w-5 h-5 ml-3 mr-3" />
  }

  return (
    <img className="w-5 h-5 ml-3 mr-3" alt={alt} src={src} />
  );
};

export const SocialBar = ({ icons }) => {
  return (
    <div className="bg-shades-black flex w-44 px-4 m-auto h-[72px] items-center justify-center">
      {icons.map (icon => (
        <a href={icon.link} target="_blank" rel="noreferrer">
          <StyledImage src={icon.src} alt={`Logo ${icon.name}`} Icon={icon.Icon} />
        </a>
      ))}
    </div>
  );
};

SocialBar.propTypes = {
  icons: PropTypes.arrayOf (
    PropTypes.shape ({
      name: PropTypes.string,
      link: PropTypes.string,
      src: PropTypes.string,
    })
  ).isRequired,
};
SocialBar.defaultProps = {
  icons: {
    name: 'facebook',
    link: 'https://www.facebook.com',
    src: '../../../assets/svgs/social/icon-facebook.svg',
  },
};
