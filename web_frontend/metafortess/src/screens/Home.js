import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
//   const [ipAddress, setIPAddress] = useState('');

//   useEffect(() => {
//     // Fetch the local IP address
//     const localIP = getLocalIP();
//     setIPAddress(localIP);
//   }, []);

//   // Get the current port number of the React app from window.location
//   const port = window.location.port;

//   return (
//     <div>
//       <h1>Connetct to react app </h1>
//       <p>Scan the QR code below to access the React app:</p>
//       <QRCode value={`http://${ipAddress}:${port}`} />
//     </div>
//   );
return(
    <div>
        <h1>hello</h1>
        login
        <Link to="/login">Login</Link>
        </div>
)
};

export default Home;
