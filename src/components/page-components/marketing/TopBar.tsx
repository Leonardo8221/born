import { FC } from 'react';
import { Icon } from '@/components/molecules/Icon';
import ArrowIconLeft from '@/assets/svgs/arrow-left.svg';
import { useRouter } from 'next/router';

const TopBar: FC = () => {
  const router = useRouter();

  return (
    <div className="flex h-[72px] justify-between items-center bg-white w-full px-[32px] shadow-medium">
      <div
        className="flex h-10 w-10 cursor-pointer items-center justify-center"
        onClick={router.back}
      >
        <ArrowIconLeft height={40} width={40} />
      </div>
      <div
        className="flex h-10 w-10 cursor-pointer items-center justify-center"
        onClick={() => router.push('/')}
      >
        <Icon name="icon-close" height={20} width={20} />
      </div>
    </div>
  );
};

export default TopBar;
