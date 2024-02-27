import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectError, setError } from '../store/reducers/loadAndErrorSlice';

import './ErrorMessage.scss';

const ErrorMessage = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const error = useAppSelector(selectError);

  const removeError = useCallback(() => {
    dispatch(setError(''));
  }, [dispatch]);

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
