import { Toast } from 'flowbite-react';
import { useEffect } from 'react';
import { FaCircleExclamation } from 'react-icons/fa6';

import useAppError from '../hooks/useAppError';

const ErrorNotification = () => {
  const { appError, clearAppError } = useAppError();

  useEffect(() => {
    if (appError) {
      const timeout = setTimeout(clearAppError, 4e3);

      return () => clearTimeout(timeout);
    }
  }, [appError, clearAppError]);

  return appError ? (
    <div className="fixed bottom-4 z-50 flex w-full animate-bottom-appear justify-center opacity-0">
      <Toast className="dark:bg-gray-800 dark:shadow-2xl">
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-800 text-red-200">
          <FaCircleExclamation className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">{appError}</div>
        <div>
          <Toast.Toggle onClick={clearAppError} />
        </div>
      </Toast>
    </div>
  ) : null;
};

export default ErrorNotification;
