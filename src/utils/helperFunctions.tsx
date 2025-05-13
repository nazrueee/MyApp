import {showMessage} from 'react-native-flash-message';
import {moderateScale, scale} from './scaling';
import {Platform} from 'react-native';
import {lightTheme} from '../styles/themes';
import fontFamily from '../constants/fontFamily';
/* eslint-disable */
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define common styling for message text
const messageTextStyle = {
  color: lightTheme.colors.background,
  fontFamily: fontFamily.medium,
  fontSize: scale(12),
};

export const showError = (message: string, duration: number = 1850): void => {
  showMessage({
    message: message,
    type: 'danger',
    backgroundColor: lightTheme.colors.danger,
    textStyle: messageTextStyle,
    icon: 'danger',
    duration,
    style: {
      paddingTop:
        Platform.OS == 'android' ? moderateScale(30) : moderateScale(0),
    },
  });
};

export const showSuccess = (message: string) => {
  showMessage({
    type: 'success',
    icon: 'success',
    floating: true,
    animated: true,
    style: {
      marginTop:
        Platform.OS == 'android' ? moderateScale(30) : moderateScale(0),
    },
    message,
  });
};

export const setItem = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error('Error setting item in AsyncStorage:', error);
  }
};

export const getItem = async (key: string): Promise<any | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error('Error getting item from AsyncStorage:', error);
    return null;
  }
};
