import { FC } from 'react';
import { useRouter } from 'next/router';
import { Icon } from '@/components/molecules/Icon';
import ArrowIconLeft from '@/assets/svgs/arrow-left.svg';
import { Heading } from '@/components/molecules/Heading';

interface HeaderProps {
  heading: string;
  href?: string;
  onClose?: () => void;
}

const Header: FC<HeaderProps> = ({ heading = '', href = '', onClose }) => {
  const router = useRouter();
  const onBack = () => {
    const backPath = localStorage.getItem('edit_product_back_link');
    console.log(backPath)
    backPath ? router.push(backPath) : router.back();
  };
  return (
    <div className="flex w-full mx-auto items-center justify-between px-6 py-4 bg-[#fff] shadow-sm">
      <div className="flex items-center">
        <div onClick={onBack}>
          <ArrowIconLeft height={40} width={40} className="cursor-pointer" />
        </div>
        <Heading className="ml-3" fontWeight="light" size="xs">
          {heading}
        </Heading>
      </div>
      <div className="flex items-center gap-x-4">
        <Icon
          name="icon-close"
          onClick={() => (onClose ? onClose() : router?.back())}
          className="flex h-6 w-6 cursor-pointer items-center justify-center text-[#333333]"
        />
      </div>
    </div>
  );
};

export default Header;
