import clsx from "clsx";
import { FC } from "react";
import { icons } from "../../atoms/Icons";

export interface IconProps extends JSX.IntrinsicAttributes {
  name: keyof typeof icons;
  className?: string;
  height?: number;
  width?: number;
  onClick?: (e: any) => void;
}

export const Icon: FC<IconProps> = ({
  name,
  className,
  height,
  width,
  ...props
}) => {
  const IconComponent = icons?.[name];

  if (!IconComponent) {
    console.warn("Icon not found!");
    return null;
  }

  return (
    <IconComponent
      className={clsx(className)}
      height={height || 24}
      width={width || 24}
      {...props}
    />
  );
};
