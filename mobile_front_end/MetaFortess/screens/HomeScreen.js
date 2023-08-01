import React from 'react';
import { View, Text,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-ionicons'
import { Ionicons } from '@expo/vector-icons';

const style = StyleSheet.create({   
   
});
const Tab = createBottomTabNavigator();
function HomeScreen({navigation}) {
  return (
    <View style={{ backgroundColor:"#434553",flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>HomeScreen!</Text>
        <Ionicons name="ios-checkmark-circle" size={32} color="green" />
    </View>
  );
}
export default HomeScreen;