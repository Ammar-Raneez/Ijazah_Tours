import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { RootState } from './root';

interface ContainerSizeState {
  width: 0,
  height: 0,
}

const initialState: ContainerSizeState = {
  width: 0,
  height: 0,
};

export const containerSizeSlice = createSlice({
  name: 'containerSize',
  initialState,
  reducers: {
    onSizeChange: (state, action) => {
      state.height = action.payload.height;
      state.width = action.payload.width;
    },
  },
});

export const { onSizeChange } = containerSizeSlice.actions;
export const selectWidth = (state: RootState) => state.containerSize.width;
export const selectHeight = (state: RootState) => state.containerSize.height;
export default containerSizeSlice.reducer;
