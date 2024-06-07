import { useEffect, useState } from 'react';

function useDebouncedValue(value: string) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (value) {
      const delay = setTimeout(() => {
        setDebouncedValue(value);
      }, 1e3);

      return () => clearTimeout(delay);
    }

    // clear out right away if empty
    setDebouncedValue('');
  }, [value]);

  return {
    debouncedValue,
  };
}

export default useDebouncedValue;
