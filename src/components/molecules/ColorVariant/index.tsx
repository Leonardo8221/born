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
        'inline-flex h-8 items-center gap-[6px] rounded-[100px] border border-neutral-500 p-1',
        label ? 'bg-neutral-200' : 'w-8 !border-netural-300 bg-shades-white'
      )}
      onClick={onClick}
    >
      <VariantColors colors={colors} className="!h-6 !w-6 !p-1" />
      {label && (
        <Paragraph
          size="md"
          className="pr-2 max-w-[166px] text-ellipsis whitespace-nowrap overflow-hidden"
        >
          {label}
        </Paragraph>
      )}
    </div>
  );
};

export const VariantColors = ({
  colors,
  className,
  type,
  active,
  onClick,
}: {
  colors?: string[];
  className?: string;
  type?: 'card';
  active?: boolean;
  onClick?: (e: any) => void;
}) => {
  return (
    <div
      className={clsx(
        'h-4 w-4 opacity-[0.7]',
        className,
        type === 'card' && active && '!border-0 !p-0.5',
        type === 'card'
          ? 'cursor-pointer rounded-full border-2 border-neutral-100 p-0 bg-shades-white'
          : 'p-0.5'
      )}
      style={{
        filter:
          type === 'card' && active
            ? 'drop-shadow(0px 1px 4px rgba(0,0,0,0.4))'
            : '',
      }}
      onClick={(e) => {
        onClick?.(e);
      }}
    >
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
