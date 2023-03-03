import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { IconButton } from "../IconButton";
import { Icon } from "../Icon";

export const IconButtonGroup = ({
  value = "list",
  handleChange = () => {},
}) => {
  const [view, setView] = useState(value);

  useEffect(() => {
    setView(value);
  }, [value]);

  const handleViewChange = (newView) => {
    handleChange(newView);
    setView(newView);
  };

  return (
    <div className="flex gap-[20px]">
      <IconButton
        onClick={() => handleViewChange("list")}
        color={view === "list" ? "black" : "white"}
        icon={<Icon name="icon-burger" />}
      />
      <IconButton
        onClick={() => handleViewChange("grid")}
        color={view === "grid" ? "black" : "white"}
        icon={<Icon name="icon-grid" />}
      />
      <IconButton
        onClick={() => handleViewChange("smallGrid")}
        color={view === "smallGrid" ? "black" : "white"}
        icon={<Icon name="icon-grid-small" />}
      />
    </div>
  );
};

IconButtonGroup.propTypes = {
  value: PropTypes.oneOf(["list", "grid", "smallGrid"]),
  handleChange: PropTypes.func,
};
