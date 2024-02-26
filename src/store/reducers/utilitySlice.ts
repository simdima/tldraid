import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

interface UtilityState {
  name: string;
}

const initialState: UtilityState = {
  name: '',
};

const utilitySlice = createSlice({
  name: 'utility',
  initialState,
  reducers: {
    changeUtility: (state, { payload }: PayloadAction<string>) => {
      state.name = payload;
    },
  },
});

export const { changeUtility } = utilitySlice.actions;

export const selectUtilityName = (state: RootState) => state.utility.name;

export default utilitySlice.reducer;
