import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '..';

interface loadAndErrorState {
  error: string;
  isLoading: boolean;
  isFirstLoad: boolean;
}

const initialState: loadAndErrorState = {
  error: '',
  isLoading: false,
  isFirstLoad: true,
};

const loadAndErrorSlice = createSlice({
  name: 'loadAndError',
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
      state.error = '';
    },
    setToastError: (state, { payload }: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = payload;
    },
    setFirstLoad: state => {
      state.isFirstLoad = false;
    },
  },
});

export const { setLoading, setToastError, setFirstLoad } = loadAndErrorSlice.actions;

export const selectIsLoading = (state: RootState) => state.loadAndError.isLoading;
export const selectToastError = (state: RootState) => state.loadAndError.error;
export const selectIsFirstLoad = (state: RootState) => state.loadAndError.isFirstLoad;

export default loadAndErrorSlice.reducer;
