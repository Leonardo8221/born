import { FC } from "react";
import { Button } from "@/components/molecules/Button";
import { DropdownMenu } from "@/components/molecules/DropdownMenu";
import { Icon } from "@/components/molecules/Icon";
import ArrowIconLeft from "@/assets/svgs/arrow-left.svg";
import { Heading } from "@/components/molecules/Heading";
import Link from "next/link";
import { Pill } from "@/components/atoms/Pill";
import { useRouter } from "next/router";

interface HeaderProps {
  heading: string;
}

const Header: FC<HeaderProps> = ({ heading }) => {
  const router = useRouter();
  const items = [
    {
      label: "PDF",
      value: "pdf",
      action: () => console.log("PDF downloaded!"),
    },
    {
      label: "Excel",
      value: "excel",
      action: () => console.log("Excel downloaded!"),
    },
  ];
  return (
    <div className="flex w-full max-w-[1440px] mx-auto items-center justify-between pt-[50px] px-[64px]">
      <div className="flex w-[600px] justify-evenly items-center">
        <ArrowIconLeft
          height={40}
          width={40}
          className="cursor-pointer"
          onClick={() => router.back()}
        />
        <Pill label="Draft" appearance={"outlined"} size={"sm"} />
        <Heading fontWeight="light" className=" " size="sm">
          {heading}
        </Heading>
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
              variant: "outlined",
            }}
          />
        </div>
        <div>
          <Button className="!w-[172px] !px-[28px] text-[14px] leading-6">
            <Icon name="icon-add" /> Create order
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
