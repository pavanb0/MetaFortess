import React,{useLayoutEffect} from 'react';
import { View, Text,TouchableOpacity,Vibration ,ToastAndroid} from 'react-native';
import { Button,TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



function Holdscreen({navigation})
{
    const [iperror, setIperror] = React.useState(false);
    const [ip, setIp] = React.useState("");
    const [connected, setConnected] = React.useState(false);
    const [hostname, setHostname] = React.useState("");
    
    const handleipsave = () => {
       console.log(ip);
    }
    
    
    useLayoutEffect(() => {
        const getip = async () => {
          try {
            const ip = await AsyncStorage.getItem('ip');
            if(ip !== null) {
              setIp(ip);
                axios.get(`http://${ip}:3030/`)
                .then((res) => {
                    if(res.status === 200)
                    {
                        setConnected(true);
                        setHostname(res.data.osname)
                    }
                })
            }
            else {
              setIperror(true);
            }
          } catch(e) {
            console.log(e);
          }
        }
        getip();
    
    
      },[]);
  
    return(
        <View style={{
            flex: 1,
            backgroundColor: '#dcebde',
            alignItems: 'center',
            justifyContent: 'center',

        }}>
            {iperror ? <>
                      <TextInput
                      style={{backgroundColor: '#dcebde',width: "80%",}}
                     
                      label={"Enter Your server IP"}
                      outlineColor="#1c1e1d"
                      activeOutlineColor="#1976d2"
                      mode="outlined"
                      keyboardType="default"
                        value={ip}
                        onChangeText={(ip) => {
                            setIp(ip);
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
                    onPress={handleipsave}
          
                  >
                      <Text
                      style={{
                        color: "#1988d5",
                        textAlign: "center",
                        fontSize: 15,
                      }}
                      >Next </Text>
                  </TouchableOpacity> 
                  </>
            : null}
        </View>

    )
}
export default Holdscreen;        