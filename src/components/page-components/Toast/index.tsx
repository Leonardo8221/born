import clsx from 'clsx';
import { FC } from 'react';

interface ToastProps {
  successMessage?: string;
  errorMessage?: string;
}

const Toast: FC<ToastProps> = ({ successMessage, errorMessage }) => {
  if (successMessage || errorMessage) {
    return (
      <div
        className={clsx(
          'absolute max-w-[500px] mx-auto text-center bottom-4 left-0 right-0 rounded px-4 py-1 text-shades-white',
          errorMessage && 'bg-error-100',
          successMessage && 'bg-success-200',
        )}
      >
        {successMessage}
      </div>
    );
  }

  return null;
};

export default Toast;
