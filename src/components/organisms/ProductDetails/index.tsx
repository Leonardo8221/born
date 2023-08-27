import React, { FC } from 'react';
import clsx from 'clsx';
import Image, { StaticImageData } from 'next/image';
import { fonts } from '../../../config/fonts';
import { Icon } from '../../molecules/Icon';
import { Badge } from '../../molecules/Badge';
import {
  ProductVariantGraphqlDto,
  ProductWithCollectionsGraphqlDto,
} from '@/generated/types';
import { Paragraph } from '@/components/molecules/Paragraph';

export interface ProductDetailsProps extends ProductWithCollectionsGraphqlDto {
  productImages: StaticImageData[] | string[];
  description: string;
  colors: string[];
  tags: {
    title?: string;
    list?: string[];
  }[];
  specifications: { label: string; value: string }[];
  variants?: ProductVariantGraphqlDto[];
  onAttachmentClick?: () => void;
}

const ProductDetails: FC<ProductDetailsProps> = ({
  attachments,
  tags,
  specifications,
  description,
  onAttachmentClick,
}) => {
  return (
    <div>
      <div className="flex-1 h-fit">
        <div className="flex w-full flex-wrap gap-6">
          {attachments?.length ? (
            attachments?.map(
              (item, index) =>
                item?.medium_image_url && (
                  <div
                    key={`${index} product image`}
                    className="relative h-full max-h-[343px] w-[343px]"
                    onClick={onAttachmentClick}
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.1)] rounded" />
                    <img
                      src={item?.medium_image_url}
                      alt="products"
                      className="h-[343px] w-[343px] object-cover rounded"
                    />
                  </div>
                )
            )
          ) : (
            <div className="relative flex items-center justify-center h-[343px] w-[343px] bg-[rgba(0,0,0,0.1)] rounded">
              <div className="text-center">
                <Icon name="icon-info-circle" className="mx-auto mb-4" />
                <Paragraph size="lg" className="text-center">
                  No attachments found for <br /> this product!
                </Paragraph>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full mt-8">
        {description && (
          <Paragraph
            size="xl"
            className="text-shades-black !leading-[32px] !font-light tracking-[0.06em] mt-3"
          >
            {description}
          </Paragraph>
        )}
        <div>
          {tags?.map((tag: any) => (
            <div
              key={tag.title}
              className={clsx(
                'flex mt-6 flex-wrap gap-x-4',
                tag?.list?.length > 1 ? '' : 'items-center'
              )}
            >
              {tag?.title && (
                <h4
                  className={clsx(
                    'w-[100px] text-shades-black font-light tracking-[0.06em]',
                    fonts.text.md
                  )}
                >
                  {tag.title}
                </h4>
              )}
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
                    'w-full max-w-[116px] text-neutral-600 font-light',
                    fonts.text.md
                  )}
                >
                  {item.label}
                </h4>
                <p
                  className={clsx(
                    'max-w-[205px] text-shades-black font-light tracking-[0.08em]',
                    fonts.text.md
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
