import React from 'react';
import {PropTypes} from 'prop-types';
const StyledImage = ({children, variant, alt, ...props}) => {
  return (
    <img className="w-5 h-5 ml-3 mr-3" alt={alt} {...props}>
      {children}
    </img>
  );
};

export const SocialBar = ({icons}) => {
  return (
    <div className="bg-shades-black flex w-44 px-4 m-auto h-[72px] items-center justify-center">
      {icons.map (icon => (
        <a href={icon.link} target="_blank" rel="noreferrer">
          <StyledImage src={icon.src} alt={`Logo ${icon.name}`} />
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
