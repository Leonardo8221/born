import Image from "next/image";
import clsx from "clsx";
import lightLogo from "@/assets/images/logos/logo-light.png";
import darkLogo from "@/assets/images/logos/logo-dark.png";
import neutralLogo from "@/assets/images/logos/logo-neutral.png";

export interface LogoProps {
  variant?: 'light' | 'dark' | 'neutral';
  className?: string;
}

export const Logo = ({ variant, className }: LogoProps) => {
  const logos = {
    light: lightLogo,
    dark: darkLogo,
    neutral: neutralLogo,
  };

  return (
    <Image
      src={logos[variant || 'light']}
      alt={`Logo ${variant}`}
      className={clsx('relative max-w-[100px] w-full h-auto', className)}
    />
  );
};
