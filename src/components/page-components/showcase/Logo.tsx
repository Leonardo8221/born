import { FC, useState } from "react";
import Image from "next/image";
import LogoImage from "@/assets/images/logo-image.png";
import { Heading } from "@/components/molecules/Heading";

const ShowcaseLogo: FC = () => {
  return (
    <div className="mt-8 text-center">
      <div className="relative mx-auto h-[88px] w-[88px] rounded-full p-[7.33px] border border-neutral-200">
        <Image
          src={LogoImage}
          alt="Bornwave logo"
          fill
          className="!h-[73.33px] !w-[73.33px] !m-auto"
        />
      </div>
      <Heading
        size="md"
        as="h2"
        className="mt-4 mb-4 text-shades-black tracking-[0.06em]"
      >
        Missoma
      </Heading>
    </div>
  );
};

export default ShowcaseLogo;
