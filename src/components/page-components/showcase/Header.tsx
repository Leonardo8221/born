import { FC } from "react";
import { useRouter } from "next/router";
import { Icon } from "@/components/molecules/Icon";
import ArrowIconLeft from "@/assets/svgs/arrow-left.svg";
import { Heading } from "@/components/molecules/Heading";

interface HeaderProps {
  heading: string;
}

const Header: FC<HeaderProps> = ({ heading = "" }) => {
  const router = useRouter();
  return (
    <div className="flex w-full mx-auto items-center justify-between px-6 py-4 bg-[#fff] shadow-sm">
      <div className="flex items-center">
        <div onClick={() => router?.back()}>
          <ArrowIconLeft height={40} width={40} className="cursor-pointer" />
        </div>
        <Heading className="ml-3" fontWeight="light" size="xs">
          {heading}
        </Heading>
      </div>
      <div className="flex items-center gap-x-4">
        <Icon
          name="icon-close"
          onClick={() => router?.back()}
          className="flex h-6 w-6 cursor-pointer items-center justify-center text-[#333333]"
        />
      </div>
    </div>
  );
};

export default Header;
