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

interface DetailsFormProps {
  product: ProductWithCollectionsGraphqlDto;
}

const DetailsForm: FC<DetailsFormProps> = ({ product }) => {
  const [productDetails, setProductDetails] = useState<ProductRequestDTO>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMesage] = useState('');

  useEffect(() => {
    setProductDetails({
      materials: (product?.materials || []) as string[],
      compositions: (product?.compositions || []) as string[],
      country_of_origin: product?.country_of_origin || '',
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
        <div className="my-3 relative">
          <label
            className={clsx(
              'absolute top-[-8px] left-4 z-[1] bg-shades-white font-light px-1',
              fonts.text.md
            )}
          >
            Materials
          </label>
          <CreatableSelect
            id="materials"
            value={productDetails?.materials?.map((item) => ({
              label: item,
              value: item,
            }))}
            placeholder=""
            options={productDetails.materials?.map((item) => ({
              label: item,
              value: item,
            }))}
            isMulti
            styles={createableSelectStyles}
            onChange={(e: any) =>
              handleInputChange(
                'materials',
                e?.map((item: { label: string; value: string }) => item.value)
              )
            }
          />
        </div>
        <div className="my-3 relative">
          <label
            className={clsx(
              'absolute top-[-8px] left-4 z-[1] bg-shades-white font-light px-1',
              fonts.text.md
            )}
          >
            Compositions
          </label>
          <CreatableSelect
            id="compositions"
            value={productDetails?.compositions?.map((item) => ({
              label: item,
              value: item,
            }))}
            placeholder=""
            options={productDetails.compositions?.map((item) => ({
              label: item,
              value: item,
            }))}
            isMulti
            styles={createableSelectStyles}
            onChange={(e: any) =>
              handleInputChange(
                'compositions',
                e?.map((item: { label: string; value: string }) => item.value)
              )
            }
          />
        </div>
        <Input
          label="Country of origin"
          value={productDetails?.country_of_origin || ''}
          onChange={(value: string) =>
            handleInputChange('country_of_origin', value)
          }
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

export default DetailsForm;
