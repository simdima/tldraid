import { Toast } from 'flowbite-react';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { FaCircleExclamation } from 'react-icons/fa6';

import { globalErrorAtom } from '../atoms/globalError';

const ErrorNotification = () => {
  const [globalError, setGlobalError] = useAtom(globalErrorAtom);

  useEffect(() => {
    if (globalError) {
      const timeout = setTimeout(() => setGlobalError(''), 4e3);

      return () => clearTimeout(timeout);
    }
  }, [globalError, setGlobalError]);

  return globalError ? (
    <div className="fixed bottom-4 z-50 flex w-full animate-bottom-appear justify-center opacity-0">
      <Toast className="dark:bg-gray-800 dark:shadow-2xl">
        <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-800 text-red-200">
          <FaCircleExclamation className="h-5 w-5" />
        </div>
        <div className="ml-3 text-sm font-normal">{globalError}</div>
        <div>
          <Toast.Toggle onClick={() => setGlobalError('')} />
        </div>
      </Toast>
    </div>
  ) : null;
};

export default ErrorNotification;
