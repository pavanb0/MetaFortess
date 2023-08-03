import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const style = StyleSheet.create({
    mainContainer:{
        display:"flex",
        flexDirection:"column",
        justifyContent:'flex-start',
        alignItems:"center",
        padding:10,
        backgroundColor:"#f1e4d8",
        width:"100%",
        height:"100%"

    },
    usercontainer:{
        height:'45%',
        backgroundColor:"#f48225",
        width:"100%",
        display:"flex",
        flexDirection:"column",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        marginBottom:10,
        zIndex:2
    },
    logout:{
        // align left
        position:"absolute",
        top:0,
        left:width/2-25 ,
        
        borderColor:"#4F8EF7",
        borderRadius:50,
        backgroundColor:"#f1e4d8",
        padding:5,
        zIndex:0

    }

})

function Account(props) {
    return (
        <View style={style.mainContainer}>
            <View style={style.usercontainer}>
            <TouchableOpacity
            style={style.logout}
            >
            <Ionicons name='log-out-outline' size={50} color="#4F8EF7" />
            </TouchableOpacity>
            <SimpleLineIcons name="user" size={50} color="#4F8EF7" />
                <Text>Username</Text>
                <Text>email</Text>
            </View>
            <View>
                <MaterialIcons name="storage" size={50} color="#4F8EF7" />

            </View>
        </View>
    )
}
export default Account;