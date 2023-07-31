import React from 'react';
import { Link } from 'react-router-dom';
import QRCode from 'react-qr-code';
const ip = require('../localip').sysip

const Home = () => {

return(
    <div 
    style={
        {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            backgroundColor: 'lightblue'
        }
    }
    >
        <h1>hello</h1>
        login
        <Link to="/login">Login</Link>
        {ip?(
            <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',

            }}
            >

                <h1>ip</h1>
                <h1>{ip}</h1>
                <QRCode value={ip} />
                

            </div>
        ):null}
    
    </div>
)
};

export default Home;
