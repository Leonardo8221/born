import React from 'react';
import PropTypes from 'prop-types';
import { StyledBadge } from './badgeStyles';

export const Badge = ({ children, ...props }) => (
  <StyledBadge {...props}>
    {children}
  </StyledBadge>
);

Badge.propTypes = {
  size: PropTypes.oneOf(['xl', 'lg', 'sm']),
};

Badge.defaultProps = {
  size: 'lg',
  children: 'Core',
};
