import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PrimarySearchAppBar from './PrimarySearchAppBar';
const localip = require('../localip');
const ip = localip.sysip;
const sessions = require('./sessions');



function Gallery() {
  if(sessions.email === '' || sessions.password === ''){
    window.location.href = '/login';
  }



  const headers = { 
    'email':sessions.email,
    'password':sessions.password,
  }
  const [userName, setUserName] = useState('');
  useEffect(() => {
    console.log(headers);
    axios.get(`http://${ip}:3030/gallary`,{headers} )
      .then((res) => {
        console.log(res);
        setUserName(res.data.name);
        sessions.user = res.data.name;
      }
      ).catch((err) => {
        console.log(err);
        
  });
  });


  return (
    <>
    <PrimarySearchAppBar/>
   
    </>

    );
}

export default Gallery;
