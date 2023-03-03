import clsx from "clsx";
import { theme } from "../../../config/theme";

export const Paragraph = ({
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
