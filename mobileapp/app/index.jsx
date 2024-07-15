import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import Toast from 'react-native-toast-message'; // Import useToast hook
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import History from './components/(tabs)/History'
import Tablayout from './components/(tabs)/_layout';
import Personalinfo from './components/(tabs)/Personalinfo';
import Search from './components/(tabs)/Search';
const Stack = createStackNavigator();
const Index = () => {
 return (
  <>
    <Stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor: 'transparent',
            height:70,
          },
          headerTintColor: 'black',
          headerTitleStyle: {
            fontWeight: 'medium',
          },
        }}> 
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="Tablayout" component={Tablayout}/> 
        <Stack.Screen name="History" component={History}/>
        <Stack.Screen name="Personalinfo" component={Personalinfo}/>
        <Stack.Screen name="Search" component={Search}/>
    </Stack.Navigator>  
    <Toast></Toast>
    </>
  )
}

export default Index
