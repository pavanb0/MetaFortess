// HomeScreen.js
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Text, View } from 'react-native-paper';
import React,{useState} from 'react';
import Files from './HomeScreenComponents/Files';
import Photos from './HomeScreenComponents/Photos';
import Videos from './HomeScreenComponents/Videos';
import Account from './HomeScreenComponents/Account';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Touchable,TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Vibration } from 'react-native';
import Aiscreen from './HomeScreenComponents/Aiscreen';
import AiscreenSearchBar from './HomeScreenComponents/AiscreenSearchBar';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const screenName = drawerOpen ? 'Photos' : 'Ai';
  const [searchQuery, setSearchQuery] = React.useState('');
  console.log(searchQuery)
  return (
    // <GestureHandlerRootView>
   
    <Tab.Navigator
      initialRouteName="Photos"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name= {screenName}
        component={ (drawerOpen) ? (Photos):(Aiscreen)}
        options={{
          tabBarLabel: screenName,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="image-outline" color={color} size={size} />
          ),
          headerLeft: () => (
            // <Button onPress={() => alert('This is a button!')}>Press me</Button>
            <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => setDrawerOpen(!drawerOpen)}
            >
              
              <Ionicons name='menu-outline' size={30} color="#4F8EF7" />
            </TouchableOpacity>
            ),
            headerRight: () => { 
              if(!drawerOpen)
              {
                return (
                  <AiscreenSearchBar 
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                  />
                )
              }
              else{
                return (
                  <></>
                )
              }

             }
        }}
      />
      <Tab.Screen
        name="Video"
        component={Videos}
        options={{
          tabBarLabel: 'Videos',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="video-outline" color={color} size={size} />
            ),
          }}
      />
      <Tab.Screen
        name="Files"
        component={Files}
        options={{
          tabBarLabel: 'Files',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-document-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
    
  );
}

export default HomeScreen;
