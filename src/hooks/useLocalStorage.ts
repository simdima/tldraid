import { useEffect, useState } from 'react';

const useLocalStorage = (
  initialValue = ''
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [value, setValue] = useState<string>(() => {
    const v = localStorage.getItem('tldraid_gpt_apikey');

    return v ?? initialValue;
  });

  useEffect(() => {
    localStorage.setItem('tldraid_gpt_apikey', value);
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
