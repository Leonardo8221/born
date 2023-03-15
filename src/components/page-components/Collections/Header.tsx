import { FC } from 'react';
import { useRouter } from 'next/router';
import { Button } from '@/components/molecules/Button';
import { DropdownMenu } from '@/components/molecules/DropdownMenu';
import { Icon } from '@/components/molecules/Icon';
import ArrowIconLeft from '@/assets/svgs/arrow-left.svg';

interface HeaderProps {
  handleCreateOrder: () => void;
}

const Header: FC<HeaderProps> = ({ handleCreateOrder }) => {
  const router = useRouter();
  const items = [
    {
      label: 'PDF',
      value: 'pdf',
      action: () => console.log('PDF downloaded!'),
    },
    {
      label: 'Excel',
      value: 'excel',
      action: () => console.log('Excel downloaded!'),
    },
  ];
  return (
    <div className="flex w-full max-w-[1440px] mx-auto items-center justify-between pt-[50px] px-[64px]">
      <div>
        <div onClick={() => router?.back()}>
          <ArrowIconLeft height={40} width={40} className="cursor-pointer" />
        </div>
      </div>
      <div className="flex items-center gap-x-4">
        <div>
          <Button variant="outlined">Edit</Button>
        </div>
        <div>
          <DropdownMenu
            options={items}
            variant="button"
            label="Download"
            buttonProps={{
              variant: 'outlined',
            }}
          />
        </div>
        <div>
          <Button
            onClick={handleCreateOrder}
            className="!w-[172px] !px-[28px] text-[14px] leading-6"
          >
            <Icon name="icon-add" /> Create order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
