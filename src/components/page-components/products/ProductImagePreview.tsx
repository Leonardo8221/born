import { FC } from 'react';
import Slider from 'react-slick';
import {
  ProductAttachmentGraphqlDto,
  ProductWithCollectionsGraphqlDto,
} from '@/generated/types';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Icon } from '@/components/molecules/Icon';
import { Heading } from '@/components/molecules/Heading';
import BgImage from '@/assets/images/products/preview-bg.png';
import ProductHeader from '@/components/organisms/ProductHeader/ProductHeader';

interface ProductImagePreviewProps {
  attachments: ProductAttachmentGraphqlDto[];
  onDraftOrder: () => void;
  currentProduct: ProductWithCollectionsGraphqlDto | null;
  productRefectch: () => void;
  title?: string;
  onClose: () => void;
  styleId?: string;
  styleName?: string;
}

export const ProductImagePreview: FC<ProductImagePreviewProps> = ({
  attachments,
  title,
  productRefectch,
  onDraftOrder,
  currentProduct,
  onClose,
  styleId,
  styleName,
}) => {
  const settings = {
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: (
      <div className="text-shades-black">
        <Icon
          name="icon-chevron-right"
          height={40}
          width={40}
          className="text-shades-black"
        />
      </div>
    ),
    prevArrow: (
      <div className="text-shades-black">
        <Icon
          name="icon-chevron-left"
          height={40}
          width={40}
          className="text-shades-black"
        />
      </div>
    ),
    dots: false,
  };

  return (
    <div
      className="fixed z-[980] bg-shades-white w-screen h-screen left-0 top-0 bg-fixed bg-cover bg-top bg-no-repeat overflow-y-auto"
      style={{ backgroundImage: `url(${BgImage.src})` }}
    >
      <div className="flex items-center justify-end h-[72px] [&>div]:!pr-0">
        <ProductHeader
          productRefectch={productRefectch}
          currentProduct={currentProduct}
          onDraftOrder={onDraftOrder}
          containerClassName="!w-full"
        >
          <div className='flex !w-[104px] justify-center items-center'>
            <Icon
              name="icon-close"
              className="flex h-5 w-5 cursor-pointer items-center justify-center text-shades-black"
              onClick={onClose}
            />
          </div>
        </ProductHeader>
      </div>
      <div className="relative max-w-[624px] mx-auto py-10 mt-[56px]">
        <div className="ml-[52px] mb-[34px]">
          <Heading
            as="span"
            className="!text-[12px] !leading-[16px] !font-light text-shades-black"
          >
            {styleId}
          </Heading>
          <Heading as="h3" size="sm" className="text-shades-black">
            {styleName}
          </Heading>
        </div>
        <Slider {...settings} className="image__preview__slider">
          {attachments?.map(
            (item) =>
              item?.large_image_url && (
                <div key={item.id} className="text-center">
                  <div className="!h-[524px] !w-[524px] rounded-lg mx-auto overflow-hidden">
                    <img
                      src={item?.large_image_url}
                      className="object-cover h-full w-full"
                    />
                  </div>
                </div>
              )
          )}
        </Slider>
      </div>
    </div>
  );
};

export default ProductImagePreview;
