import { useEffect, useRef } from 'react';
import { Toast } from 'flowbite-react';
import { FaCircleExclamation } from 'react-icons/fa6';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectError, setError } from '../store/reducers/loadAndErrorSlice';

const ErrorToast = () => {
  const dispatch = useAppDispatch();

  const error = useAppSelector(selectError);

  const closeButtonContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (error) {
      timeout = setTimeout(() => {
        if (closeButtonContainerRef.current) {
          const closeButon = closeButtonContainerRef.current.firstChild as HTMLButtonElement;
          closeButon.click();
        }
      }, 5e3); // close automatically afer 5 seconds
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  return error ? (
    <div className='w-full flex justify-center fixed z-50 bottom-4 opacity-0 animate-bottom-appear'>
      <Toast className='dark:bg-gray-800 dark:shadow-2xl'>
        <div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-800 text-red-200'>
          <FaCircleExclamation className='h-5 w-5' />
        </div>
        <div className='ml-3 text-sm font-normal'>{error}</div>
        <div ref={closeButtonContainerRef}>
          <Toast.Toggle onClick={() => dispatch(setError(''))} />
        </div>
      </Toast>
    </div>
  ) : null;
};

export default ErrorToast;
