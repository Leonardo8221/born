import { FC, useEffect, useState } from 'react';
import Input from '@/components/molecules/Inputs/Input';
import { ProductWithCollectionsGraphqlDto } from '@/generated/types';
import { Button } from '@/components/molecules/Button';
import { apiConfig } from '@/utils/apiConfig';
import { ProductRequestDTO, ProductResourceApi } from 'client/command';
import Toast from '../Toast';
import CreatableSelect from 'react-select/creatable';
import clsx from 'clsx';
import { fonts } from '@/config/fonts';
import { createableSelectStyles } from './utils';

interface DescriptionFormProps {
  product: ProductWithCollectionsGraphqlDto;
  refetch: () => void;
}

const DescriptionForm: FC<DescriptionFormProps> = ({ product, refetch }) => {
  const [productDetails, setProductDetails] = useState<ProductRequestDTO>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMesage] = useState('');

  useEffect(() => {
    setProductDetails({
      style_name: product?.style_name || '',
      style_number: product?.style_number || '',
      description: product?.description || '',
      season: product?.season || '',
      keywords: product?.keywords as string[],
      first_category: product?.first_category || '',
      second_category: product?.second_category || '',
      third_category: product?.third_category || '',
      fourth_category: product?.fourth_category || '',
    });
  }, [product]);

  const handleInputChange = (name: string, value: string | string[]) => {
    setProductDetails({
      ...productDetails,
      [name]: value,
    });
  };

  const handleSave = async () => {
    setIsSubmitted(true);
    try {
      const config = await apiConfig();
      const api = new ProductResourceApi(config);
      await api.apiProductUpdateProductPut(product?.id, productDetails);
      await refetch();
      setIsSubmitted(false);
      setSuccessMessage('Product updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setIsSubmitted(false);
      setErrorMesage('Failed to update product!');
      console.error(error);
    }
  };

  return (
    <div className="max-w-[736px]">
      <div className="flex gap-8">
        <Input
          label="Product name"
          value={productDetails?.style_name || ''}
          onChange={(value: string) => handleInputChange('style_name', value)}
          isValid={false}
          className="w-full"
        />
        <Input
          label="Style ID"
          value={product?.style_id || ''}
          onChange={() => {}}
          isValid={false}
          className="w-full"
        />
      </div>
      <div>
        <h2 className="relative">
          <span className="z-[1] relative inline-block ml-2 bg-shades-white text-[12px] font-light tracking-[0.06em] leading-3 p-2">
            Product categories
          </span>
          <span className="absolute h-[1px] w-full top-0 bottom-0 left-0 bg-shades-black my-auto" />
        </h2>
        <div className="max-w-[352px]">
          <Input
            label="First category"
            value={productDetails?.first_category || ''}
            onChange={(value: string) =>
              handleInputChange('first_category', value)
            }
            isValid={false}
            className="w-full"
          />
          <Input
            label="Second category"
            value={productDetails?.second_category || ''}
            onChange={(value: string) =>
              handleInputChange('second_category', value)
            }
            isValid={false}
            className="w-full"
          />
          <Input
            label="Third category"
            value={productDetails?.third_category || ''}
            onChange={(value: string) =>
              handleInputChange('third_category', value)
            }
            isValid={false}
            className="w-full"
          />
          <Input
            label="Fourth category"
            value={productDetails?.fourth_category || ''}
            onChange={(value: string) =>
              handleInputChange('fourth_category', value)
            }
            isValid={false}
            className="w-full"
          />
        </div>
      </div>
      <div className="max-w-[352px]">
        <Input
          label="Style number"
          value={productDetails?.style_number || ''}
          onChange={(value: string) => handleInputChange('style_number', value)}
          isValid={false}
          className="w-full"
        />
        <Input
          label="Product description"
          value={productDetails?.description || ''}
          onChange={(value: string) => handleInputChange('description', value)}
          isValid={false}
          className="w-full"
        />
        <div className="my-3 relative">
          <label
            className={clsx(
              'absolute top-[-8px] left-4 z-[2] bg-shades-white font-light px-1',
              fonts.text.md
            )}
          >
            Keywords
          </label>
          <CreatableSelect
            id="keywords"
            value={productDetails?.keywords?.map((item) => ({
              label: item,
              value: item,
            }))}
            placeholder=""
            options={productDetails.keywords?.map((item) => ({
              label: item,
              value: item,
            }))}
            isMulti
            styles={createableSelectStyles}
            onChange={(e: any) =>
              handleInputChange(
                'keywords',
                e?.map((item: { label: string; value: string }) => item.value)
              )
            }
          />
        </div>
        <Input
          label="Season"
          value={productDetails?.season || ''}
          onChange={(value: string) => handleInputChange('season', value)}
          isValid={false}
          className="w-full"
        />
      </div>
      <div className="mt-5 inline-flex">
        <Button onClick={handleSave} disabled={isSubmitted}>
          Save
        </Button>
      </div>
      <Toast successMessage={successMessage} errorMessage={errorMessage} />
    </div>
  );
};

export default DescriptionForm;
