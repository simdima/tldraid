import { useCallback, useEffect } from 'react';
import './ErrorMessage.scss';

type Props = {
  error: string;
  setError: React.Dispatch<React.SetStateAction<string>>;
};

const ErrorMessage = ({ error, setError }: Props): JSX.Element => {
  const removeError = useCallback(() => {
    setError('');
  }, [setError]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      removeError();
    }, 5e3);

    return () => {
      clearTimeout(timeout);
    };
  }, [removeError]);

  return (
    <>
      {error && (
        <div
          className='error-popup'
          onClick={removeError}>
          <div>Error</div>
          <div>{error}</div>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;
