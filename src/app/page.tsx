import clsx from 'clsx';
import { Icon } from '@/components/molecules/Icon';
import { fonts } from '@/config/fonts';

export default function Home() {
  return (
    <main>
      <div className='h-screen w-full flex items-center justify-center text-center'>
        <div className='mb-[100px] text-center'>
          <Icon name="icon-info-circle" className='mx-auto' />
          <h1 className={clsx("text-shades-black text-center", fonts.headings.lg)}>
            Home page is under construction
          </h1>
        </div>
      </div>
    </main>
  )
}
