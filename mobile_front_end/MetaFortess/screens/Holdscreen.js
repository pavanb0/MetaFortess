import React, { useLayoutEffect,useState } from 'react';
import { View, Text, TouchableOpacity, Vibration, ToastAndroid } from 'react-native';
import { ActivityIndicator, Button, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCodeModal from './QRCodeModal';
import { Modal, Portal, PaperProvider } from 'react-native-paper';








function Holdscreen({ navigation }) {
    const [ip, setip] = React.useState("");
    const [submit, setSubmit] = React.useState(false);
    const [qr, setqr] = React.useState(false);
  

    const handleipsave = () => {
        setSubmit(true);
        if (ip.length === 0) {
            ToastAndroid.show("Please enter a valid Ip", ToastAndroid.SHORT);
            Vibration.vibrate();
            setSubmit(false);
            return
        }
        axios.get(`http://${ip}:3030/auth`)
            .then(async (res) => {
                await AsyncStorage.setItem("ip", ip);
                await AsyncStorage.setItem("osname", res.data.osname);
                ToastAndroid.show(`Connected to server ${res.data.osname}`, ToastAndroid.SHORT);
                navigation.navigate("Login");
                setSubmit(false);

            }
            )
            .catch((err) => {
                ToastAndroid.show("Please enter a valid Ip", ToastAndroid.SHORT);
                Vibration.vibrate();
                setSubmit(false);
            }
            )
    }
    async function checkip()
    {const sysip = await AsyncStorage.getItem("ip");
    if (sysip !== null){
    axios.get(`http://${sysip}:3030/auth`)
        .then((res) => {
            navigation.navigate("Login");
            ToastAndroid.show(`Connected to server ${res.data.osname}`, ToastAndroid.SHORT);
        }
        )
    }
    }
    useLayoutEffect(() => {
        checkip();
    }, [])

    



    return (
        <>
        
        {qr ? (<>
            <View 
            style={{
                flex: 1,
                backgroundColor: '#dcebde',
                alignItems: 'center',
                justifyContent: 'center',
            }}>

                <QRCodeScanner
                    onRead={(e) => {
                        setip(e.data);
                        setqr(false);
                    }}
                    showMarker={true}
                    reactivate={true}
                    reactivateTimeout={5000}
                    markerStyle={{ borderColor: "#1976d2", borderRadius: 10 }}
                    // cameraStyle={{ height: "80%", width: "80%", borderRadius: 10, overflow: "hidden" }}
                />

                <Button
                    style={{
                        backgroundColor: "#dcebde",
                        borderColor: "#1976d2",
                        borderWidth: 2,
                        borderRadius: 5,
                        width: "80%",
                        marginBottom: 20,
                    }}
                    mode="outlined"
                    onPress={() => {
                        setqr(!qr);
                    }}
                >
                    <Text style={{ color: "#1976d2" }}>Cancel</Text>
                </Button>


            </View>
        
        </>):(
        <>
        <View style={{
            flex: 1,
            backgroundColor: '#dcebde',
            alignItems: 'center',
            justifyContent: 'center',

        }}>


            <Text style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "#1976d2",
                textAlign: "center",
                marginTop: 5,
                marginBottom: 5
            }}> enter your server ip or scan Qr code</Text>
        <View
        style={{
            flexDirection: "row",
            width:'80%',
            justifyContent: "space-between",
            alignItems: "center",
            
        }}
        >
         
            
            <TextInput
                style={{ backgroundColor: '#dcebde', width: "85%", }}

                label={"Enter Your server IP"}
                outlineColor="#1c1e1d"
                activeOutlineColor="#1976d2"
                mode="outlined"
                keyboardType="default"
                value={ip}
                onChangeText={(ip) => {
                    setip(ip);
                }}
            />
            <TouchableOpacity
                style={{
                    backgroundColor: "#dcebde",
                    borderColor: "#1976d2",
            
                }}
                onPress={
                  ()=>{setqr(!qr)}
                }
            >
  
                <Icon name="qr-code-scanner" size={45} color="#1976d2" />
           
            </TouchableOpacity>
        </View> 
            <TouchableOpacity
                style={{
                    backgroundColor: "#dcebde",
                    padding: 10,
                    borderColor: "#1976d2",
                    borderWidth: 1,
                    borderRadius: 4,
                    marginTop: 10,
                    width: "80%",
                    marginBottom: 10,

                }}
                onPress={handleipsave}

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
            >Next </Text>
            </TouchableOpacity>

        </View>
        </>
        )
        }
        
        </>

    )
}
export default Holdscreen;        