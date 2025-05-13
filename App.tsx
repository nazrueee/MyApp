import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import './src/styles/unistyles';
import store from './src/redux/store';
import Routes from './src/navigations/Routes';
import checkLocalStorage from './src/utils/checkLocalStorage';
import FlashMessage from 'react-native-flash-message';

const App = (): React.JSX.Element => {
  useEffect(() => {
    checkLocalStorage();
  }, []);
  return (
    <Provider store={store}>
      <Routes />
      <FlashMessage position="top" style={{zIndex: 999}} />
    </Provider>
  );
};

export default App;
