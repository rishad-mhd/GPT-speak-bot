import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import AI from './ROBO/AI' ;




import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AI" component={AI} options={{headerShown  : false}} />
    </Stack.Navigator>
  );
}



export default function App() {
  return (
    <NavigationContainer>

      <MyStack/>

    </NavigationContainer>
  );
}

