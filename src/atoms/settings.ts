import { atomWithStorage } from 'jotai/utils';
import { SyncStorage } from 'jotai/vanilla/utils/atomWithStorage';
import { z } from 'zod';

export const ChatGptEngineSchema = z.enum(['gpt-3.5-turbo', 'gpt-4']);
export type ChatGptEngine = z.infer<typeof ChatGptEngineSchema>;

function initStorage<T>() {
  return {
    getItem(key, initialValue) {
      const value = localStorage.getItem(key);
      if (value) {
        return JSON.parse(value);
      }

      return initialValue;
    },
    setItem(key, newValue) {
      localStorage.setItem(key, JSON.stringify(newValue));
    },
    removeItem(key) {
      localStorage.removeItem(key);
    },
  } as SyncStorage<T>;
}

const options = {
  getOnInit: true,
};

export const languageAtom = atomWithStorage('tldraid_language', 'en', initStorage(), options);
export const chatGptEngineAtom = atomWithStorage<ChatGptEngine>(
  'tldraid_chatGptEngine',
  'gpt-3.5-turbo',
  initStorage<ChatGptEngine>(),
  options
);

export const chatGptApiKeyAtom = atomWithStorage(
  'tldraid_chatGptApiKey',
  '',
  initStorage(),
  options
);
export const ollamaUrlAtom = atomWithStorage('tldraid_ollamaUrl', '', initStorage(), options);
export const ollamaModelAtom = atomWithStorage('tldraid_ollamaModel', '', initStorage(), options);
