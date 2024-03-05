import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

interface UtilityState {
  name: string;
  botAnswers: string[];
}

const initialState: UtilityState = {
  name: '',
  botAnswers: [],
};

const utilitySlice = createSlice({
  name: 'utility',
  initialState,
  reducers: {
    changeUtility: (state, { payload }: PayloadAction<string>) => {
      state.name = payload;
    },
    addBotAnswer: (state, { payload }: PayloadAction<string>) => {
      state.botAnswers.push(payload);
    },
    clearBotAnswers: state => {
      state.botAnswers = [];
    },
  },
});

export const { changeUtility, addBotAnswer, clearBotAnswers } = utilitySlice.actions;

export const selectUtilityName = (state: RootState) => state.utility.name;
export const selectUtilityBotAnswers = (state: RootState) => state.utility.botAnswers;

export default utilitySlice.reducer;
