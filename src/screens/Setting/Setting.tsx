import {Text, View, Pressable, Platform} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {WrapperContainer} from '../../components/atoms';
import {moderateScale, scale, verticalScale} from '../../utils/scaling';
import {clearUserData} from '../../redux/reducerc/userSlice';
import {clearCategories} from '../../redux/reducerc/categorySlice';
import fontFamily from '../../constants/fontFamily';
import {lightTheme} from '../../styles/themes';
import {showSuccess} from '../../utils/helperFunctions';

const stylesheet = createStyleSheet(() => ({
  container: {
    flex: 1,
    marginTop: Platform.OS == 'android' ? verticalScale(40) : verticalScale(20),
  },
  bottomView: {
    alignItems: 'center',
    alignSelf: 'center',
    paddingBottom: moderateScale(40),
  },
  logoutTextStyle: {
    fontFamily: fontFamily.semiBold,
    fontSize: scale(16),
    color: lightTheme.colors.black,
  },
}));

const Profile: React.FC = () => {
  const {styles} = useStyles(stylesheet);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(clearUserData());
      dispatch(clearCategories(null));
      showSuccess('User logged out successfully,');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };
  return (
    <WrapperContainer isSafeAreaView={Platform.OS === 'android' ? false : true}>
      <View style={styles.container}>
        <View style={styles.bottomView}>
          <Pressable onPress={() => handleLogout()}>
            <Text style={styles.logoutTextStyle}>{'Logout'}</Text>
          </Pressable>
        </View>
      </View>
    </WrapperContainer>
  );
};

export default Profile;
