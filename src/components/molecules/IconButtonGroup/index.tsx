import { FC, useEffect, useState } from "react";
import { IconButton } from "../IconButton";
import { Icon } from "../Icon";

export type GridType = 'list' | 'grid' | 'smallGrid';

export interface IconButtonGroupProps {
  value: GridType;
  handleChange?: (value: GridType) => void;
}

export const IconButtonGroup: FC<IconButtonGroupProps> = ({
  value = "list",
  handleChange,
}) => {
  const [view, setView] = useState<GridType>(value);

  useEffect(() => {
    setView(value);
  }, [value]);

  const handleViewChange = (newView: GridType) => {
    handleChange && handleChange(newView);
    setView(newView);
  };

  return (
    <div className="flex gap-2">
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
      <IconButton
        onClick={() => handleViewChange("list")}
        color={view === "list" ? "black" : "white"}
        icon={<Icon name="icon-burger" />}
      />
    </div>
  );
};
