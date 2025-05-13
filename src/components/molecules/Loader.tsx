import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {WrapperContainer} from '../atoms';
import {lightTheme} from '../../styles/themes';

const stylesheet = createStyleSheet(() => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const Loader = (): React.JSX.Element => {
  const {styles, theme} = useStyles(stylesheet);
  return (
    <WrapperContainer
      style={{backgroundColor: 'transparent'}}
      isSafeAreaView={false}>
      <View style={styles.container}>
        <ActivityIndicator color={lightTheme.colors.danger} size="large" />
      </View>
    </WrapperContainer>
  );
};

export default React.memo(Loader);
