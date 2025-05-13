/* eslint-disable */
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setItem} from '../../utils/helperFunctions';

export interface User {
  id?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  token?: string;
  password: string;
}
interface UserState {
  userData?: User | null;
}
const initialState: UserState = {
  userData: null,
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state.userData = action.payload;
      setItem('userData', action.payload); // Save to AsyncStorage
    },
    clearUserData: state => {
      state.userData = null;
      AsyncStorage.removeItem('userData'); // Clear from AsyncStorage
      AsyncStorage.removeItem('categories'); // Clear from AsyncStorage
    },
  },
});

export const {setUserData, clearUserData} = userSlice.actions;
export default userSlice.reducer;
