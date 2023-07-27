import React from "react";
import { Text, ToastAndroid } from "react-native";
import { Button } from "react-native";
import { View } from "react-native";
// import Button from "@mui/material/Button"
function Signup({
  navigation
}) {
  
  return (
    <View>
      <Text>Signup</Text>
      <Button
      title="Go to HmoWindow"
      onPress={
        
          ()=>{
            navigation.navigate('IpWindow')
          }
        
      }
      />
    </View>
  )
}
export default Signup;