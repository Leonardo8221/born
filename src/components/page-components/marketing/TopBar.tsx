import { FC } from 'react';
import { Icon } from '@/components/molecules/Icon';
import ArrowIconLeft from '@/assets/svgs/arrow-left.svg';
import { useRouter } from 'next/router';
import { Heading } from '@/components/molecules/Heading';

interface TopBarProps {
  title?: string;
  onBack?: () => void;
}

const TopBar: FC<TopBarProps> = ({ title, onBack }) => {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 right-0 flex h-[72px] justify-between items-center bg-shades-white w-full px-[32px] shadow-medium z-[10]">
      <div className="flex items-center gap-4">
        <div
          className="flex h-10 w-10 cursor-pointer items-center justify-center"
          onClick={onBack || router.back}
        >
          <ArrowIconLeft height={40} width={40} />
        </div>
        {title && <Heading size="xs">{title}</Heading>}
      </div>
      <div
        className="flex h-10 w-10 cursor-pointer items-center justify-center"
        onClick={() =>
          router.push(`/organization/${router?.query?.id}/discover`)
        }
      >
        <Icon name="icon-close" height={20} width={20} />
      </div>
    </div>
  );
};

export default TopBar;
