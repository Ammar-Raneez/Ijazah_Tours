import { combineReducers } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import userReducer from './userSlice';
import containerSizeReducer from './containerSizeSlice';

const rootReducer = combineReducers({
  user: userReducer,
  containerSize: containerSizeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
