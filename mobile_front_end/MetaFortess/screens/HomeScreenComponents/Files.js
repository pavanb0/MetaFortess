import React,{useState,useEffect} from "react";
import { View, Text, StyleSheet,Linking, Dimensions, Alert, ToastAndroid } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'
import { FlatList } from "react-native-gesture-handler";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicos from 'react-native-vector-icons/Ionicons';


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

const RenderView = ({title,src,size}) => (
    <View style={styles.item}>
        {/* <WebView source={{ uri: src }} style={{ height: 200, width: windowWidth }} /> */}
        <Text style={styles.title}>{title}</Text>
        <View style={styles.RenderViewBottomBar} > 
            <Ionicos onPress={
                () => {
                    Linking.openURL(src)
                }    
            }
            name = 'cloud-download-outline' size={30} color='#fff' />
            <AntDesign
            onPress={
                async () => {
                    const ip = await getIp()
                    const email = await getEmail()
                    const password = await getPassword()

                    const headers = { 'email': email, 'password': password, 'url': src }
                    axios.get(`http://${ip}:3030/delete`, { headers: headers })
                        .then((res) => {
                            ToastAndroid.showWithGravity(
                                "Deleted",
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER
                            );
                        }).catch((err) => {
                            ToastAndroid.showWithGravity(
                                "Error",
                                ToastAndroid.SHORT,
                                ToastAndroid.CENTER
                            );
                        }
                        )
                        

                }
            }
            name='delete' size={30} color='#fff' />
        </View>

  
    </View>
);
const windowWidth = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

function Files(props) {

    const [dataSource, setDataSource] = useState([]);
    async function getFiles() {
        try {
            const ip = await getIp()
            const email = await getEmail()
            const password = await getPassword()
            const url = `http://${ip}:3030/files`
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
        // console.log(dataSource)
        const interval = setInterval(() => {
        fetchfiles()
        }, 1000*10);
        return () => clearInterval(interval);
    }, [])


    return (
        <GestureHandlerRootView>
            <FlatList
                data={dataSource}
                renderItem={({ item }) => <RenderView title={item.title} src={item.src} size={item.size} />}
            />
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({
    item:{
         backgroundColor: '#aeaeae',
         padding: 20,
         marginVertical: 8,
         borderRadius: 10,
         // height: 200,
         width: windowWidth,
 
    },
     title:{
         fontSize: 15,
         padding: 4,
         // marginVertical: 8,
         color: '#3e8acb'
     },
     RenderViewBottomBar:{
         flexDirection: 'row',
         justifyContent: 'space-around',
         alignItems: 'center',
         marginTop: 10,
         borderRadius: 10,
         height: 50,
         width: windowWidth*0.9,
         backgroundColor: '#526d82',
     }
 
 
 })
export default Files;