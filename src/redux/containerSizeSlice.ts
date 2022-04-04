import { createSlice } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import { RootState } from './root';

interface ContainerSizeState {
  withNavbarWidth: 0,
  withNavbarHeight: 0,
  withoutNavbarWidth: 0,
  withoutNavbarHeight: 0,
}

const initialState: ContainerSizeState = {
  withNavbarWidth: 0,
  withNavbarHeight: 0,
  withoutNavbarWidth: 0,
  withoutNavbarHeight: 0,
};

export const containerSizeSlice = createSlice({
  name: 'containerSize',
  initialState,
  reducers: {
    onSizeChange: (state, action) => {
      state.withNavbarWidth = action.payload.withNavbarWidth;
      state.withNavbarHeight = action.payload.withNavbarHeight;
      state.withoutNavbarWidth = action.payload.withoutNavbarWidth;
      state.withoutNavbarHeight = action.payload.withoutNavbarHeight;
    },
  },
});

export const { onSizeChange } = containerSizeSlice.actions;
export const selectWithNavbarWidth = (state: RootState) => state.containerSize.withNavbarWidth;
export const selectWithNavbarHeight = (state: RootState) => state.containerSize.withNavbarHeight;
export const selectWithoutNavbarWidth = (state: RootState) => state.containerSize.withoutNavbarWidth;
export const selectWithoutNavbarHeight = (state: RootState) => state.containerSize.withoutNavbarHeight;
export default containerSizeSlice.reducer;
