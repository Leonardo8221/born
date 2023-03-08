import { FC } from "react";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import { fonts } from "@/config/fonts";
import { Button } from "@/components/molecules/Button";

export interface OrganizationCardProps {
  imgSrc: string | StaticImageData;
  logoUrl: string | StaticImageData;
  organizationName: string;
  title?: string;
  id: string | number;
}

const OrganizationCard: FC<OrganizationCardProps> = ({
  imgSrc,
  logoUrl,
  organizationName,
  title,
  id,
}) => {
  return (
    <div className="p-4">
      <div
        className="relative overflow-hidden flex h-[172px] w-full max-w-[320] item-center justify-center bg-cover bg-no-repeat bg-center rounded-lg"
        style={{
          backgroundImage: `url(${
            typeof imgSrc !== "string" ? imgSrc?.src : imgSrc
          })`,
        }}
      >
        <div
          className="absolute h-full w-full left-0 top-0 bottom-0 right-0 rounded-lg"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.81) 0%, rgba(0, 0, 0, 0.31) 100%)",
          }}
        />
        <div className="relative z-[2] m-auto text-center">
          <Image
            src={logoUrl}
            alt={organizationName + "logo"}
            className="h-10 w-10 rounded-full p-[3.33px] mx-auto"
          />
          <h3
            className={clsx(
              "text-shades-white mt-2 tracking-[0.06em]",
              fonts.text.xl
            )}
          >
            {organizationName}
          </h3>
          <h4
            className={clsx(
              "text-shades-white mt-[3px] tracking-[0.06em]",
              fonts.text.sm
            )}
          >
            {title}
          </h4>
        </div>
      </div>
      <Button
        as="a"
        variant="outlined"
        className="w-full !max-w-[320px] mt-4 !tracking-[0.06em]"
        href={`/organization/${id}/manage/showcase`}
      >
        Sign in
      </Button>
    </div>
  );
};

export default OrganizationCard;
