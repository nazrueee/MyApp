import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  PressableProps,
  Text,
  ViewStyle,
} from 'react-native';
import {
  UnistylesRuntime,
  createStyleSheet,
  useStyles,
} from 'react-native-unistyles';
import {moderateScale} from '../../utils/scaling';
import {lightTheme} from '../../styles/themes';

const stylesheet = createStyleSheet(theme => ({
  btnStyle: {
    height: moderateScale(52),
    backgroundColor: lightTheme.colors.white,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(8),
    borderColor: lightTheme.colors.black,
  },
}));

interface CustomButtonProps extends PressableProps {
  label: string;
  style?: ViewStyle;
  textStyle?: object;
  isLoading?: boolean;
}

const ButtonContainer: React.FC<CustomButtonProps> = ({
  label,
  isLoading,
  style,
  textStyle,
  ...props
}) => {
  const {styles, theme} = useStyles(stylesheet);
  const isDarkMode = UnistylesRuntime.themeName === 'dark';

  return (
    <Pressable style={[styles.btnStyle, style]} {...props}>
      {isLoading ? (
        <ActivityIndicator
          color={isDarkMode ? lightTheme.colors.black : lightTheme.colors.white}
        />
      ) : (
        <Text
          style={{
            ...textStyle,
          }}>
          {label}
        </Text>
      )}
    </Pressable>
  );
};

export default React.memo(ButtonContainer);
