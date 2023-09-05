import React,{useContext} from 'react';
import Chat from 'containers/Chat'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from 'contexts/AuthContext';
import Auth from '../auth';

const Stack = createNativeStackNavigator();

function ChatStack() {
  const { auth: { isLoggedIn } } = useContext(AuthContext);
  return (
    <>
    {isLoggedIn && (
      <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Chats" component={Chat} />
      </Stack.Navigator>
     )}
     {!isLoggedIn && <Auth />}
  </>
  );
}

export default ChatStack;
