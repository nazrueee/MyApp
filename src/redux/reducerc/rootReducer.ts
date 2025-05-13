/* eslint-disable */
import {combineReducers, Action} from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import userReducer from './userSlice';
import types from '../types';

export interface RootState {
  categories: ReturnType<typeof categoryReducer>;
  user: ReturnType<typeof userReducer>; //  user state
}

const appReducer = combineReducers({
  categories: categoryReducer,
  user: userReducer, //  user reducer
});

const rootReducer = (state: RootState | undefined, action: Action<any>) => {
  if (action.type === types.CLEAR_REDUX_STATE) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
