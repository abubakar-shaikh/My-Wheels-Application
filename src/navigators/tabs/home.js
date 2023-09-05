import React from 'react';
import Home from 'containers/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator headerMode="none" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Homes" component={Home} />
    </Stack.Navigator>
  );
}

export default HomeStack;