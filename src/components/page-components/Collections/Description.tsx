import { FC } from 'react';
import clsx from 'clsx';
import { fonts } from '@/config/fonts';
import LogoutIcon from '@/assets/svgs/logout.svg';
import BookIcon from '@/assets/svgs/collection/book.svg';
import DocumentIcon from '@/assets/svgs/collection/document.svg';

interface DescriptionProps {
  onUpload?: (e: any) => void;
  description?: string;
  linesheetName?: string;
  linesheetUrl?: string;
  lookbookName?: string;
  lookbookUrl?: string;
}

const Description: FC<DescriptionProps> = ({
  onUpload = () => {},
  description,
  linesheetName,
  linesheetUrl,
  lookbookName,
  lookbookUrl,
}) => {
  return (
    <div>
      <div className="print:hidden flex mt-8 items-center justify-center gap-6">
        {lookbookName && lookbookUrl && (
          <div className="flex cursor-pointer border border-neutral-200 rounded">
            <div className="flex h-[50px] w-[60px] justify-center items-center">
              <BookIcon height={50} width={60} />
            </div>
            <div className="pl-1 pr-4">
              <span
                className={clsx(
                  'text-neutral-600 !leading-[8px]',
                  fonts.text.xs
                )}
              >
                Lookbook
              </span>
              <p
                className={clsx(
                  'text-shades-black !leading-[16px] !max-w-[100px] whitespace-nowrap overflow-hidden text-ellipsis',
                  fonts.text.lg
                )}
              >
                {lookbookName}
              </p>
            </div>
          </div>
        )}
        {linesheetName && linesheetUrl && (
          <div className="flex cursor-pointer border border-neutral-200 rounded">
            <div className="flex h-[50px] w-[60px] justify-center items-center">
              <DocumentIcon height={50} width={60} />
            </div>
            <div className="pl-1 pr-4">
              <span
                className={clsx(
                  'text-neutral-600 !leading-[8px]',
                  fonts.text.xs
                )}
              >
                Linesheet
              </span>
              <p
                className={clsx(
                  'text-shades-black !leading-[16px] !max-w-[100px] whitespace-nowrap overflow-hidden text-ellipsis',
                  fonts.text.lg
                )}
              >
                {linesheetName}
              </p>
            </div>
          </div>
        )}
        <div className="cursor-pointer border border-neutral-200 rounded">
          <LogoutIcon width={60} height={54} onClick={onUpload} />
        </div>
      </div>
      {description && (
        <p
          className={clsx(
            'max-w-[662px] mt-8 mx-auto text-shades-black text-center font-light tracking-[0.06em]',
            fonts.text['2xl']
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};

export default Description;
