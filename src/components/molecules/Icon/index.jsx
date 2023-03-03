import { icons } from "../../atoms/Icons";
import { PropTypes } from "prop-types";
import { StyledIcon } from "./icon";

export const Icon = ({ name, ...props }) => {
  const renderIcon = () => {
    const IconComponent = icons?.[name];

    console.log(IconComponent)

    if (!IconComponent) {
      console.warn("Icon not found!");
      return;
    }

    return <IconComponent />;
  };

  return <StyledIcon {...props}>{renderIcon()}</StyledIcon>;
};

Icon.propType = {
  name: PropTypes.string,
};