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
      className={clsx(
        'cursor-pointer inline-flex h-8 items-center gap-[6px] rounded-[100px] border border-neutral-500 p-1',
        label ? 'bg-neutral-200' : 'bg-shades-white'
      )}
      onClick={onClick}
    >
      <VariantColors colors={colors} className="!h-6 !w-6 !p-1" />
      {label && (
        <Paragraph size="md" className="pr-2">
          {label}
        </Paragraph>
      )}
    </div>
  );
};

export const VariantColors = ({
  colors,
  className,
}: {
  colors?: string[];
  className?: string;
}) => {
  return (
    <div className={clsx('h-4 w-4 p-0.5', className)}>
      <div className="flex h-full w-full rounded-full rounded-full overflow-hidden bg-shades-white">
        {colors?.map((col) => (
          <div
            key={col}
            className={clsx('flex-1 min-h-full bg-neutral-200')}
            style={{ backgroundColor: col?.toLowerCase() || '#fffff' }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorVariant;
