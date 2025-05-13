import {useNavigation} from '@react-navigation/native';
import type {PropsWithChildren} from 'react';
import React from 'react';
import {Image, ImageSourcePropType, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {moderateScale, scale, verticalScale, width} from '../../utils/scaling';
import colors from '../../styles/colors';
import fontFamily from '../../constants/fontFamily';
import {lightTheme} from '../../styles/themes';
import { ImageContainer } from '../atoms';
import imagePath from '../../constants/imagePath';

const stylesheet = createStyleSheet(theme => ({
  headerStyle: {
    flexDirection: 'row',

    alignItems: 'center',
    paddingVertical: verticalScale(16),
    justifyContent:"center",
    backgroundColor: lightTheme.colors.white,
    paddingHorizontal: moderateScale(16),
    width: '100%',
  },
  icStyle: {
    width: moderateScale(16),
    height: moderateScale(16),
    marginTop: moderateScale(0),
    marginLeft: moderateScale(2),
  },
  cneterText: {
    fontSize: scale(16),
    color: lightTheme.colors.black,
    textAlign: 'center',
    fontFamily: fontFamily.semiBold,
  },
  rightText: {
    fontSize: scale(12),
    color: lightTheme.colors.black,
    fontFamily: fontFamily.medium,
    width: '65%',
  },
}));

type SectionProps = PropsWithChildren<{
  style?: object;
  centerText?: string;
  categoryText?: string;
  rightImage?: ImageSourcePropType;
  onPressLeft?: () => void;
  onPressRight?: () => void;
}>;

const HeaderComp = ({
  style,
  centerText,
  categoryText,
  rightImage,
  onPressRight,
}: SectionProps): React.JSX.Element => {
  const navigation = useNavigation();

  const {styles, theme} = useStyles(stylesheet);

  return (
    <View style={{...styles.headerStyle, ...style}}>
  
      <Text style={styles.cneterText}>{centerText}</Text>
     

    </View>
  );
};

export default React.memo(HeaderComp);
