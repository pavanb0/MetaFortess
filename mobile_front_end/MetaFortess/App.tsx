import React from "react";
import Signup from "./screens/Signup";
import IpWindow from "./screens/IpWindow";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack= createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="IpWindow" component={IpWindow} />
      </Stack.Navigator>
    </NavigationContainer>

  )
}
