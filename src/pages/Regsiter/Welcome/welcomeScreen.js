import clsx from "clsx";
import styles from "./welcomeScreen.module.css";
import { theme } from "../../../../config/theme";

export const StyledWelcomeScreen = ({ children, ...props }) => {
  return (
    <div className={styles.welcomeScreen} {...props}>
      {children}
    </div>
  );
};

export const StyledLink = ({
  children,
  color = "",
  fontWeight,
  size,
  ...props
}) => {
  return (
    <a
      className={clsx(
        "tracking-wider",
        color,
        theme.fonts.fontWeights[fontWeight || "regular"],
        theme.fonts.text[size || "base"]
      )}
      {...props}
    >
      {children}
    </a>
  );
};
