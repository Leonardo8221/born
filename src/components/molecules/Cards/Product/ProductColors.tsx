import { FC } from "react";
import { VariantColors } from "../../ColorVariant";
import { Maybe, Scalars } from "@/generated/types";
import { fonts } from "@/config/fonts";
import clsx from "clsx";

interface ProductColorsProps {
  colour_families: Maybe<Array<Maybe<Scalars["String"]>>>;
  swatchImage?: string;
  colour_name: string;
  isHideLabel?: boolean;
}

const ProductColors: FC<ProductColorsProps> = ({ colour_families, swatchImage, colour_name, isHideLabel }) => {
  return (
    <div className="flex items-center gap-x-2 mt-1">
      <div className="flex items-center">
        <VariantColors
          colors={
            colour_families?.map((item: any) =>
              item?.toLowerCase()
            ) || []
          }
          url={swatchImage}
          backgroundColor="#F0F0F0"
        />
      </div>
      <span
        className={clsx(
          'text-shades-black tracking-[0.06em] text-center break-anywhere capitalize',
          fonts.text.sm,
          isHideLabel ? 'hidden' : 'inline-block'
        )}
        lang="es"
      >
        {colour_name?.toLowerCase()}
      </span>
    </div>
  )
}

export default ProductColors;
