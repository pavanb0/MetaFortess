import React, { useLayoutEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Alert, Pressable, ToastAndroid } from "react-native";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { List } from "react-native-paper";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import {ProgressBar } from "react-native-paper";
import * as Progress from 'react-native-progress';
import DocumentPicker from 'react-native-document-picker';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const style = StyleSheet.create({
    mainContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'flex-start',
        alignItems: "center",
        padding: 10,
        backgroundColor: "#f1e4d8",
        width: "100%",
        height: "100%"

    },
    displaymodal:{
        
        display: "flex",
        position: "absolute",
        bottom: 0,

        
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#282822",
        borderRadius: 20,
        
        marginBottom: 42,
        opacity: 0.8
    },
    usercontainer: {
        height: '45%',

        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
        marginBottom: 10,
        zIndex: 2
    },
    logout: {
        // align left
        position: "absolute",
        top: 10,
        right: 10,

        borderColor: "#4F8EF7",
        borderRadius: 50,

        padding: 5,
        zIndex: 0

    },
    upload: {
        // align left
        position: "absolute",
        top: 10,
        left: 10,
        marginTop: 10,
        borderColor: "#4F8EF7",
        borderRadius: 50,

        padding: 5,
        zIndex: 0

    },
    

    user: {
        borderWidth: 2,
        border: "solid",
        borderColor: "#1976d2",
        borderRadius: 50,
        backgroundColor: '#282822',
        padding: 15,

        zIndex: 1

    },
    Listitem: {
        width: "100%",
        color: "#00009f"
    },

})

function Account(props) {
    const [useremail, setuseremail] = React.useState("")
    const [user, setuser] = React.useState("");
    const [freememory, setfreememory] = React.useState("");
    const [totalmemory, settotalmemory] = React.useState("");
    const [freesysstorage, setfreesysstorage] = React.useState("");
    const [totalsysstorage, settotalsysstorage] = React.useState("");
    const [totalphotos, settotalphotos] = React.useState("");
    const [totalvideos, settotalvideos] = React.useState("");
    const [totalfiles, settotalfiles] = React.useState("");
    const [modalVisible, setModalVisible] = React.useState(false);
    const [progress, setProgress] = React.useState(0.0);
    const [selectedFiles, setSelectedFiles] = React.useState([]);

    React.useEffect( () => {
        
        async function getStorage() {
        
            const useremail = await AsyncStorage.getItem("email")
            const password = await AsyncStorage.getItem("password")
            const ip = await AsyncStorage.getItem("ip")
            setuseremail(useremail)
            const headers = { 'email': useremail, 'password': password }

            try {
               
                axios.get(`http://${ip}:3030/gallary`, { headers: headers })
                    .then((res) => {
                        setuser(res.data.name)
                    })


                axios.get(`http://${ip}:3030/storage`, { headers: headers })
                    .then((res) => {
                        setfreememory(res.data.freememory)
                        settotalmemory(res.data.totalmemory)
                        setfreesysstorage(res.data.freesysstorage)
                        settotalsysstorage(res.data.totalsysstorage)
                        settotalphotos(res.data.totalphotos)
                        settotalvideos(res.data.totalvideos)
                        settotalfiles(res.data.totalfiles)

                    })

            } catch (e) {
                console.log(e)
            }
        }
    getStorage()
    let Timeout 
    Timeout = setTimeout(() => {
        getStorage()
    }, 1000*15);
    return () => {
        clearTimeout(Timeout)
    }
    
    
}, [])



    
    const handleUpload = async () => {
    // pick multiple files
        try {
            const results = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                allowMultiSelection: true,
            })
            setSelectedFiles(results);
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }
        //   console.log(selectedFiles)
    const handleServerUpload = async () => {
        try{
            const form = new FormData();
            selectedFiles.forEach((file) => {
                form.append("files", file);
            });
            let useremail = ""
            let password = ""
            let ip = ""
            let headers = {}

            async function getStorage() {    
            useremail = await AsyncStorage.getItem("email")
            password = await AsyncStorage.getItem("password")
            ip = await AsyncStorage.getItem("ip")
            headers = { 'email': useremail, 'password': password }
            }
            getStorage().then(async () => {
            const res = await axios.post(`http://${ip}:3030/upload`, form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'email': useremail,
                    'password': password
                },
                onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    let percent = Math.floor((loaded * 100) / total)
                    console.log(`${loaded}kb of ${total}kb | ${percent}%`)

                    if (percent < 100) {
                        setProgress(percent / 100)
                    }

                }
            }).catch((e) => {
                ToastAndroid.show("Internal Server Error", ToastAndroid.SHORT)
                setProgress(0.0)
                setModalVisible(false)
                setSelectedFiles([])
            })
            console.log(res.data)
            setProgress(0.0)
            setModalVisible(false)
            setSelectedFiles([])
            })

        }catch(e){
            console.log(e)
       

        }
    }




    return (
        <View style={style.mainContainer}>

            <View style={style.usercontainer}>
                <ImageBackground
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 20,
                        marginBottom: 10,
                        zIndex: 2
                    }}
                    source={require('./assets/tree-736885_640.jpg')}>
                    <TouchableOpacity
                        style={style.logout}
                        onPress={async () => {
                            await AsyncStorage.removeItem("email")
                            await AsyncStorage.removeItem("password")
                            props.navigation.navigate("Login")
                        }}
                    >
                        <Ionicons name='log-out-outline' size={50} color="#4F8EF7" />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={style.upload}
                        onPress={async () => {
                           await handleUpload()
                        } }
                    >
                        <Ionicons name='cloud-upload-outline' size={50} color="#4F8EF7" />
                    </TouchableOpacity>


                    <View style={style.user}>
                        <SimpleLineIcons name="user" size={50} color="#4F8EF7" />
                    </View>
                    <View style={{
                        width: "70%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#282822",
                        borderRadius: 20,
                        marginTop: 10,
                        opacity: 0.8
                    }}>
                        <Text style={{
                            fontSize: 20,
                            color: "#4F8EF7",
                        }}>Username: {user} </Text>
                        <Text style={{
                            fontSize: 20,
                            color: "#4F8EF7",
                        }}>Email: {useremail}</Text>
                    </View>

                    {modalVisible ? null :
                        <View style={{...style.displaymodal,padding:5}}>
                            <TouchableOpacity
                            onPress={ async() => {
                                if(selectedFiles.length<1){
                                    ToastAndroid.show("No files selected", ToastAndroid.SHORT)
                                }
                                else{
                                    setModalVisible(true)
                                    await handleServerUpload()
                                }
                            }}
                            >
                            <Text style={{
                                fontSize: 20,
                                color: "#4F8EF7",
                            }}>
                               {selectedFiles.length>0 ? ` ${selectedFiles.length} files selected click to upload`: `No files selected`}
                                
                            </Text>
                            </TouchableOpacity>
                        </View>
                    }


                    {modalVisible ?
                    <View style={style.displaymodal}>
                        <Text style={{
                            fontSize: 20,
                            color: "#4F8EF7",
                        }}>Uploaded... {Math.round(progress*100)}%</Text>
                        <Progress.Bar progress={progress} width={300}
                        

                        />

                    </View> 
                   : null }
          


                </ImageBackground>
            </View>

            <View>
                {/* <MaterialIcons name="storage" size={50} color="#4F8EF7" /> */}

                <List.Section style={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#282822",
                    borderRadius: 20,
                    // marginTop: 2,
                    // margin:10,
                    // marginBottom: 20,
                    opacity: 0.8
                }}>
                    <List.Subheader style={{ color: "#4F8EF7" }}>
                        <Text style={{ color: "#4F8EF7" }} >  Storage</Text>
                 
                    </List.Subheader>
                    <List.Item titleStyle={{ color: "#4F8EF7" }} title={`Total Server Ram: ${totalmemory}`} />
                    <List.Item titleStyle={{ color: "#4F8EF7" }} title={`Free Server Ram: ${freememory}`} />
                    <List.Item titleStyle={{ color: "#4F8EF7" }} title={`Total Server Storage: ${totalsysstorage}`} />
                    <List.Item titleStyle={{ color: "#4F8EF7" }} title={`Free Server Storage: ${freesysstorage}`} />
                    <List.Item titleStyle={{ color: "#4F8EF7" }} title={`Total Photos: ${totalphotos}`} />
                    <List.Item titleStyle={{ color: "#4F8EF7" }} title={`Total Videos: ${totalvideos}`} />
                    <List.Item titleStyle={{ color: "#4F8EF7" }} title={`Total Files: ${totalfiles}`} />
                </List.Section>


            </View>
        </View>
    )
}
export default Account;