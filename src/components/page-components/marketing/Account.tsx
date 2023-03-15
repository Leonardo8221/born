import { Button } from "@/components/molecules/Button";
import Input from "@/components/molecules/Inputs/Input";
import React, { useState } from 'react'

const Account = () => {
  const initialQueries = {
    name: "Jol",
    surname: '',
    email: '',
    password: '',
    phone_number: '',
  };
  const [queryInputs, setQueryInputs] = useState(initialQueries);
  const changeQueryInputs =
    (input: keyof typeof queryInputs) => (value: string) =>
      setQueryInputs((prev) => ({
        ...prev,
        [input]: value,
      }));

  const isValidName = queryInputs.name.length > 0
  const isValidSurname = queryInputs.surname.length > 0
  const isValidEmail = queryInputs.email.length > 0;
  const isValidPassword = queryInputs.password.length > 0;
  const isValidPhoneNumber = queryInputs.phone_number.length > 0;

  return (
    <div className="w-[352px]">
      <p className="text-shades-black leading-8 text-[18px] mb-[26px]">
        Your personal details
      </p>
      <Input
        label="Name"
        value={queryInputs.name}
        onChange={changeQueryInputs("name")}
        isValid={isValidName}
        className="w-full"
      />
      <Input
        label="Surname"
        value={queryInputs.surname}
        onChange={changeQueryInputs("surname")}
        isValid={isValidSurname}
        className="w-full"
      />
      <Input
        label="Email"
        value={queryInputs.email}
        onChange={changeQueryInputs("email")}
        isValid={isValidEmail}
        className="w-full"
      />
      <Input
        label="Password"
        value={queryInputs.password}
        onChange={changeQueryInputs("password")}
        isValid={isValidPassword}
        className="w-full"
      />
      <Input
        label="Phone Number"
        value={queryInputs.phone_number}
        onChange={changeQueryInputs("phone_number")}
        isValid={isValidPhoneNumber}
        className="w-full"
      />
      <Button
        className="ml-0 w-auto mt-[20px]"
      >
        Save
      </Button>
    </div>
  );
}

export default Account