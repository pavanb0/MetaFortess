
import React,{useLayoutEffect} from "react";
import {  ToastAndroid } from "react-native";
import { ActivityIndicator, Button } from "react-native-paper";
import { View,Vibration } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { TextInput,Text } from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";


// import Button from "@mui/material/Button"
const styles = StyleSheet.create({
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
    marginTop:200
    
  },
});
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function Login({
  navigation
}) {
  const [ip, setIp] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  const [submit, setSubmit] = React.useState(false);


  const handleLogin = async () => {
    if (email === '' || password === '') {
      ToastAndroid.show("Please fill all the fields", ToastAndroid.SHORT);
      Vibration.vibrate(100);
      return;
    }
    if (!emailRegex.test(email)) {
      ToastAndroid.show("Please enter a valid email", ToastAndroid.SHORT);
      Vibration.vibrate(100);
      return;
    }
    setSubmit(true);
    try {
      axios.post(`http://${ip}:3030/login`, {email, password})
      .then(async (res) => {
        if(res.data.message === "User logged in successfully"){ 
          ToastAndroid.show("Logged in successfully", ToastAndroid.SHORT);
          await AsyncStorage.setItem("email", email);
          await AsyncStorage.setItem("password", password);
          navigation.replace("HomeScreen");

        }})
      .catch((err) => {
        console.log(err);
        ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
      });

    } catch (error) {
      console.log(error);
      ToastAndroid.show("Something went wrong", ToastAndroid.SHORT);
    }

  }
  
  
  useLayoutEffect(() => {
    async function getIp() {
    const ip = await AsyncStorage.getItem("ip");
    if (ip) {
      setIp(ip);
    }}

    async function getCredentials() {
      const email = await AsyncStorage.getItem("email");
      const password = await AsyncStorage.getItem("password");
      if (email && password) {
        setEmail(email);
        setPassword(password);
        handleLogin;
      }
    }
    getIp();
    getCredentials();
  },[]);
  



  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.Text}>Login To Metafortess</Text>

        <View style={{ width: "80%", display: 'flex', flexDirection: 'column', }}>
    
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
        onPress ={handleLogin}

        >
          <ActivityIndicator 
          style={{ display: submit ? "flex" : "none" }}
          animating={submit} color="#1976d2" />

            <Text
            style={{
              color: "#1988d5",
              textAlign: "center",
              fontSize: 15,
              display: submit ? "none" : "flex"
            }}
            >Login </Text>
        </TouchableOpacity> 

        </View>
        <TouchableOpacity
        onPress={
            () => {
                navigation.navigate("Signup");}}>
          <Text
            style={{
              color: "#1976d2",
            }} >
            Dont't have an account? Signup
          </Text>

        </TouchableOpacity>
        <TouchableOpacity
        onPress={
            () => {
              //  TODO
              }}>
          <Text
            style={{
              color: "#1976d2",
            }} >
            Forgot Password?
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
export default Login;