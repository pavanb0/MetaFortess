import React,{useLayoutEffect} from "react";
import {  ToastAndroid } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { View,Vibration ,Image,Appearance} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { TextInput,Text,Banner } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

// import Button from "@mui/material/Button"
const styles = StyleSheet.create({
  upperwindow:{
    backgroundColor: '#dcebde',
    
   
  },

  container: {
    flex: 1,
    backgroundColor: '#dcebde',
    alignItems: 'center',
    // justifyContent: 'center',
   
  },
  input: {
    marginTop: 3,
    marginBottom: 3,
    backgroundColor: '#dcebde',
  },
  Text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#1976d2",
    textAlign: "center",
    marginTop:150
    
  },
});
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function Signup({navigation})
{
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [submit, setSubmit] = React.useState(false);
  async function getip(){
    const ip = await AsyncStorage.getItem("ip");
    return ip;
  }


  const handleSignup = async () => {
    setSubmit(true);
    if(!emailRegex.test(email) || email.length === 0 || password.length === 0 || name.length === 0){
      ToastAndroid.show("Please enter a valid data", ToastAndroid.SHORT);
      Vibration.vibrate();
      setTimeout(() => {
      setSubmit(false);
      }, 1000);
      return;
    }
    const ip = await getip();
    // console.log(name,email,password)
    axios.post(`http://${ip}:3030/signup`, {name,email,password})
    .then(async (res)=>{

        AsyncStorage.setItem("email", email);
        AsyncStorage.setItem("password", password);
        ToastAndroid.show("Signup successful", ToastAndroid.SHORT);
        navigation.navigate("Login");

        Vibration.vibrate();

        setSubmit(false);
    })
    .catch((err)=>{
      console.log(err);
      if (err.response.status === 409) {
        ToastAndroid.show("Email already exists", ToastAndroid.SHORT);
        Vibration.vibrate();
        setSubmit(false);
      }
      if (err.response.status === 500) {
        ToastAndroid.show("Server error", ToastAndroid.SHORT);
        Vibration.vibrate();
        setSubmit(false);
      }else{
      ToastAndroid.show("Signup failed", ToastAndroid.SHORT);
      Vibration.vibrate();
      setSubmit(false);
  }})




  }
  




  return (
    <GestureHandlerRootView style={{ flex: 1 }}>


      
      <View style={styles.container}>
        <Text style={styles.Text}>Signup To Metafortess</Text>

        <View style={{ width: "80%", display: 'flex', flexDirection: 'column', }}>
          <TextInput
            style={styles.input}
            label={"Enter Your Name"}
            disabled={submit}
            textColor="#1c1e1d"
            mode="outlined"
            outlineColor="#1c1e1d"
            activeOutlineColor="#1976d2"
            
            value={name}
            onChangeText={(text) => {
              setName(text);
            }}
          />
          <TextInput
            style={styles.input}
            label={"Enter Your Email"}
            disabled={submit}
            mode="outlined"
            outlineColor="#1c1e1d"
            // make it initialy false
            error={!emailRegex.test(email) && email.length > 0}
            activeOutlineColor="#1976d2"
            value={email}
            onChangeText={(email) => {
             
              setEmail(email);
            }}
          />
          <TextInput
            style={styles.input}
            disabled={submit}
            label={"Enter Your Password"}
            outlineColor="#1c1e1d"
            activeOutlineColor="#1976d2"
            mode="outlined"
            keyboardType="default"
            secureTextEntry={true}
            value={password}
            onChangeText={(password) => {
              setPassword(password);
            }}
          />
        <TouchableOpacity
        style={{
          backgroundColor: "#dcebde",
          padding: 10,
          borderColor: "#1976d2",
          borderWidth: 1,
          borderRadius: 4,
          marginTop: 10,
          marginBottom: 10,

        }}
       disabled={submit}
        onPress={handleSignup}
        >
          <ActivityIndicator
          style={{
            display: submit ? "flex" : "none",
          }}
          animating={submit} color="#1976d2" />
            <Text
            style={{
              color: "#1988d5",
              textAlign: "center",
              fontSize: 15,
              display: submit ? "none" : "flex",
            }}
            >Create account </Text>
        </TouchableOpacity> 

        </View>
        <TouchableOpacity
        onPress={
          () => {
            navigation.navigate("Login");
          }
        }
        >
          <Text
            style={{
              color: "#1976d2",
            }} >
            Already have an account? Login
          </Text>

        </TouchableOpacity>
        <TouchableOpacity
        onPress={
          async () => {
            await AsyncStorage.removeItem("ip");
            navigation.navigate("Holdscreen");
          }
        }

        >
          <Text
          style={{
            color: "#1976d2",
          }}
            >
            Change server?
          </Text>
        </TouchableOpacity>
        
      </View>

    </GestureHandlerRootView>

  )
}
export default Signup;