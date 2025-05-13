import React, {useState} from 'react';
import {
  Image,
  ImageProps,
  Platform,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {moderateScale, scale} from '../../utils/scaling';
import fontFamily from '../../constants/fontFamily';
import {lightTheme} from '../../styles/themes';

const stylesheet = createStyleSheet(theme => ({
  container: {
    height: moderateScale(40),
    borderColor: lightTheme.colors.opacity50,
    borderRadius: moderateScale(12),
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 0.3,
    paddingHorizontal: moderateScale(12),
    backgroundColor: lightTheme.colors.white,
    shadowColor: lightTheme.colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputStyle: {
    flex: 1,
    fontSize: scale(14),
    fontFamily: fontFamily.medium,
    color: lightTheme.colors.black,
    marginLeft: moderateScale(10),
    top: Platform.OS == 'android' ? moderateScale(4) : 0,
  },
  iconStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
  },
}));

type SearchBarProps = {
  value?: string;
  placeholder?: string;
  onChangeText?: (text: string) => void;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  icSearch?: ImageProps;
  onSubmit?: () => void;
};

const SearchBar = ({
  value,
  placeholder = 'Search User',
  onChangeText,
  style,
  inputStyle,
  icSearch,
  onSubmit,
}: SearchBarProps): React.JSX.Element => {
  const {styles, theme} = useStyles(stylesheet);
  const [searchText, setSearchText] = useState(value ?? '');

  const handleChange = (text: string) => {
    setSearchText(text);
    onChangeText?.(text);
  };

  return (
    <View style={[styles.container, style]}>
      {icSearch && <Image source={icSearch} style={styles.iconStyle} />}
      <TextInput
      maxLength={40}
        style={[styles.inputStyle, inputStyle]}
        placeholder={placeholder}
        value={searchText}
        onChangeText={handleChange}
        onSubmitEditing={onSubmit}
        placeholderTextColor={lightTheme.colors.opacity50}
        returnKeyType="search"
      />
    </View>
  );
};

export default React.memo(SearchBar);
