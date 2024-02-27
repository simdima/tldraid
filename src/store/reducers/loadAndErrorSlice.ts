import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

interface loadAndErrorState {
  error: string;
  isLoading: boolean;
}

const initialState: loadAndErrorState = {
  error: '',
  isLoading: false,
};

const loadAndErrorSlice = createSlice({
  name: 'loadAndError',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
      state.error = '';
    },
    setError: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { setLoading, setError } = loadAndErrorSlice.actions;

export const selectIsLoading = (state: RootState) => state.loadAndError.isLoading;
export const selectError = (state: RootState) => state.loadAndError.error;

export default loadAndErrorSlice.reducer;
