import { createContext, useCallback, useState } from 'react';

interface AppErrorContextValue {
  appError: string;
  throwAppError: (message: string) => void;
  clearAppError: () => void;
}

export const AppErrorContext = createContext<null | AppErrorContextValue>(null);

interface ContextProviderProps {
  children: React.ReactNode;
}

const AppErrorContextProvider = ({ children }: ContextProviderProps) => {
  const [appError, setAppError] = useState('');

  const contextValue: AppErrorContextValue = {
    appError,
    throwAppError: useCallback((message: string) => setAppError(message), []),
    clearAppError: useCallback(() => setAppError(''), []),
  };

  return <AppErrorContext.Provider value={contextValue}>{children}</AppErrorContext.Provider>;
};

export default AppErrorContextProvider;
