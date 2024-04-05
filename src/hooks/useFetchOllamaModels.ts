import { useEffect, useState } from 'react';

import { getOllamaModels, type OllamaModel } from '../api/ollamaApi';

const useFetchOllamaModels = (apiServerUrl: string) => {
  const [isServerFound, setIsServerFound] = useState(true);
  const [serverModels, setServerModels] = useState<OllamaModel[]>([]);

  useEffect(() => {
    setIsServerFound(true);

    const timeout = setTimeout(async () => {
      if (/^https?:\/\/.+$/.test(apiServerUrl.trim())) {
        try {
          const { data } = await getOllamaModels(apiServerUrl);

          if (data && data.models) {
            setServerModels(data.models);
          }
        } catch (error) {
          setIsServerFound(false);
          setServerModels([]);
        }
      } else {
        setServerModels([]);
      }
    }, 1e3);

    return () => {
      clearTimeout(timeout);
    };
  }, [apiServerUrl]);

  return { isServerFound, serverModels };
};

export default useFetchOllamaModels;
