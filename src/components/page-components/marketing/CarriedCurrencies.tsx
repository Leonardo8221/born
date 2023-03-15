import { Button } from "@/components/molecules/Button";
import Switch from "@/components/molecules/Switch";
import { OrganizationGraphqlDto } from "@/generated/types";
import React, { FC } from "react";

interface CarriedCurrenciesProps {
  organization: OrganizationGraphqlDto;
}


const CarriedCurrencies: FC<CarriedCurrenciesProps> = ({ organization }) => {
  const currencies = organization?.currency_types;
  return (
    <>
      <p className="text-shades-black leading-8 text-[18px] mb-8">
        Indicate what are the currencies you typically transact in
      </p>
      {currencies && currencies?.length > 0 && (
        <div className="flex">
          {currencies.map((currency: any, index: any) => {
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
      <Button className="ml-0 w-auto mt-[40px]">Save</Button>
    </>
  );
};

export default CarriedCurrencies;
