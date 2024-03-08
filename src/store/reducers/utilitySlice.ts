import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

interface BotAnswers {
  [utilityName: string]: string[];
}
interface UtilityState {
  name: string;
  botAnswers: BotAnswers;
}

const initialState: UtilityState = {
  name: '',
  botAnswers: {},
};

const utilitySlice = createSlice({
  name: 'utility',
  initialState,
  reducers: {
    changeUtility: (state, { payload }: PayloadAction<string>) => {
      state.name = payload;
    },
    addBotAnswer: (state, { payload }: PayloadAction<string>) => {
      if (state.name) {
        if (!state.botAnswers[state.name]) {
          state.botAnswers[state.name] = [];
        }

        state.botAnswers[state.name].push(JSON.stringify(payload));
      }
    },
  },
});

export const { changeUtility, addBotAnswer } = utilitySlice.actions;

export const selectUtilityName = (state: RootState) => state.utility.name;
export const selectUtilityBotAnswers = (state: RootState) => state.utility.botAnswers;

export default utilitySlice.reducer;
