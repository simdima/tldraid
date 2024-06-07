import { QueryFunctionContext } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import { Platform } from '../atoms/platform';
import type { ChatGptEngine } from '../atoms/settings';

export interface ChatGptResponse {
  id: string;
  object: string;
  created: number;
  model: ChatGptEngine;
  // typed as tuple since request is always sent with n=1 parameter
  choices: [
    {
      index: number;
      message: {
        role: string;
        content: string;
      };
      finish_reason: string;
    },
  ];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ChatGptErrorResponse {
  message: string;
  type: string;
  param: unknown;
  code: string;
}

const sendChatGptCompletionRequest = async ({
  queryKey,
}: QueryFunctionContext<
  [
    string,
    {
      platform: Platform;
      utility: string;
      chatGptEngine: ChatGptEngine;
      chatGptApiKey: string;
      chatQuery: string;
    },
  ]
>): Promise<ChatGptResponse> => {
  const [, { platform, utility, chatGptEngine, chatGptApiKey, chatQuery }] = queryKey;
  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      n: 1,
      temperature: 0.3,
      model: chatGptEngine,
      messages: [
        {
          role: 'user',
          content: `I'm using '${utility}' utility ${
            platform === 'common' ? '' : `on a ${platform} system`
          }. ${chatQuery}. Return response as markdown`,
        },
      ],
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${chatGptApiKey}`,
      },
    }
  );

  return response.data;
};

const handleChatGptError = (error: unknown) => {
  if (error instanceof AxiosError && error.response) {
    const chatGptApiError: ChatGptErrorResponse = error.response.data.error;
    console.error(chatGptApiError);

    if (chatGptApiError.code === 'invalid_api_key') {
      return 'Your OpenAI API key seems to be invalid';
    }

    if (chatGptApiError.code === 'model_not_found') {
      return `You don't have access to selected model`;
    }

    return `Error from OpenAI API: ${chatGptApiError.code}`;
  }

  return 'Unknown error from OpenAI API';
};

export { handleChatGptError, sendChatGptCompletionRequest };
