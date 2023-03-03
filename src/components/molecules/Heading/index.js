import clsx from "clsx";
import { theme } from "../../../config/theme";

export const Heading = ({
  color = "",
  fontWeight = 'regular',
  size = 'base',
  children,
  ...props
}) => {
  return (
    <h1
      className={clsx(
        "m-0 tracking-[.06em] block",
        color,
        theme.fonts.fontWeights[fontWeight],
        theme.fonts.headings[size]
      )}
      {...props}
    >
      {children}
    </h1>
  );
};
