import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'; 
import AI from './ROBO/AI' ;




import { createStackNavigator } from '@react-navigation/stack';
import SpeechToText from './ROBO/SpeechToText';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AI" component={SpeechToText} options={{headerShown  : false}} />
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

