import { combineReducers } from '@reduxjs/toolkit';

// eslint-disable-next-line import/no-cycle
import userReducer from './userSlice';

const rootReducer = combineReducers({
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
