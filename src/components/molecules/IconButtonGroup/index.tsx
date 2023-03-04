import { FC, useEffect, useState } from "react";
import { IconButton } from "../IconButton";
import { Icon } from "../Icon";

type Value = 'list' | 'grid' | 'smallGrid';

export interface IconButtonGroupProps {
  value: Value;
  handleChange?: (value: string) => void;
}

export const IconButtonGroup: FC<IconButtonGroupProps> = ({
  value = "list",
  handleChange,
}) => {
  const [view, setView] = useState<Value>(value);

  useEffect(() => {
    setView(value);
  }, [value]);

  const handleViewChange = (newView: Value) => {
    handleChange && handleChange(newView);
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
