import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import { Login } from '../screens';

export type AuthStackParamList = {
  Login?: any;
};

export const Stack = createNativeStackNavigator<AuthStackParamList>();
const AuthStack = () => (
  <>
    <Stack.Screen name="Login" component={Login} />
  </>
);

export default AuthStack;
