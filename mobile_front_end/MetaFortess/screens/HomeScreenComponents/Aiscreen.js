import React, { useState, useEffect } from 'react';
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicon from 'react-native-vector-icons/Ionicons';
// import ToastAndroid from 'react-native';
import { ToastAndroid } from 'react-native';
// import all the components we are going to use
// MaterialCommunityIcons
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    Modal,
    Vibration,
} from 'react-native';

//import FastImage
import FastImage from 'react-native-fast-image';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

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

const deletephoto = async (url) => {
    try {

        const ip = await getIp()
        const email = await getEmail()
        const password = await getPassword()
        const headers = { 'email': email, 'password': password, 'url': url }
        const site = `http://${ip}:3030/delete`
        axios.get(site, { headers: headers })
            .then((res) => {
                showModalFunction(!modalVisibleStatus, '');

                ToastAndroid.showWithGravity(
                    "Deleted",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                );

                Vibration.vibrate({ pattern: [100, 200, 300], duration: 1000 })
            }).catch((err) => {
                console.log(err)
                // what are the arguments for vibrate?
                // vibrate(pattern, repeat)
                // pattern: array of numbers
                // repeat: boolean
                // if repeat is true, it will loop the pattern
                // if repeat is false, it will only vibrate once
                // if repeat is not defined, it will loop the pattern
                // if pattern is not defined, it will vibrate for 400ms

            })


    } catch (e) {
        console.log(e)
    }

}

// const [imageurl,setimageurl] = useState([])




async function getPhotos() {
    try {
        const ip = await getIp();

        const email = await getEmail();
        const password = await getPassword();
        const url = `http://${ip}:3030/aifiles`;
        const headers = { 'email': email, 'password': password };
        const response = await axios.get(url, { headers: headers });
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Request failed with status code:', response.status);
        }
    } catch (e) {
        console.error('An error occurred:', e);
    }
}


function Aiscreen({ Search }) {

    // const [searchquerry, setsearchquerry] = useState('good morning')
    
    // setsearchquerry(String(Search))

    // const [imageuri, setImageuri] = useState([]);
    const [dataSource, setDataSource] = useState([]);

    const [modalVisibleStatus, setModalVisibleStatus] = useState(false);    
    const [imageuri, setImageuri] = useState('');



    const showModalFunction = (visible, imageURL) => {
        //handler to handle the click on image of Grid
        //and close button on modal
        setImageuri(imageURL);
        console.log(imageURL)
        setModalVisibleStatus(visible);
      };
    

    useEffect(() => {
        const intervalid = setInterval(() => {
            const getEmailAndIP = async () => {
                const email = await AsyncStorage.getItem('email');
                const ip = await AsyncStorage.getItem('ip'); // Get the IP address

                return { email, ip };
            };

            getEmailAndIP().then(({ email, ip }) => {
                const placeholder = [];
                getPhotos().then((res) => {
                    for (let i = 0; i < res.length; i++) {
                        if (String(res[i].path).includes(email)) {
                            if (String(res[i].text).toLowerCase().includes(Search.toLowerCase())) 
                            {  
                                const path = String(res[i].path).split('\\');
                                const url = `http://${ip}:3030/${email}/images/${path.slice(-1)[0]}`;
                                placeholder.push({ id:i, src: url });
                            }
                        }
                    }
                }).then(() => {
                    setDataSource(placeholder);
                });
            });
        }, 1000 * 2);

        return () => clearInterval(intervalid);
    }, []);

    

    return (
        <SafeAreaView style={styles.container}>
        {modalVisibleStatus ? (
          <Modal
            transparent={false}
            animationType={'fade'}
            visible={modalVisibleStatus}
            onRequestClose={() => {
              showModalFunction(!modalVisibleStatus, '');
            }}>
            <View style={styles.modelStyle}>
              <FastImage
                style={styles.fullImageStyle}
                source={{uri: imageuri}}
                resizeMode={
                  FastImage.resizeMode.contain
                }
              />
              <TouchableOpacity
              activeOpacity={0.5}
              onPress={async ()=>{
                await deletephoto(imageuri)
                setModalVisibleStatus(false)
  
              }}
              style={styles.closeButtonStyle}
                >
                    <View style={{
                  width: 50,
                  height: 50,
                }}>
  
                   <MaterialCommunityIcons name='delete-outline' size={50} color="#4F8EF7" />
                </View>
          
  
                </TouchableOpacity>
  
              <TouchableOpacity
                activeOpacity={0.5}
                style={styles.deleteButtonStyle}
                onPress={() => {
                  showModalFunction(!modalVisibleStatus, '');
                }}>
                <View style={{
                  width: 50,
                  height: 50,
                }}>
          
                <Ionicon name='close-circle-outline' size={50} color="#4F8EF7" />
                   
                </View>
              </TouchableOpacity>
            </View>
          </Modal>
        ) : (
          <View style={styles.container}>
    
            <FlatList
              data={dataSource}
              renderItem={({item}) => (
                <View style={styles.imageContainerStyle}>
                  <TouchableOpacity
                    key={item.id}
                    style={{flex: 1}}
                    onPress={() => {
                      showModalFunction(true, item.src);
                    }}>
                    <FastImage
                      style={styles.imageStyle}
                      source={{
                        uri: item.src,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              )}
              //Setting the number of column
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </SafeAreaView>

    )



}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    titleStyle: {
        padding: 16,
        fontSize: 20,
        color: 'white',
        backgroundColor: 'green',
    },
    imageContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        margin: 1,
    },
    imageStyle: {
        height: 120,
        width: '100%',
    },
    fullImageStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '98%',
        resizeMode: 'contain',
    },
    modelStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    deleteButtonStyle: {
        width: 30,
        height: 30,
        top: 50,
        right: 40,
        position: 'absolute',
    },
    closeButtonStyle: {
        width: 30,
        height: 30,
        top: 50,
        left: 40,
        position: 'absolute',
    },
});


export default Aiscreen;