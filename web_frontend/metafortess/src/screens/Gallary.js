import React, { useEffect, useState } from 'react';
import axios from 'axios';
const localip = require('../localip');
const ip = localip.sysip;
const sessions = require('./sessions');
function Gallery() {
  
  const headers = { 
    'email':sessions.email,
    'password':sessions.password,
  }
  const [userName, setUserName] = useState('');
  useEffect(() => {
    axios.get(`http://${ip}:3030/gallary`,{headers} )
      .then((res) => {
        console.log(res);
        setUserName(res.data.name);
      }
      ).catch((err) => {
        console.log(err);
        
  });
  },[]);


  return (
    <div>
      <h1>Hello {userName}</h1>
    </div>
  );
}

export default Gallery;
