import React, { useEffect } from 'react';
import { LogBox,Text,TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from 'navigators/app';
import AuthProvider from 'contexts/AuthContext';
import {UserProvider} from 'contexts/UserContext';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import Toast from 'react-native-toast-message';
import config from '../toastConfig';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';



LogBox.ignoreLogs([
  "exported from 'deprecated-react-native-prop-types'.",
  'componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.'
 ])
 Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
};
TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false,
};
const App = () => {

  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <SafeAreaProvider>
      
     <AuthProvider>
      <UserProvider>
      <NavigationContainer>
        <AppNavigator />
        <FlashMessage position="top" />
        <Toast
        config={config}
        position="bottom"
        bottomOffset={hp(2)}
        autoHide={500}
      />
      </NavigationContainer>
      </UserProvider>
     </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
