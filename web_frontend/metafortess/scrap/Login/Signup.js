import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

function Signup() {
    const [name, setname] = useState(''); 
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    console.log(email);
    console.log(password);
    console.log(name);
    return (
     
            <div style={{ display: 'flex',
             justifyContent: 'center',
              alignItems: 'center', 
              height: '100vh',
            backgroundColor: 'rgb(0, 150, 24, 0.1)',
            // backgroundImage: 'linear-gradient(180deg, #581845, #900C3F, #C70039, #FF5733, #FFC300)'
             width: '100vw', 
             marginTop: '0px',
            }}>
                <div style={{ display: 'flex', flexDirection: 'column',
                marginTop: '-100px'
                , gap: '16px' }}>
                    <h1 style={{ color: '#1976d2' }}>Signup To Metafortess</h1>
                    <TextField id="name" label="Enter Name" variant="outlined" type="text" style={{width:'450px'}} value={name}onChange={(e)=>{setname(e.target.value)}}/>
                    <TextField id="email" label="Enter Email" variant="outlined" type="email" style={{width:'450px'}} value={email}onChange={(e)=>{setemail(e.target.value)}}/>
                    <TextField id="password" label="password" variant="outlined" type="password" value={password}  style={{width:'450px'}} onChange={(e)=>{setPassword(e.target.value)}}/>
                    <Button variant="outlined" style={{width:"450px"}}>Signup</Button>
                    <p > have an account? <a href="/Login">Login</a> </p>
                    </div>
            </div>

    );
}

export default Signup;