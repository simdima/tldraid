import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

interface BotAnswer {
  id: string;
  content: string;
}

interface UtilityBotAnswers {
  [utilityName: string]: BotAnswer[];
}
interface UtilityState {
  name: string;
  botAnswers: UtilityBotAnswers;
}

const initialState: UtilityState = {
  name: '',
  botAnswers: {},
};

const utilitySlice = createSlice({
  name: 'utility',
  initialState,
  reducers: {
    changeUtility: (state, { payload: selectedUtility }: PayloadAction<string>) => {
      state.name = selectedUtility;
    },
    addBotAnswer: (state, { payload: newBotAnswer }: PayloadAction<BotAnswer>) => {
      if (state.name) {
        if (!state.botAnswers[state.name]) {
          state.botAnswers[state.name] = [];
        }

        state.botAnswers[state.name].push(newBotAnswer);
      }
    },
    deleteBotAnswer: (state, { payload: botAnswerId }: PayloadAction<string>) => {
      state.botAnswers[state.name] = state.botAnswers[state.name].filter(
        ({ id }) => id !== botAnswerId
      );
    },
  },
});

export const { addBotAnswer, changeUtility, deleteBotAnswer } = utilitySlice.actions;

export const selectUtilityName = (state: RootState) => state.utility.name;
export const selectUtilityBotAnswers = (state: RootState) => state.utility.botAnswers;

export default utilitySlice.reducer;
