import React, {useState} from 'react';
import type {TextInputProps} from 'react-native';
import {
  ImageSourcePropType,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import ImageContainer from '../atoms/ImageContainer';
import {moderateScale, scale} from '../../utils/scaling';
import fontFamily from '../../constants/fontFamily';
import {lightTheme} from '../../styles/themes';

const stylesheet = createStyleSheet(theme => ({
  input: {
    height: moderateScale(52),
    borderColor: lightTheme.colors.black,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(10),
    flexDirection: 'row',
    paddingHorizontal: moderateScale(12),
    alignItems: 'center',
    backgroundColor: lightTheme.colors.textInputColor,
  },
  textInputStyle: {
    flex: 1,
    marginHorizontal: moderateScale(8),
    height: moderateScale(52),
    color: lightTheme.colors.black,
    fontFamily: fontFamily.medium,
    fontSize: scale(12),
  },
  labelStyle: {
    fontSize: scale(14),
    marginBottom: moderateScale(8),
    fontFamily: fontFamily.medium,
    color: lightTheme.colors.black,
  },
}));

interface CustomTextInputProps extends TextInputProps {
  placeholder: string;
  onChangeText: (text: string) => void;
  label: string;
  rightImage?: ImageSourcePropType | null;
  leftImage?: ImageSourcePropType | null;
  style?: object;
  onPressRight?: () => void;
  returnKeyType?: any;
  onSubmitEditing?: () => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  onChangeText,
  label,
  rightImage,
  leftImage,
  style,
  returnKeyType,
  onPressRight,
  onSubmitEditing,
  ...rest
}) => {
  const [text, setText] = useState('');
  const {styles, theme} = useStyles(stylesheet);

  const handleTextChange = (inputText: string) => {
    setText(inputText);
    if (onChangeText) {
      onChangeText(inputText);
    }
  };

  return (
    <>
      {label ? <Text style={styles.labelStyle}>{label}</Text> : null}
      <View
        style={{
          ...styles.input,
          ...style,
        }}>
        {leftImage ? (
          <ImageContainer
            resizeMode="contain"
            style={{height: moderateScale(16), width: moderateScale(16)}}
            source={leftImage}
          />
        ) : null}
        <TextInput
          maxLength={32}
          style={styles.textInputStyle}
          placeholder={`${placeholder}`}
          onChangeText={handleTextChange}
          value={text}
          placeholderTextColor={lightTheme.colors.black}
          {...rest}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
        />
        {rightImage ? (
          <Pressable onPress={onPressRight}>
            <ImageContainer source={rightImage} />
          </Pressable>
        ) : null}
      </View>
    </>
  );
};

export default React.memo(CustomTextInput);
