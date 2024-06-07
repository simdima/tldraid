import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

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

const getOllamaModels = async (baseUrl: string): Promise<OllamaModelsResponse> => {
  const response = await axios.get(`${baseUrl}/api/tags`);
  if (!response.data.models) {
    throw new Error('Failed to get available models');
  }

  return response.data;
};

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

export { getOllamaModels, sendOllamaChatCompletionRequest };
