import React, { useEffect, useState } from 'react';
import axios from 'axios';
const localip = require('../localip');
const ip = localip.sysip;

function Gallery() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Make the API call to get the user's data
    axios
      .get(`http://${ip}:3030/gallary`, { withCredentials: true }) // Make sure to include withCredentials to send the cookies
      .then((res) => {
        // Assuming the backend returns the user's name as part of the response data
        setUserName(res.data.name);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>Hello {userName}</h1>
    </div>
  );
}

export default Gallery;
