import React,{useContext} from 'react';
import Ads from 'containers/Ads';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from 'contexts/AuthContext';
import Auth from '../auth';

const Stack = createNativeStackNavigator();

function AdsStack() {
  const { auth: { isLoggedIn } } = useContext(AuthContext);
  return (
    <>
    {isLoggedIn && (
    <Stack.Navigator  screenOptions={{headerShown: false}}>
      <Stack.Screen name="Ads" component={Ads}/>
    </Stack.Navigator>
      )}
      {!isLoggedIn && <Auth />}
   </>
  );
}

export default AdsStack;