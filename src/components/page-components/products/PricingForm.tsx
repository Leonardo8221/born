import Dropdown, { Option } from '@/components/molecules/Dropdown';
import { Paragraph } from '@/components/molecules/Paragraph';
import {
  PriceGraphqlDto,
  ProductWithCollectionsGraphqlDto,
} from '@/generated/types';
import { FC, useEffect, useState } from 'react';
import Input from '@/components/molecules/Inputs/Input';
import { Button } from '@/components/molecules/Button';
import Toast from '../Toast';
import { Icon } from '@/components/molecules/Icon';
import { apiConfig } from '@/utils/apiConfig';
import { PriceRequestDTO, ProductResourceApi } from 'client/command';

interface PricingFormProps {
  product: ProductWithCollectionsGraphqlDto;
  refetch: () => void;
}

const PricingForm: FC<PricingFormProps> = ({ product, refetch }) => {
  const [pricings, setPricings] = useState<PriceRequestDTO[]>([
    {
      currency: '',
      exworks: 0,
      landed: 0,
      retail: 0,
    },
  ]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMesage] = useState('');

  const prices = pricings?.map((item) => item.currency);

  const currencies = [
    { name: 'USD', value: 'USD' },
    { name: 'EUR', value: 'EUR' },
    { name: 'GBP', value: 'GPB' },
  ];

  useEffect(() => {
    setPricings(
      (product?.associated_prices?.map((item) => ({
        currency: item?.currency || '',
        landed: item?.landed || 0,
        exworks: item?.exworks || 0,
        retail: item?.retail || 0,
      })) as any) || []
    );
  }, [product]);

  const handleInputChange = (
    name: string,
    value: string | number,
    index: number
  ) => {
    const items = [...pricings];
    const selectedItem: any = items[index];
    selectedItem[name] = value;
    items[index] = selectedItem;
    setPricings(items);
  };

  const handleSave = async () => {
    setIsSubmitted(true);
    try {
      const config = await apiConfig();
      const api = new ProductResourceApi(config);
      await api.apiProductUpdateProductPut(product?.id, {
        associated_prices: pricings,
      });
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

  const handleAddPrice = () => {
    setPricings([
      ...pricings,
      {
        currency: '',
        exworks: 0,
        landed: 0,
        retail: 0,
      },
    ]);
  };

  const handleDeletePrice = (index: number) => {
    setPricings(pricings.filter((_, idx) => idx !== index));
  };

  return (
    <div className="max-w-[900px]">
      <Paragraph size="xl" className="!text-shades-black !font-light !mb-4">
        Choose what currency and associated price point to display on your
        product cards and showcase.
      </Paragraph>
      {pricings.map((item, index) => (
        <div key={item.currency} className="inline-flex gap-x-8 items-center">
          <Dropdown
            selectedOption={
              item.currency
                ? { name: item.currency, value: item.currency }
                : undefined
            }
            isValid={false}
            label={'Currency'}
            options={currencies.filter(
              (cur: any) => !prices.includes(cur.name)
            )}
            onChange={({ value }: any) =>
              handleInputChange('currency', value, index)
            }
            className="w-[160px]"
          />
          <Input
            label="landed"
            value={item?.landed || ''}
            type="number"
            onChange={(value: string) =>
              handleInputChange('landed', Number(value), index)
            }
            isValid={false}
            className="w-[160px]"
          />
          <Input
            label="Exworks"
            value={item?.exworks || ''}
            type="number"
            onChange={(value: string) =>
              handleInputChange('exworks', Number(value), index)
            }
            isValid={false}
            className="w-[160px]"
          />
          <Input
            label="Retail"
            type="number"
            value={item?.retail || ''}
            onChange={(value: string) =>
              handleInputChange('retail', Number(value), index)
            }
            isValid={false}
            className="w-[160px]"
          />
          {pricings?.length > 1 && (
            <Button
              variant="outlined"
              className="!w-[72px] !text-[12px] tracking-[0.06em] !font-light !border-[#999999]"
              size="sm"
              onClick={() => handleDeletePrice(index)}
            >
              Delete
            </Button>
          )}
        </div>
      ))}
      <div>
        {pricings?.length < 3 && (
          <div>
            <div className="inline-flex">
              <Button
                variant="link"
                className="!bg-shades-white !text-shades-black"
                onClick={handleAddPrice}
              >
                <Icon name="icon-add" /> Add currency
              </Button>
            </div>
          </div>
        )}

        <div className="mt-5 inline-flex">
          <Button onClick={handleSave} disabled={isSubmitted}>
            Save
          </Button>
        </div>
        <Toast successMessage={successMessage} errorMessage={errorMessage} />
      </div>
    </div>
  );
};

export default PricingForm;
