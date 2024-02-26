import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { loadFromLocalStorage, saveToLocalStorage } from '../../helpers';
import { RootState } from '..';
import { ChatGptEngine, Platform } from '../../@types';

interface SettingsState {
  language: string;
  platform: Platform;
  chatGptEngine: ChatGptEngine;
  chatGptApiKey: string;
}

const initialState: SettingsState = {
  language: loadFromLocalStorage('tldraid_pages_lang') || 'en',
  platform: 'common',
  chatGptEngine: loadFromLocalStorage('tldraid_gpt_engine') || 'gpt-3.5-turbo',
  chatGptApiKey: loadFromLocalStorage('tldraid_gpt_apikey') || '',
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    changeLanguage: (state, { payload }: PayloadAction<string>) => {
      state.language = payload;
      saveToLocalStorage('tldraid_pages_lang', payload);
    },
    changePlatform: (state, { payload }: PayloadAction<Platform>) => {
      state.platform = payload;
    },
    changeChatGptEngine: (state, { payload }: PayloadAction<ChatGptEngine>) => {
      state.chatGptEngine = payload;
      saveToLocalStorage('tldraid_gpt_engine', payload);
    },
    changeChatGptApiKey: (state, { payload }: PayloadAction<string>) => {
      state.chatGptApiKey = payload;
      saveToLocalStorage('tldraid_gpt_apikey', payload);
    },
  },
});

export const { changeChatGptApiKey, changeChatGptEngine, changeLanguage, changePlatform } =
  settingsSlice.actions;

export const selectSettingsLanguage = (state: RootState) => state.settings.language;
export const selectSettingsPlatform = (state: RootState) => state.settings.platform;
export const selectSettingsChatGptEngine = (state: RootState) => state.settings.chatGptEngine;
export const selectSettingsChatGptApikey = (state: RootState) => state.settings.chatGptApiKey;

export default settingsSlice.reducer;
