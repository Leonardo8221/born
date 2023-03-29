import Switch from '@/components/molecules/Switch';
import { Maybe, OrganizationGraphqlDto } from '@/generated/types';
import { apiConfig } from '@/utils/apiConfig';
import { OrganizationResourceApi } from 'client/command';
import React, { FC, useEffect, useState } from 'react';
import Toast from '../Toast';

interface CarriedCurrenciesProps {
  organization: OrganizationGraphqlDto;
}

const CarriedCurrencies: FC<CarriedCurrenciesProps> = ({ organization }) => {
  const [currencies, setCurrencies] = useState<Maybe<string>[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const currencyTypes = ['USD', 'EUR', 'GBP'];

  const handleErrorMesssage = (message: string) => {
    setErrorMessage(message);

    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  const handleSuccessMesssage = (message: string) => {
    setSuccessMessage(message);

    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
  };

  useEffect(() => {
    setCurrencies(organization?.currency_types || []);
  }, []);

  const handleUpdateCurrencies = async (currency: string) => {
    setIsSubmitting(true);
    try {
      const updatedCurrencies = currencies.includes(currency)
        ? currencies.filter((c) => c !== currency)
        : [...currencies, currency];
      setCurrencies(updatedCurrencies);
      const config: any = await apiConfig();
      const api = new OrganizationResourceApi(config);

      await api.apiOrganizationUpdateOrganizationDetailsPut(organization.id, {
        currency_types: updatedCurrencies as any,
      });
      handleSuccessMesssage(`Currency updated successfully!!`);
      setIsSubmitting(false);
    } catch (error: any) {
      handleErrorMesssage(
        error?.message || 'Something went wrong, please try again!'
      );
      setIsSubmitting(false);
      console.error(error);
    }
  };

  return (
    <>
      <p className="text-shades-black font-light leading-8 text-[18px] mb-8">
        Indicate what are the currencies you typically transact in
      </p>
      <div className="flex gap-[26px]">
        {currencyTypes.map((item) => (
          <div key={item}>
            <Switch
              label={item}
              checked={currencies?.includes(item)}
              onChange={() => handleUpdateCurrencies(item)}
              className={
                isSubmitting
                  ? 'pointer-events-none opacity-[0.7] cursor-not-allowed'
                  : ''
              }
            />
          </div>
        ))}
      </div>

      <Toast successMessage={successMessage} errorMessage={errorMessage} />
    </>
  );
};

export default CarriedCurrencies;
