import clsx from 'clsx';
import { FC } from 'react';
import { Paragraph } from '../Paragraph';

interface ColorVariantProps {
  colors: string[];
  label?: string;
  onClick?: (event: any) => void;
}

const ColorVariant: FC<ColorVariantProps> = ({ colors, label, onClick }) => {
  return (
    <div
      className="cursor-pointer inline-flex h-8 items-center gap-[6px] rounded-[100px] bg-neutral-200 border border-neutral-500 p-1"
      onClick={onClick}
    >
      <div className="h-6 w-6 p-1">
        <div className="flex h-full w-full rounded-full rounded-full overflow-hidden bg-shades-white">
          {colors.map((col) => (
            <div
              key={col}
              className={clsx('flex-1 min-h-full')}
              style={{ backgroundColor: col?.toLowerCase() || '#fffff' }}
            />
          ))}
        </div>
      </div>
      {label && (
        <Paragraph size="md" className="pr-2">
          {label}
        </Paragraph>
      )}
    </div>
  );
};

export default ColorVariant;
