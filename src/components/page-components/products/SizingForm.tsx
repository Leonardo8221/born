import { FC, useEffect, useState } from 'react';
import Input from '@/components/molecules/Inputs/Input';
import { ProductWithCollectionsGraphqlDto } from '@/generated/types';
import { Button } from '@/components/molecules/Button';
import { apiConfig } from '@/utils/apiConfig';
import { ProductRequestDTO, ProductResourceApi } from 'client/command';
import Toast from '../Toast';
import { createableSelectStyles } from './utils';
import CreatableSelect from 'react-select/creatable';
import { fonts } from '@/config/fonts';
import clsx from 'clsx';
import { Checkbox } from '@/components/molecules/Checkbox';

interface SizingFormProps {
  product: ProductWithCollectionsGraphqlDto;
}

const SizingForm: FC<SizingFormProps> = ({ product }) => {
  const [productDetails, setProductDetails] = useState<ProductRequestDTO>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMesage] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<any>([]);

  useEffect(() => {
    setProductDetails({
      measurements: (product?.measurements || []) as string[],
      size_type: product?.size_type || '',
      size_category: product?.size_category || '',
      size_options: (product?.measurements || []) as string[],
    });
    setSelectedOptions(product?.size_options || []);
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
      await api.apiProductUpdateProductPut(product?.id, {
        ...productDetails,
        size_options: selectedOptions,
      });
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
      <div className="max-w-[352px]">
        <Input
          label="Size run type"
          value={productDetails?.size_type || ''}
          onChange={(value: string) => handleInputChange('size_type', value)}
          isValid={false}
          className="w-full"
        />
        <Input
          label="Size run category"
          value={productDetails?.size_category || ''}
          onChange={(value: string) =>
            handleInputChange('size_category', value)
          }
          isValid={false}
          className="w-full"
        />
      </div>
      <div className="relative">
        <h2 className="relative inline-block ml-2 z-[2] bg-shades-white text-[12px] leading-[12px] font-light tracking-[0.06em] text-shades-black p-2">
          Size options
        </h2>
        <div className="absolute w-full h-[1px] bg-[#999999] top-0 left-0 bottom-0 my-auto" />
      </div>
      <div>
        <div className="inline-flex mb-3">
          {productDetails?.size_options?.map((item: any) => (
            <div className="flex w-[160px] gap-x-3 py-2" key={item}>
              <Checkbox
                checked={selectedOptions.includes(item)}
                onChange={() =>
                  setSelectedOptions(
                    selectedOptions.includes(item)
                      ? selectedOptions.filter((opt: string) => opt !== item)
                      : [...selectedOptions, item]
                  )
                }
              />
              {item}
            </div>
          ))}
        </div>
        <div className="my-3 relative max-w-[352px]">
          <label
            className={clsx(
              'absolute top-[-8px] left-4 z-[2] bg-shades-white font-light px-1',
              fonts.text.md
            )}
          >
            Mesasurements
          </label>
          <CreatableSelect
            id="measurements"
            value={productDetails?.measurements?.map((item) => ({
              label: item,
              value: item,
            }))}
            placeholder=""
            options={productDetails.measurements?.map((item) => ({
              label: item,
              value: item,
            }))}
            isMulti
            styles={createableSelectStyles}
            onChange={(e: any) =>
              handleInputChange(
                'measurements',
                e?.map((item: { label: string; value: string }) => item.value)
              )
            }
          />
        </div>
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

export default SizingForm;
