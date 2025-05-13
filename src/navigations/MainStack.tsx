import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {UserDetails} from '../screens';
import BottomTabs from './BottomTabs';

export type HomeStackParamList = {
  DashboardScreen: any;
  UserDetails:any
};
const Stack = createNativeStackNavigator<HomeStackParamList>();
const MainStack = () => {
  return (
    <>
     
      <Stack.Screen
        name="DashboardScreen"
        component={BottomTabs}
        options={{gestureEnabled: false}}
      />
     
      <Stack.Screen
        name="UserDetails"
        component={UserDetails}
        options={{gestureEnabled: false}}
      />

    </>
  );
};

export default MainStack;
