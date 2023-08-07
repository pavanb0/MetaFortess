import React,{useState,useEffect} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'

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
// // window height
// const windowHeight = Dimensions.get('window').height;
// // window width
// const windowWidth = Dimensions.get('window').width;




function Files(props) {

    const [dataSource, setDataSource] = useState([]);
    async function getFiles() {
        try {
            const ip = await getIp()
            const email = await getEmail()
            const password = await getPassword()
            const url = `http://${ip}:3030/videos`
            const headers = { 'email': email, 'password': password }
            axios.get(url, { headers: headers })
                .then((res) => {
                    
                    let items = Array.apply(null, Array(res.data.length)).map((v, i) => {
                        return { id: i, src: res.data[i].src, size: res.data[i].size, title: res.data[i].filename };
                    });
                    setDataSource(items);
                })


        } catch (e) {
            console.log(e)
        }
    
    }
    useEffect( () => {
        async function fetchfiles() {
        await getFiles()
        }
        fetchfiles()
        
    }, [])


    return (
        <View>
            <Text style={{
                color: '#aeaeae',
            }} >{JSON.stringify(dataSource)}</Text>
        </View>
    )
}
export default Files;