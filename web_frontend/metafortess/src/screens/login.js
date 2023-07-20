import React, { useState} from 'react';
// import css file
import './login.css';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
const localip = require('../localip')


function Login() {
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [loginerror, setloginerror] = useState(false);
    const display = loginerror ? 'block' : 'none';
    const history = useNavigate();

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        if (email.trim() === '' || password.trim() === '') {
            alert('Please fill all the fields');
            return;
        }
        axios.post(`http://${localip.sysip}:3030/login`, { email, password })
            .then((res) => {
                console.log(res.data);
                // alert(res.data.message);
                // localStorage.setItem('token', res.data.token);
                history('/gallary');
            }
            ).catch((err) => {
                console.log(err);
                
                setloginerror(true);
                setTimeout(() => {
                    setloginerror(false);
                }
                    , 3000)

            }
            )   
    };
    return (

        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundColor: 'rgb(0, 150, 24, 0.1)',
            // backgroundImage: 'linear-gradient(180deg, #581845, #900C3F, #C70039, #FF5733, #FFC300)'
            width: '100vw',
            marginTop: '0px',
            flexDirection: 'column',
            gap: '80px',

            }}>
            <div>
                {/* <img src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png" alt="avatar" style={{ width: '100px', height: '100px' }} /> */}
                <h1 style={{display:display}}> Error in login </h1>
            </div>

            <form onSubmit={handleLoginSubmit}>
                <div style={{
                    display: 'flex', flexDirection: 'column',
                    marginTop: '-100px'
                    , gap: '16px'
                }}>
                    <h1 style={{ color: '#1976d2' }}>Login To Metafortess</h1>
                    <TextField id="email" label="Enter Email" variant="outlined" type="email" style={{ width: '450px' }} value={email} onChange={(e) => { setemail(e.target.value) }} />
                    <TextField id="password" label="password" variant="outlined" type="password" value={password} style={{ width: '450px' }} onChange={(e) => { setPassword(e.target.value) }} />
                    <Button type='submit' variant="outlined" style={{ width: "450px" }}>Login</Button>
                    
                    <div >
                    <p style={{margin:'6px'}} > <Link to='/forgotpass'> Forgot password?</Link> </p>
                    <p style={{margin:'6px'}}> don't have an account?  <Link to='/signup'> Sign up</Link> </p>
                    </div>
                </div>
            </form>
        </div>

    );
}

export default Login;