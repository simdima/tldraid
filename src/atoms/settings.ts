import { atom } from 'jotai';
import { z } from 'zod';

export const PlatformSchema = z.enum(['android', 'common', 'linux', 'osx', 'windows']);
export type Platform = z.infer<typeof PlatformSchema>;

export const ChatGptEngineSchema = z.enum(['gpt-3.5-turbo', 'gpt-4']);
export type ChatGptEngine = z.infer<typeof ChatGptEngineSchema>;

export const languageAtom = atom('en');
export const platformAtom = atom<Platform>('common');
export const chatGptEngineAtom = atom<ChatGptEngine>('gpt-3.5-turbo');
export const chatGptApiKeyAtom = atom('');
export const ollamaUrlAtom = atom('');
export const ollamaModelAtom = atom('');
