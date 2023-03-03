import PropTypes from "prop-types";
import clsx from "clsx";
import { Logo } from "../../atoms/Logo";
import { fonts } from "../../../config/fonts";

const NavItem = ({ label, href, variant, ...props }) => {
  return (
    <a className={variations[variant].clsNavItem} href={href} {...props}>
      {label}
    </a>
  );
};

const variations = {
  header1: {
    clsNav:
      "mx-auto max-w-[1440px] w-full h-[72px] bg-shades-white flex items-center justify-between",
    clsNavItem: clsx(
      "pl-4 last:pr-4",
      fonts.fontWeights.light,
      fonts.text.lg,
      "text-shades-black"
    ),
    clsSocialItemsWrapper: clsx("flex items-center h-full px-8"),
  },
};

export const Header = ({
  items = [],
  children,
  variant = "header1",
  rightNavNode,
  ...props
}) => {
  return (
    <>
      <nav className={variations[variant].clsNav}>
        <div className="flex h-full items-center">
          <div className="px-8">
            <Logo variant="dark" />
          </div>
          {items.map((item, index) => (
            <NavItem key={index} variant={variant} {...item} />
          ))}
        </div>
        {!!rightNavNode && (
          <div className={variations[variant].clsSocialItemsWrapper}>
            {rightNavNode}
          </div>
        )}
      </nav>
    </>
  );
};

Header.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    })
  ),
  variant: PropTypes.oneOf(["header1"]),
  rightNavNode: PropTypes.node,
};
