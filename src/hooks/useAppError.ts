import { useContext } from 'react';

import { AppErrorContext } from '../context/AppErrorContext';

export default function useAppError() {
  const appErrorContext = useContext(AppErrorContext);

  if (!appErrorContext)
    throw new Error('You need to use this hook inside the AppErrorContext provider');

  return appErrorContext;
}
