import React from "react";
import PropTypes from "prop-types";
import { StyledButton } from "./button";

/**
 * Primary UI component for user interaction
 */
export const Button = ({ children, ...props }) => {
  return (
    <StyledButton as={props.href ? "a" : "button"} type="button" {...props}>
      {children}
    </StyledButton>
  );
};

Button.propTypes = {
  href: PropTypes.string,
  variant: PropTypes.oneOf(["outlined", "link"]),
  color: PropTypes.oneOf(["white", "black", "accent", "neutral"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  rounded: PropTypes.bool,
  label: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  href: null,
  color: "black",
  size: "md",
  onClick: undefined,
};
