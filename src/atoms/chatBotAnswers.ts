import { atom } from 'jotai';

export type ChatBotResponse = {
  id: string;
  content: string;
};

type UtilityChatBotResponses = {
  [utilityName: string]: ChatBotResponse[];
};

export const chatBotResponsesAtom = atom<UtilityChatBotResponses>({});
