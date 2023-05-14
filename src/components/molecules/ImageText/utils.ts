import { fonts } from "@/config/fonts";
import clsx from 'clsx';

export const variantClasses = {
  brand: 'flex gap-x-4',
  product: 'flex gap-x-4',
  'brand-two': 'flex flex-col',
};


export const variantImageClasses = {
  brand: 'h-12 w-12 border border-neutral-200 rounded-full',
  product: 'min-h-[80px] min-w-[80px] h-[80px] w-[80px] rounded',
  'brand-two': 'h-[88px] w-[88px] rounded-full border border-neutral-200 mb-4',
};

export const variantTitleClasses = {
  brand: clsx(fonts.text.lg),
  product: clsx(fonts.text.lg),
  'brand-two': clsx(fonts.headings.md, 'text-center'),
};

export const variantSubTitleClasses = {
  brand: clsx(fonts.text.md),
  product: clsx(fonts.text.md),
  'brand-two': clsx(fonts.text.xl, 'text-center'),
};
