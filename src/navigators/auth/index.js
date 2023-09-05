import React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Auth from 'containers/Auth';
import SignUp from 'containers/Auth/SignUp';
import ForgotPassword from 'containers/Auth/ForgotPassword';
import OTP from 'containers/Auth/OTP';
import ResetPassword from 'containers/Auth/ResetPassword';
import EmailLogin from 'containers/Auth/EmailLogin';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false,}}>
        <Stack.Screen name="SignIn" component={Auth} />
        <Stack.Screen name="EmailLogin" component={EmailLogin} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="OTP" component={OTP} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
}

export default App;
