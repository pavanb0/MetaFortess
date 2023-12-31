import React from "react";
import Signup from "./screens/Signup";
import IpWindow from "./screens/IpWindow";
import Login from "./screens/Login";
import Holdscreen from "./screens/Holdscreen";
import HomeScreen from "./screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack= createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Holdscreen"
        options={{headerShown:false}}
        component={Holdscreen} />
        <Stack.Screen name="Login"
        options={{headerShown:false}}
        component={Login} />
        <Stack.Screen name="Signup"
        options={{headerShown:false}}
        component={Signup} />
        <Stack.Screen name="IpWindow"
        options={{headerShown:false}}
        component={IpWindow} />
        <Stack.Screen name="HomeScreen"
        options={{headerShown:false}}
        component={HomeScreen} />

      </Stack.Navigator>
    </NavigationContainer>

  )
}
