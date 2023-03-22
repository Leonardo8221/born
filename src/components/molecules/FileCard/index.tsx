import Image, { StaticImageData } from 'next/image';
import { FC, SyntheticEvent } from 'react';
import { variants } from './utils';

export interface FileCardProps {
  src: string | StaticImageData;
  onClick: (event: SyntheticEvent) => void;
  icon?: any;
  variant?: keyof typeof variants;
}

export const FileCard: FC<FileCardProps> = ({
  src,
  onClick,
  variant = 'rectangle',
  icon,
}) => {
  return (
    <div className={variants[variant]?.clsWrapper} onClick={onClick}>
      <div className={variants[variant]?.clsContainer}>
        <div
          className={
            !src
              ? variants[variant]?.clsOverlay
              : variants[variant]?.clsFilledOverlay
          }
        ></div>
        {!src && icon && <div className="absolute z-[2]">{icon}</div>}
        {!!src && (
          <img
            src={typeof src === 'string' ? src : src.src}
            alt="File"
            className={variants[variant]?.clsImage}
          />
        )}
      </div>
    </div>
  );
};
