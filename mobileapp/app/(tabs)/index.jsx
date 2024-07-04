import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { StyleSheet,View, Text } from 'react-native'
import { NavigationAction, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as NavigationBar from 'expo-navigation-bar';

import Home from '../components/Home'
import Login from '../components/Login';
import Signup from '../components/Signup';
import Prompt from '../components/Prompt'
const Stack = createStackNavigator();
const Index = () => {
  useEffect(() => {
    NavigationBar.setVisibilityAsync('hidden');
  }, []);

  return (
    <Stack.Navigator initialRouteName='Home'> 
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Signup" component={Signup}/>
        <Stack.Screen name="Prompt" component={Prompt}/>
    </Stack.Navigator>   
  )
}

export default Index
