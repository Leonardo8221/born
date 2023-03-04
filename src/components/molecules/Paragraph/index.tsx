import { FC, HTMLAttributes } from "react";
import clsx from "clsx";
import { theme } from "@/config/theme";

interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  size?: keyof typeof theme.fonts.text;
  color?: string;
  fontWeight?: keyof typeof theme.fonts.fontWeights;
  uppercase?: boolean;
}

export const Paragraph: FC<ParagraphProps> = ({
  size,
  color = "",
  fontWeight,
  uppercase = false,
  className = '',
  children,
  ...props
}) => {
  return (
    <p
      className={clsx(
        "m-0 tracking-[.06em]",
        color,
        theme.fonts.fontWeights[fontWeight || "regular"],
        theme.fonts.text[size || "base"],
        uppercase ? "uppercase" : "",
        className,
      )}
      {...props}
    >
      {children}
    </p>
  );
};
