import { FC } from "react";
import clsx from "clsx";
import { badgeSizeStyles } from './utils';

export interface BadgeProps {
  size?: 'sm' | 'lg' | 'xl';
  children?: any;
  className?: string;
  onClick?: (event: any) => void;
  title?: string;
}

export const Badge: FC<BadgeProps> = ({ size, children, className, ...props }) => (
  <div
    className={clsx(
      "inline-flex text-[#333333] bg-[#F0F0F0] items-center box-border rounded-[100px] py-1 text-center",
      badgeSizeStyles[size || "lg"],
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
