import React, { FC } from "react";
import clsx from "clsx";
import Image, { StaticImageData } from "next/image";
import { fonts } from "../../../config/fonts";
import { Button } from "../../molecules/Button";
import { Icon } from "../../molecules/Icon";
import { Badge } from "../../molecules/Badge";
import ListPrices from "./ListPrices";
import { ProductGraphqlDto } from "@/generated/types";

export interface ProductDetailsProps extends ProductGraphqlDto {
  productImages: StaticImageData[] | string[];
  description: string;
  colors: string[];
  tags: {
    title: string;
    list?: string[];
  }[];
  specifications: { label: string; value: string }[];
}

const ProductDetails: FC<ProductDetailsProps> = ({
  productImages,
  associated_prices,
  description,
  colors,
  tags,
  specifications,
}) => {
  return (
    <div className="flex flex-wrap gap-8">
      <div className="h-fit">
        <div className="flex w-full max-w-[736px] flex-wrap gap-1">
          {productImages.map((item, index) => (
            <Image
              key={`${index} product image`}
              src={item}
              alt="products"
              className="h-full max-h-[366px] w-[366px] rounded"
            />
          ))}
          <div className="flex h-full h-[366px] w-full max-w-[366px] m-auto justify-center">
            <div className="flex h-[304px] w-full max-w-[304px] m-auto bg-neutral-400 items-center justify-center rounded">
              <div className="text-center">
                <Icon name="icon-image" className="text-neutral-600 mx-auto" />
                <Button
                  variant="outlined"
                  className={clsx(
                    "mt-6 h-8 max-w-[76px] !text-neutral-800 !border-neutral-600",
                    fonts.text.md
                  )}
                >
                  Upload
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full max-w-[352px]">
        <div>
          {associated_prices?.map((item, index) => {
            if (item?.landed || item?.exworks || item?.retail) {
              return (
                <ListPrices
                  key={`${index} associated_prices`}
                  items={
                    [
                      {
                        label: "Landed",
                        price: item.landed,
                      },
                      {
                        label: "Exworks",
                        price: item.exworks,
                      },
                      {
                        label: "Retail",
                        price: item.retail,
                      },
                    ] || []
                  }
                  currency={item?.currency || ""}
                />
              );
            }
          })}
        </div>
        <p
          className={clsx(
            "mt-3 font-light text-shades-black tracking-[0.06em]",
            fonts.text.base
          )}
        >
          {description}
        </p>
        <div className="mt-6">
          {colors?.map((color, index) => (
            <div
              key={`${color} + ${index}`}
              className="h-8 w-8 rounded border-2 border-shades-white"
              style={color ? { backgroundColor: color } : {}}
            />
          ))}
        </div>
        <div>
          {tags?.map((tag: any) => (
            <div
              key={tag.title}
              className={clsx(
                "flex mt-6 flex-wrap gap-x-4",
                tag?.list?.length > 1 ? "" : "items-center"
              )}
            >
              <h4
                className={clsx(
                  "w-[100px] text-shades-black font-light tracking-[0.06em]",
                  fonts.text.sm
                )}
              >
                {tag.title}
              </h4>
              <div className="flex flex-col gap-x-3 gap-y-2">
                {tag?.list?.map((item: string, index: number) => (
                  <div key={`${item} ${index}`}>
                    <Badge size="xl">{item}</Badge>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6">
          {specifications?.map((item) => {
            if (!item.value || item.value?.length === 0) {
              return null;
            }
            return (
              <div
                key={`${item.value} ${item.label}`}
                className="flex itms-center py-[6px] gap-x-4"
              >
                <h4
                  className={clsx(
                    "w-full max-w-[116px] text-neutral-600 font-light",
                    fonts.text.sm
                  )}
                >
                  {item.label}
                </h4>
                <p
                  className={clsx(
                    "max-w-[205px] text-shades-black font-light tracking-[0.08em]",
                    fonts.text.sm
                  )}
                >
                  {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
