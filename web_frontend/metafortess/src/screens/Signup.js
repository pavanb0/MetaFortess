import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Signup() {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setPassword] = useState('');
    const [displaynone, setdisplaynone] = useState(false);
    const display = displaynone ? 'block' : 'none';

    const handleSignupSubmit = (e) => {
        // console.log("here")
        e.preventDefault();
        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            alert('Please fill all the fields');
            return;
        }
        axios.post('http://192.168.0.104:3030/signup', { name, email, password })
            .then((res) => {
                console.log(res.data);
                alert(res.data.message);
            }
            ).catch((err) => {
                if (err.response && err.response.status === 409) {
                  setdisplaynone(true);
                  setTimeout(() => {
                    setdisplaynone(false);
                  }, 3000);
                } else {
                  console.log(err);
                }
              });
            // .catch((err) => {
            //     // check for 409 error
            //     if (err.response.status === 409) {

            //         setdisplaynone(true);
            //         // make it false after 3 seconds
            //         setTimeout(() => {
            //             setdisplaynone(false);
            //         }
            //             , 3000)

            //     }

            //     console.log(err);
            // }
            // )

    }


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
            gap: '80px'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                gap: '16px'
            }}
            >
                <img src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png" alt="avatar" style={{ width: '100px', height: '100px' }} />
                <h1 style={{ display: display }} > this email already exists</h1>
            </div>
            <form onSubmit={handleSignupSubmit}>
                <div style={{
                    display: 'flex', flexDirection: 'column',
                    marginTop: '-100px'
                    , gap: '16px'
                }}>
                    <h1 style={{ color: '#1976d2' }}>Signup To Metafortess</h1>
                    <TextField id="name" label="Enter Name" variant="outlined" type="text" style={{ width: '450px' }} value={name} onChange={(e) => { setname(e.target.value) }} />
                    <TextField id="email" label="Enter Email" variant="outlined" type="email" style={{ width: '450px' }} value={email} onChange={(e) => { setemail(e.target.value) }} />
                    <TextField id="password" label="password" variant="outlined" type="password" value={password} style={{ width: '450px' }} onChange={(e) => { setPassword(e.target.value) }} />
                    <Button type='submit' variant="outlined" style={{ width: "450px" }}>Signup</Button>
                    <p > have an account?  <Link to='/login'> Login</Link> </p>
                </div>
            </form>
        </div>

    );
}

export default Signup;