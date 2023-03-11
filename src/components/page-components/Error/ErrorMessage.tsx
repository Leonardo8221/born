import { FC } from 'react';
import { Button } from '@/components/molecules/Button';

interface ErrorMessageProps {
  errorMessage?: string;
  refetch?: () => void;
  homeRedirect?: boolean;
}

const ErrorMessage: FC<ErrorMessageProps> = ({
  errorMessage,
  refetch,
  homeRedirect = true,
}) => (
  <div className="w-full text-center">
    <div className="my-4 mx-auto w-full max-w-[700px] text-[16px] leading-[16px] text-center text-error-100">
      {errorMessage || 'Something went wrong!!'}
    </div>
    <div className="mt-3 flex gap-4 items-center justify-center">
      <div>
        {
          homeRedirect && (
            <Button
              as="a"
              variant="link"
              className="!bg-shades-white !text-shades-black"
              href="/"
            >
              Visit home
            </Button>
          )
        }
      </div>
      {refetch && (
        <div>
          <Button
            variant="link"
            className="!bg-shades-white !text-accent-b-200"
            onClick={() => refetch?.()}
          >
            Retry now!
          </Button>
        </div>
      )}
    </div>
  </div>
);

export default ErrorMessage;
