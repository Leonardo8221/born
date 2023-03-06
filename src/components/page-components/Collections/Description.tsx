import clsx from "clsx";
import { fonts } from "@/config/fonts";
import LogoutIcon from '@/assets/svgs/logout.svg';
import BookIcon from '@/assets/svgs/collection/book.svg';
import DocumentIcon from '@/assets/svgs/collection/document.svg';

const Description = () => {
  return (
    <div>
      <div className="flex mt-8 items-center justify-center gap-6">
        <div className="flex cursor-pointer border border-neutral-200 rounded">
          <div className="flex h-[50px] w-[60px] justify-center items-center">
            <BookIcon height={50} width={60} />
          </div>
          <div className="pl-1 pr-4">
            <span className={clsx('text-neutral-600 !leading-[8px]', fonts.text.xs)}>Lookbook</span>
            <p className={clsx('text-shades-black !leading-[16px]', fonts.text.lg)}>SS 23</p>
          </div>
        </div>
        <div className="flex cursor-pointer border border-neutral-200 rounded">
          <div className="flex h-[50px] w-[60px] justify-center items-center">
            <DocumentIcon height={50} width={60} />
          </div>
          <div className="pl-1 pr-4">
            <span className={clsx('text-neutral-600 !leading-[8px]', fonts.text.xs)}>Linesheet</span>
            <p className={clsx('text-shades-black !leading-[16px]', fonts.text.lg)}>SS 23</p>
          </div>
        </div>
        <div className="cursor-pointer border border-neutral-200 rounded">
          <LogoutIcon width={60} height={54} />
        </div>
      </div>
      <p className={clsx("max-w-[662px] mt-8 mx-auto text-shades-black text-center font-light tracking-[0.06em]", fonts.text["2xl"])}>
        Since 2013, Emporio Sirenuse has distilled the values and verve of inimitable Amalfi Coast hotel Le Sirenuse into a small, carefully curated collection of beachwear, resortwear, design and lifestyle items.
      </p>
    </div>
  )
}

export default Description;
