import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ChatGptEngine, type Platform } from '../../@types';
import { RootState } from '..';

export interface SettingsState {
  language: string;
  platform: Platform;
  chatGptEngine: ChatGptEngine;
  chatGptApiKey: string;
  ollamaUrl: string;
  ollamaModel: string;
}

const initialState: SettingsState = {
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
