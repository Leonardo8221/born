import React, { FC, useCallback, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { UserResourceApi } from 'client/command';
import { Button } from '@/components/molecules/Button';
import Input from '@/components/molecules/Inputs/Input';
import { USER_WITH_ORGANIZATION_QUERY } from '@/queries/users';
import { apiConfig } from '@/utils/apiConfig';
import Toast from '../Toast';
import Loading from '../Loading';
import { UserGraphqlDto } from '@/generated/types';

const initialQueries = {
  keycloak_id: '',
  keycloak_username: '',
  keycloak_first_name: '',
  keycloak_last_name: '',
  keycloak_email: '',
  password: '',
  phone_number: '',
};

const Account: FC = () => {
  const [queryInputs, setQueryInputs] = useState(initialQueries);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { data: users, loading } = useQuery(USER_WITH_ORGANIZATION_QUERY);
  const data = users?.userWithOrganizationsAndUpdateLastLoggedInDate;

  useEffect(() => {
    setQueryInputs({
      keycloak_first_name: data?.keycloak_first_name || '',
      keycloak_last_name: data?.keycloak_last_name || '',
      keycloak_email: data?.keycloak_email || '',
      keycloak_username: data?.keycloak_username || '',
      keycloak_id: data?.keycloak_id || '',
      password: data?.password || '',
      phone_number: '',
    });
  }, [data]);

  const changeQueryInputs =
    (input: keyof typeof queryInputs) => (value: string) =>
      setQueryInputs((prev) => ({
        ...prev,
        [input]: value,
      }));

  const isValidName = queryInputs.keycloak_first_name.length > 0;
  const isValidSurname = queryInputs.keycloak_last_name.length > 0;
  const isValidEmail = queryInputs.keycloak_email.length > 0;
  const isValidPassword = queryInputs.password.length > 0;
  const isValidPhoneNumber = queryInputs.phone_number.length > 0;

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

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const payload = { ...queryInputs };
      const config = await apiConfig();
      const api = new UserResourceApi(config);
      api.apiUserUpdateUserAndKcUserPut({
        ...payload,
        password: payload.password || undefined,
      });
      handleSuccessMesssage('Account settings updated successfully!');
      setIsLoading(false);
    } catch (error) {
      handleErrorMesssage('Failed to update account settings!');
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="w-[352px]">
      <p className="text-shades-black font-light leading-8 text-[18px] mb-[26px]">
        Your personal details
      </p>

      {loading ? (
        <Loading message="Loading personal details..." />
      ) : (
        <>
          <Input
            label="Name"
            value={queryInputs.keycloak_first_name}
            onChange={changeQueryInputs('keycloak_first_name')}
            isValid={isValidName}
            className="w-full"
          />
          <Input
            label="Surname"
            value={queryInputs.keycloak_last_name}
            onChange={changeQueryInputs('keycloak_last_name')}
            isValid={isValidSurname}
            className="w-full"
          />
          <Input
            label="Email"
            value={queryInputs.keycloak_email}
            onChange={changeQueryInputs('keycloak_email')}
            isValid={isValidEmail}
            className="w-full"
          />
          <Input
            label="Password"
            value={queryInputs.password}
            onChange={changeQueryInputs('password')}
            type="password"
            isValid={isValidPassword}
            className="w-full"
          />
          <Input
            label="Phone Number"
            value={queryInputs.phone_number}
            onChange={changeQueryInputs('phone_number')}
            isValid={isValidPhoneNumber}
            className="w-full"
          />
          <Button
            className="ml-0 w-auto mt-[20px]"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Save
          </Button>
        </>
      )}

      <Toast successMessage={successMessage} errorMessage={errorMessage} />
    </div>
  );
};

export default Account;
