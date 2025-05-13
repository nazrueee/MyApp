import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {DashboardScreen, Profile,} from '../screens';
import {Image} from 'react-native';
import imagePath from '../constants/imagePath';
import {moderateScale, verticalScale} from '../utils/scaling';
import {useStyles} from 'react-native-unistyles';
import {lightTheme} from '../styles/themes';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  const {styles} = useStyles();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: lightTheme.colors.blue,
        tabBarInactiveTintColor: lightTheme.colors.opacity50, // Inactive tab color
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Image
              tintColor={
                focused ? lightTheme.colors.blue : lightTheme.colors.opacity50
              }
              source={imagePath.category}
              style={{width: moderateScale(24), height: moderateScale(24)}}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Setting"
        component={Profile}
        options={{
          tabBarIcon: ({color, size, focused}) => (
            <Image
              tintColor={
                focused ? lightTheme.colors.blue : lightTheme.colors.opacity50
              }
              source={imagePath.icSetting}
              style={{width: moderateScale(24), height: moderateScale(24)}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabs;
