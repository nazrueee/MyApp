import {
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
  Switch,
} from 'react-native';
import React from 'react';
import {ImageContainer, WrapperContainer} from '../../components/atoms';
import {moderateScale, scale, verticalScale} from '../../utils/scaling';
import {lightTheme} from '../../styles/themes';
import fontFamily from '../../constants/fontFamily';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import imagePath from '../../constants/imagePath';
import {useNavigation} from '@react-navigation/native';

const stylesheet = createStyleSheet(theme => ({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? verticalScale(0) : verticalScale(6),
  },
  card: {
    backgroundColor: lightTheme.colors.white,
    padding: moderateScale(20),
    borderRadius: moderateScale(12),
    marginTop: verticalScale(20),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  labelText: {
    fontSize: scale(16),
    fontFamily: fontFamily.medium,
    color: lightTheme.colors.black,
    marginTop: verticalScale(10),
  },
  nameText: {
    fontSize: scale(24),
    fontFamily: fontFamily.bold,
    color: lightTheme.colors.black,
    marginBottom: verticalScale(10),
  },
}));

const UserDetails = ({route}: any) => {
  const {item} = route.params || {};
  const navigation = useNavigation();
  const {styles} = useStyles(stylesheet);

  return (
    <WrapperContainer>
      <View style={{paddingHorizontal: moderateScale(20)}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ImageContainer source={imagePath.icBack} />
        </TouchableOpacity>

        <View style={styles.card}>
          <Text style={styles.nameText}>{item?.name}</Text>

          <Text style={styles.labelText}>📞 {item?.phone}</Text>

          <Text style={styles.labelText}>📧 {item?.email}</Text>

          <Text style={styles.labelText}>
            🏠 {item?.address?.street}, {item?.address?.suite},{'\n'}
            {item?.address?.city} - {item?.address?.zipcode}
          </Text>
        </View>
      </View>
    </WrapperContainer>
  );
};

export default UserDetails;
