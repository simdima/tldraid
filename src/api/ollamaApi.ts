import axios, { AxiosError, AxiosResponse } from 'axios';
import { Platform } from '../@types';

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

function getOllamaModels(baseUrl: string) {
  return axios.get<OllamaModelsResponse>(`${baseUrl}/api/tags`);
}

interface OllamaChatCompletionRequest {
  model: string;
  prompt: string;
  stream: boolean;
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

function sendOllamaChatCompletionRequest(
  baseUrl: string,
  model: string,
  utility: string,
  platform: Platform,
  question: string
) {
  return axios.post<
    OllamaChatCompletionResponse,
    AxiosResponse<OllamaChatCompletionResponse>,
    OllamaChatCompletionRequest
  >(`${baseUrl}/api/generate`, {
    model,
    prompt: `I'm using '${utility}' utility ${
      platform === 'common' ? '' : `on a ${platform} system`
    }. ${question}. Respond with markdown`,
    stream: false,
  });
}

function parseOllamaChatCompletion(error: unknown) {
  if (error instanceof AxiosError && error.response && 'error' in error.response.data) {
    return `Ollama server responded with: ${error.response.data.error}`;
  }

  return 'Ollama server responded with error';
}

export { getOllamaModels, parseOllamaChatCompletion, sendOllamaChatCompletionRequest };
