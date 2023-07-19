import { useEffect, useState } from 'react';

const useLocalStorage = (
  storageKey: string,
  initialValue: string
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState<string>(() => {
    const v = localStorage.getItem(storageKey);

    return v || initialValue;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, value);
  }, [storageKey, value]);

  return [value, setValue];
};

export default useLocalStorage;
