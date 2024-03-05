import axios, { AxiosError } from 'axios';
import { ChatGptEngine, ChatGptErrorResponse, ChatGptResponse, Platform } from '../@types';

type ApiResponse =
  | {
      data: string;
    }
  | {
      error: string;
    }
  | undefined;

async function sendChatGptApiRequest(
  platform: Platform,
  utility: string,
  engine: ChatGptEngine,
  apiKey: string,
  question: string
): Promise<ApiResponse> {
  try {
    if (utility && question) {
      const options = {
        url: 'https://api.openai.com/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        data: {
          model: engine,
          n: 1,
          temperature: 0.3,
          messages: [
            {
              role: 'user',
              content: `I'm using '${utility}' utility ${
                platform === 'common' ? '' : `on a ${platform} system`
              }. ${question}. Return response as markdown`,
            },
          ],
        },
      };

      const response = await axios.request<ChatGptResponse>(options);
      if (response.status >= 200 && response.status < 400) {
        const [firstResponse] = response.data.choices;

        return {
          data: firstResponse.message.content,
        };
      } else {
        throw new Error('Something went wrong');
      }
    }

    return undefined;
  } catch (error) {
    let errorText = '';
    if (error instanceof AxiosError && error.response) {
      const errorResponse = error.response.data as unknown as ChatGptErrorResponse;
      if (errorResponse.error.code === 'invalid_api_key') {
        errorText = 'Your API key seems to be invalid';
      } else if (errorResponse.error.code === 'model_not_found') {
        errorText = `You do not have access to ${engine} model`;
      } else {
        errorText = `OpenAI API responded with error code: \n"${errorResponse.error.code}"`;
      }
    } else if (error instanceof Error) {
      errorText = error.message;
    } else {
      errorText = 'Encountered an unknown error';
    }

    return {
      error: errorText,
    };
  }
}

export { sendChatGptApiRequest };
