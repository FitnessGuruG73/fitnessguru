import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // or your preferred icon library
import Profile from './Profile';
import Search from './Search';
import Videos from './Videos';
import tw from 'twrnc'; // Import twrnc for Tailwind CSS classes

const Tab = createMaterialBottomTabNavigator();

const Tablayout = ({route}) => {
  const { username } = route.params; 
  console.log(username,"blah");
  
  return (
    <Tab.Navigator
      initialRouteName="Search"
      activeColor={tw.color('text-cyan-600')}
      inactiveColor={tw.color('text-black')}
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
        name="videos" 
        component={Videos} 
        options={{
          tabBarLabel: 'videos',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="video" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tablayout;
