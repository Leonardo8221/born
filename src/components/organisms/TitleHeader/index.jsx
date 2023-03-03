import React from 'react';
import { PropTypes } from 'prop-types';
import clsx from 'clsx';
import { Icon } from '../../molecules/Icon';
import { ReactComponent as Logo } from '../../../assets/svgs/logo.svg';
import { fonts } from '../../../config/fonts';

const TitleHeader = ({ title, description, icon }) => {
  return (
    <div className='flex flex-col items-center'>
      <Logo />
      {icon && (
        <div className='mt-4'>
          <Icon name={icon} className="h-10 w-10 [&>svg]:h-[25px] [&>svg]:w-[34px] text-shades-black" />
        </div>
      )}
      <h3 className={clsx('mt-4 text-shades-black tracking-[0.06em]', fonts.headings.sm)}>
        {title}
      </h3>
      {
        description && (
          <p className={clsx('mt-2 text-shades-black tracking-[0.06em]', fonts.text.xl)}>
            {description}
          </p>
        )
      }
    </div>
  )
}

TitleHeader.propTypes = {
  logo: PropTypes.element,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  icon: PropTypes.string,
}

export default TitleHeader;
