import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // or your preferred icon library
import Profile from './Profile';
import Search from './Search';
import Favourites from './Favourites';
import tw from 'twrnc'; // Import twrnc for Tailwind CSS classes

const Tab = createMaterialBottomTabNavigator();

const Tablayout = ({route}) => {
  const { username } = route.params; 
  console.log(username,"blah");
  
  return (
    <Tab.Navigator
      initialRouteName="Search"
      activeColor={tw.color('text-purple-700')}
      inactiveColor={tw.color('text-purple-600')}
      barStyle={[tw`bg-white`,{height:70}]}
    >
      <Tab.Screen 
        name="Profile" 
        component={Profile} 
        initialParams={{ username: username }}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={Search} 
        initialParams={{fileId:''}}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen 
        name="Favourites" 
        component={Favourites} 
        options={{
          tabBarLabel: 'Favourites',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="heart" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tablayout;
