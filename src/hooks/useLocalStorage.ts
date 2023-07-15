import { useEffect, useState } from 'react';

const useLocalStorage = (
  initialValue = ''
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const storageKey = 'tldraid_gpt_apikey';
  const [value, setValue] = useState<string>(() => {
    const v = localStorage.getItem(storageKey);

    return v ?? initialValue;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, value);
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
