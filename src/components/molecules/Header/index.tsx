import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import { Logo } from "../../atoms/Logo";
import { activeClass, variations } from "./utils";

type Item = {
  label: string;
  href: string;
};

export interface HeaderProps {
  items: Item[];
  variant?: keyof typeof variations;
  rightNavNode: ReactNode;
  fixed?: boolean;
}

export interface NavItemProps extends JSX.IntrinsicAttributes {
  label: string;
  href: string;
  variant: keyof typeof variations;
}

const NavItem: FC<NavItemProps> = ({ label, href, variant, ...props }) => {
  const router = useRouter();
  return (
    <Link className={clsx(variations[variant].clsNavItem, router.asPath === href && activeClass)} href={href} {...props}>
      {label}
    </Link>
  );
};

export const Header: FC<HeaderProps> = ({
  items = [],
  variant = "header1",
  rightNavNode,
  fixed = false,
}) => {
  return (
    <header
      className={clsx(
        "w-full z-[20] bg-shades-white",
        fixed ? "fixed top-0 left-0 right-0" : "relative"
      )}
    >
      <nav className={clsx(variations[variant].clsNav)}>
        <div className="flex h-full items-center gap-[8px]">
          <div className="pr-8">
            <Link href="/">
              <Logo variant="dark" />
            </Link>
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
    </header>
  );
};
