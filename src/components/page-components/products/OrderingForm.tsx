import { FC, useEffect, useState } from 'react';
import Input from '@/components/molecules/Inputs/Input';
import { ProductWithCollectionsGraphqlDto } from '@/generated/types';
import { Button } from '@/components/molecules/Button';
import { apiConfig } from '@/utils/apiConfig';
import { ProductRequestDTO, ProductResourceApi } from 'client/command';
import Toast from '../Toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { fonts } from '@/config/fonts';
import clsx from 'clsx';
import moment from 'moment';

interface OrderingFormProps {
  product: ProductWithCollectionsGraphqlDto;
}

const OrderingForm: FC<OrderingFormProps> = ({ product }) => {
  const [productDetails, setProductDetails] = useState<ProductRequestDTO>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMesage] = useState('');

  useEffect(() => {
    setProductDetails({
      min_order_quantity: product?.min_order_quantity || 0,
      min_order_value: product?.min_order_value || 0,
      delivery_lead_time: product?.delivery_lead_time || 0,
      upc: product?.upc || '',
      delivery_window_start_date: product?.delivery_window_start_date,
      delivery_window_end_date: product?.delivery_window_end_date,
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
      await api.apiProductUpdateProductPut(product?.id, {
        ...productDetails,
        delivery_window_start_date: moment(
          productDetails.delivery_window_start_date || ''
        ).format(),
        delivery_window_end_date: moment(
          productDetails.delivery_window_end_date || ''
        ).format(),
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
          label="Min. order quantity"
          value={productDetails?.min_order_quantity || ''}
          onChange={(value: string) =>
            handleInputChange('min_order_quantity', value)
          }
          isValid={false}
          className="w-full"
        />
        <Input
          label="Min. order value"
          value={productDetails?.min_order_value || ''}
          onChange={(value: string) =>
            handleInputChange('min_order_value', value)
          }
          isValid={false}
          className="w-full"
        />
      </div>
      <div className="flex flex-wrap gap-x-8">
        <div className="relative w-full max-w-[352px]">
          <label
            className={clsx(
              'absolute top-2 left-4 z-[2] text-shades-black bg-shades-white font-light px-1',
              fonts.text.md
            )}
          >
            Delivery window start date
          </label>
          <DatePicker
            selected={
              productDetails?.delivery_window_start_date
                ? new Date(productDetails?.delivery_window_start_date)
                : null
            }
            minDate={new Date()}
            onChange={(date: any) =>
              handleInputChange('delivery_window_start_date', date)
            }
            className="px-3 my-4 rounded h-[48px] w-full border border-neutral-500"
          />
        </div>
        <div className="relative w-full max-w-[352px]">
          <label
            className={clsx(
              'absolute top-2 left-4 z-[2] text-shades-black bg-shades-white font-light px-1',
              fonts.text.md
            )}
          >
            Delivery window end date
          </label>
          <DatePicker
            selected={
              productDetails?.delivery_window_end_date
                ? new Date(productDetails?.delivery_window_end_date)
                : null
            }
            minDate={new Date()}
            onChange={(date: any) =>
              handleInputChange('delivery_window_end_date', date)
            }
            className="px-3 my-4 rounded h-[48px] w-full border border-neutral-500"
          />
        </div>
      </div>
      <div className="max-w-[352px]">
        <Input
          label="Delivery lead time"
          value={productDetails?.delivery_lead_time || ''}
          onChange={(value: string) =>
            handleInputChange('delivery_lead_time', value)
          }
          isValid={false}
          className="w-full"
        />
        <Input
          label="UPC"
          value={productDetails?.upc || ''}
          onChange={(value: string) => handleInputChange('upc', value)}
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

export default OrderingForm;
