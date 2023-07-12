import React, { useState } from 'react';
// import css file
import './login.css';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Autocomplete } from '@mui/material';
import Button from '@mui/material/Button';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    return (
     
            <div style={{ display: 'flex',
             justifyContent: 'center',
              alignItems: 'center', 
              height: '100vh',
            backgroundColor: 'rgb(40, 40, 34, 0.2)',
            // backgroundImage: 'linear-gradient(180deg, #581845, #900C3F, #C70039, #FF5733, #FFC300)'
             width: '100vw', 
             marginTop: '0px',
            }}>
                <div style={{ display: 'flex', flexDirection: 'column',
                marginTop: '-100px'
                , gap: '16px' }}>
                    <h1 style={{ color: 'white' }}>Login To Metafortess</h1>
                    <TextField id="email" label="Enter Email" variant="outlined" type="email" style={{width:'450px'}} />
                    <TextField id="password" label="password" variant="outlined" type="password"  style={{width:'450px'}}/>
                    <Button variant="outlined" style={{width:"450px"}}>Login</Button>
                    <p > don't have an account? <a href="/signup">Sign Up</a> </p>
                    </div>
            </div>


           



    );
}

export default Login;