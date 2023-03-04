import { FC, ReactNode } from "react";
import { Logo } from "../../atoms/Logo";
import { variations } from "./utils";

type Item = {
  label: string;
  href: string;
}

export interface HeaderProps {
  items: Item[];
  variant: keyof typeof variations;
  rightNavNode: ReactNode;
}

export interface NavItemProps extends JSX.IntrinsicAttributes {
  label: string;
  href: string;
  variant: keyof typeof variations;
}

const NavItem: FC<NavItemProps> = ({ label, href, variant, ...props }) => {
  return (
    <a className={variations[variant].clsNavItem} href={href} {...props}>
      {label}
    </a>
  );
};

export const Header: FC<HeaderProps> = ({
  items = [],
  variant = "header1",
  rightNavNode
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
