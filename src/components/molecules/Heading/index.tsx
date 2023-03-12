import { FC, ReactNode } from "react";
import clsx from "clsx";
import { theme } from "@/config/theme";

interface HeadingProps {
  color?: string;
  fontWeight?: "regular" | "light";
  size?: keyof typeof theme.fonts.headings;
  className?: string;
  children: ReactNode;
  as?: string;
}

export const Heading: FC<HeadingProps> = ({
  color = "",
  fontWeight = "regular",
  size = "base",
  className = "",
  children,
  ...props
}) => {
  return (
    <h1
      className={clsx(
        "m-0 tracking-[.06em] block",
        color,
        theme.fonts.fontWeights[fontWeight],
        theme.fonts.headings[size],
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
};
