
import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage";
import FastImage from 'react-native-fast-image';
import axios from 'axios';


const Photos = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  const [imageuri, setImageuri] = useState('');
  const [
    modalVisibleStatus, setModalVisibleStatus
  ] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const [photos, setPhotos] = useState([]);
  const [ip, setIp] = useState("");
  

//   const getIp = async () => {
//       const ip = await AsyncStorage.getItem("ip");
//       setIp(ip);
//   };
//   const getheads = async () => {
//       const email = await AsyncStorage.getItem("email");
//       const password = await AsyncStorage.getItem("password");
//         setEmail(email);
//         setPassword(password);
//   };

//     const getPhotos = async () => {

//         const head = { 'email': email, 'password': password }
//             if (ip == null || head.email == null || head.password == null) {
//                 alert("Please Enter IP Address")
//             }
            
//             axios.get(`http://${ip}:3030/images`, { headers: head })
//                 .then((res) => {
//                     setPhotos(res.data)
//                     console.log(res.data)
                
//                 })
//                 .catch((err) => {
//                     console.log(err)
//                 }
//                 )
//     }
//     useEffect(async () => {
        
//         getIp();    
//         getheads();
//         getPhotos();
//     }, [])
    // console.log(photos)
  


    // response
//    const response = [{"height": 482, "src": "http://192.168.0.104:3030/google@google.com/images/Screenshot 2023-03-02 081134 - Copy.png", "width": 841},
//      {"height": 255, "src": "http://192.168.0.104:3030/google@google.com/images/Screenshot 2023-03-05 224350.png", "width": 339}]
//    const coderesponse =[{"id": 0, "src": "https://unsplash.it/400/400?image=1"}, {"id": 1, "src": "https://unsplash.it/400/400?image=2"}, {"id": 2, "src": "https://unsplash.it/400/400?image=3"}]

  useEffect(async () => {
    const ip = await AsyncStorage.getItem("ip");
    const email = await AsyncStorage.getItem("email");
    const password = await AsyncStorage.getItem("password");
    const head = { 'email': email, 'password': password }
    axios.get(`http://${ip}:3030/images`, { headers: head })
    .then((res) => {
        setPhotos(res.data)
        console.log(res.data)
    })
    
    let items = Array.apply(null, photos.length).map((v, i) => {
      return {
        id: i,
        src: photos[i].src,
      };
    });
    setDataSource(items);
  }, []);

    // useEffect(()=>{
    //     let items = Array.apply(null,Array(photos.length)).map((v,i)=>{
    //         return {
    //             id: i,
    //             src: photos[i].src
    //         }
    //     })
    //     setPhotos(items);
    //     // setDataSource(items);
    // },[])



  console.log(photos);

  const showModalFunction = (visible, imageURL) => {
    //handler to handle the click on image of Grid
    //and close button on modal
    setImageuri(imageURL);
    setModalVisibleStatus(visible);
  };

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
              style={styles.closeButtonStyle}
              onPress={() => {
                showModalFunction(!modalVisibleStatus, '');
              }}>
              <FastImage
                source={{
                  uri:
                    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/close.png',
                }}
                style={{width: 35, height: 35}}
              />
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
  );
};
export default Photos;

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
  closeButtonStyle: {
    width: 25,
    height: 25,
    top: 50,
    right: 20,
    position: 'absolute',
  },
});

{/**    

  const [photos, setPhotos] = useState([]);
    const [ip, setIp] = useState("");
    const head ={} 

    const getIp = async () => {
        const ip = await AsyncStorage.getItem("ip");
        setIp(ip);
    };
    const getheads = async () => {
        const email = await AsyncStorage.getItem("email");
        const password = await AsyncStorage.getItem("password");
        head.email = email;
        head.password = password;
    };


    useEffect(async () => {
        await getIp();
        await getheads();
        async function getPhotos() {
            try {
                const response = await axios.get(`http://${ip}:3030/photos`, { headers: head });
                setPhotos(response.data);
            } catch (e) {
                console.log(e);
            }
        }
        getPhotos();
        // REFRESH EVERY 5 SECONDS
        setInterval(() => {
            getPhotos();
        }
        , 5000);
        return () => clearInterval(interval);



    }, [])

*/}