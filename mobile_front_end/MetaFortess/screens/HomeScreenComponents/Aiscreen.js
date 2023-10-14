
import React,{useState} from 'react'
import { View, Text , StyleSheet} from 'react-native'
import { Searchbar } from 'react-native-paper';
import AsyncStorage from "@react-native-async-storage/async-storage";

const getIp = async () => {
    const ip = await AsyncStorage.getItem('ip')
    return ip
}
const getEmail = async () => {
    const email = await AsyncStorage.getItem('email')
    return email
}
const getPassword = async () => {
    const password = await AsyncStorage.getItem('password')
    return password
}


function Aiscreen({Search}) {
    console.log(Search)

    return (
    <>
    <View style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        height:"100%",
    }} >
        <Text style ={{color:"red"}}>bI {Search}</Text>
        </View>
    </>
)

}
   
export default Aiscreen;