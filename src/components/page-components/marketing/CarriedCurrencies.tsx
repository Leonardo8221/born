import Switch from "@/components/molecules/Switch";
import { OrganizationProps } from "@/pages/organization/[id]/manage/marketing";
import React, { FC } from "react";

const CarriedCurrencies: FC<OrganizationProps> = ({ organization }) => {
  const currencies = organization?.currency_types;
  return (
    <>
      <p className="text-shades-black leading-8 text-[18px] mb-8">
        Indicate what are the currencies you typically transact in
      </p>
      {currencies && currencies?.length > 0 && (
        <div className="flex">
          {currencies.map((currency, index) => {
            if (!currency) {
              return null;
            }
            return (
              <div className="mr-[26px]" key={`${index} currency`}>
                <Switch label={currency} />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default CarriedCurrencies;
