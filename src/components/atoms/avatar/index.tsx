import { FC } from "react";
import clsx from "clsx";
import Image from "next/image";
import AvatarPlaceholder from './AvatarPlaceholder';
import styles from "./Avatar.module.css";

export interface AvatarProps {
  size?: 'md';
  imageSrc?: string;
  altText?: string;
  className?: string;
  imgClasses?: string;
}

const clsSize = {
  md: "w-[42px] h-[42px]",
};

export const Avatar: FC<AvatarProps> = ({
  size = 'md',
  imageSrc,
  altText,
  className,
  imgClasses
}) => {

  if (!imageSrc) {
    return <AvatarPlaceholder />;
  }

  return (
    <div
      className={clsx(
        styles.avatar,
        clsSize[size],
        "relative rounded-full border border-shades-black",
        className,
      )}
    >
      <Image
        src={imageSrc}
        alt={altText || 'Avatar'}
        className={clsx(`w-full h-full rounded-full object-cover`, imgClasses)}
        fill
      />
    </div>
  );
};
