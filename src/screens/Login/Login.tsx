import React, {useRef, useState} from 'react';
import {
  Keyboard,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {moderateScale, scale, verticalScale} from '../../utils/scaling';
import {useDispatch} from 'react-redux';
import {ButtonContainer, WrapperContainer} from '../../components/atoms';
import {CustomTextInput, Loader} from '../../components/molecules';
import imagePath from '../../constants/imagePath';
import {setUserData, User} from '../../redux/reducerc/userSlice';
import {showError, showSuccess} from '../../utils/helperFunctions';
import fontFamily from '../../constants/fontFamily';
import {lightTheme} from '../../styles/themes';

const stylesheet = createStyleSheet(() => ({
  container: {
    flex: 1,
    marginTop: moderateScale(20),
    marginHorizontal: moderateScale(16),
    justifyContent: 'space-between',
    paddingTop: Platform.OS == 'android' ? verticalScale(40) : verticalScale(4),
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
}));
const Login = (): React.JSX.Element => {
  const {styles} = useStyles(stylesheet);
  const dispatch = useDispatch();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  // LoginCall
  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      showError('Please fill in both email and password.');
      return;
    }

    setIsLoading(true);
    try {
      const userData: User = {
        email: username,
        password: password,
        token: 'fake-jwt-token',
      };
      // Dispatch user data to Redux store
      dispatch(setUserData(userData));
      showSuccess('Login Successfully');
    } catch (error) {
      showError('Failed to login.');
      console.error('Failed to set user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <WrapperContainer isSafeAreaView={Platform.OS === 'android' ? false : true}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <CustomTextInput
              value={username}
              leftImage={imagePath.icUser}
              label="Name"
              placeholder="Enter your name"
              style={{marginBottom: verticalScale(16)}}
              onChangeText={setUsername}
            />
            <CustomTextInput
              value={password}
              secureTextEntry={true}
              leftImage={imagePath.icLock}
              label="Password"
              placeholder="Enter your password"
              style={{marginBottom: verticalScale(42)}}
              keyboardType="visible-password"
              onChangeText={setPassword}
              returnKeyType={'done'}
              onSubmitEditing={handleLogin}
            />
            <ButtonContainer
              textStyle={{
                fontFamily: fontFamily.semiBold,
                color: lightTheme.colors.black,
                fontSize: scale(16),
              }}
              label="LOG IN"
              onPress={handleLogin}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
      {isLoading && <Loader />}
    </WrapperContainer>
  );
};

export default Login;
