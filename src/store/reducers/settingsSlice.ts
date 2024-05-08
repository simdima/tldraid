import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

import { RootState } from '..';

const Platform = z.enum(['android', 'common', 'linux', 'osx', 'windows']);
export type Platform = z.infer<typeof Platform>;

export const ChatGptEngine = z.enum(['gpt-3.5-turbo', 'gpt-4']);
export type ChatGptEngine = z.infer<typeof ChatGptEngine>;

export const SettingsSchema = z.object({
  language: z.string().min(2).max(5),
  platform: Platform,
  chatGptEngine: ChatGptEngine,
  chatGptApiKey: z.string().trim().min(15, { message: 'API key is too short' }).or(z.literal('')),
  ollamaUrl: z
    .string()
    .trim()
    .url()
    .regex(/[^/]$/, { message: 'Remove trailing slash' })
    .or(z.literal('')),
  ollamaModel: z.string().or(z.literal('')),
});

const initialState: z.infer<typeof SettingsSchema> = {
  language: 'en',
  platform: 'common',
  chatGptEngine: 'gpt-3.5-turbo',
  chatGptApiKey: '',
  ollamaUrl: '',
  ollamaModel: '',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeLanguage: (state, { payload }: PayloadAction<string>) => {
      state.language = payload;
    },
    changePlatform: (state, { payload }: PayloadAction<Platform>) => {
      state.platform = payload;
    },
    changeChatGptEngine: (state, { payload }: PayloadAction<ChatGptEngine>) => {
      state.chatGptEngine = payload;
    },
    changeChatGptApiKey: (state, { payload }: PayloadAction<string>) => {
      state.chatGptApiKey = payload;
    },
    changeOllamaUrl: (state, { payload }: PayloadAction<string>) => {
      state.ollamaUrl = payload;
    },
    updateOllamaModel: (state, { payload }: PayloadAction<string>) => {
      state.ollamaModel = payload;
    },
  },
});

export const {
  changeChatGptApiKey,
  changeChatGptEngine,
  changeLanguage,
  changeOllamaUrl,
  changePlatform,
  updateOllamaModel,
} = settingsSlice.actions;

export const selectSettingsLanguage = (state: RootState) => state.settings.language;
export const selectSettingsPlatform = (state: RootState) => state.settings.platform;
export const selectSettingsChatGptEngine = (state: RootState) => state.settings.chatGptEngine;
export const selectSettingsChatGptApikey = (state: RootState) => state.settings.chatGptApiKey;
export const selectSettingsOllamaUrl = (state: RootState) => state.settings.ollamaUrl;
export const selecteSettingsOllamaModel = (state: RootState) => state.settings.ollamaModel;

export default settingsSlice.reducer;
