import React,{useContext} from 'react';
import More from 'containers/More';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from 'contexts/AuthContext';
import Auth from '../auth';

const Stack = createNativeStackNavigator();
 function MoreStack() {
    const { auth: { isLoggedIn } } = useContext(AuthContext);
    return(
      <>
      {isLoggedIn && (
        <Stack.Navigator headerMode="none" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Screen" component={More} />
        </Stack.Navigator>
         )}
     {!isLoggedIn && <Auth />}
    </>
    );
  }

export default MoreStack;
