import { QueryFunctionContext } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import type { Platform } from '../atoms/settings';

export interface OllamaModel {
  name: string;
  model: string;
  digest: string;
  details: {
    parameter_size: string;
  };
}

interface OllamaModelsResponse {
  models: OllamaModel[];
}

interface OllamaChatCompletionResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  context: number[];
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
}

const getOllamaModels = (baseUrl: string): Promise<OllamaModelsResponse> =>
  axios.get(`${baseUrl}/api/tags`).then(response => response.data);

const sendOllamaChatCompletionRequest = async ({
  queryKey,
}: QueryFunctionContext<
  [
    string,
    {
      ollamaUrl: string;
      ollamaModel: string;
      utility: string;
      platform: Platform;
      chatQuery: string;
    },
  ]
>): Promise<OllamaChatCompletionResponse> => {
  const [, { ollamaUrl, ollamaModel, utility, platform, chatQuery }] = queryKey;
  const response = await axios.post(`${ollamaUrl}/api/generate`, {
    model: ollamaModel,
    prompt: `I'm using '${utility}' utility ${
      platform === 'common' ? '' : `on a ${platform} system`
    }. ${chatQuery}. Respond with markdown`,
    stream: false,
  });

  return response.data;
};

const handleOllamaServerError = (error: unknown) => {
  if (error instanceof AxiosError) {
    console.error(error.message);

    if (error.message === 'Network Error') {
      return 'No Ollama server found at this URL';
    }

    return 'Ollama default Axios Error';
  }

  console.error(error);
  if (error instanceof DOMException) {
    return error.message;
  }

  return 'Unknown Ollama server error';
};

export { getOllamaModels, handleOllamaServerError, sendOllamaChatCompletionRequest };
