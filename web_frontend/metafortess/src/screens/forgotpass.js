import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MuiOtpInput } from 'mui-one-time-password-input';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Forgotpass() {
  const [email, setEmail] = useState('');
  const [tp, setTp] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const display = loginError ? 'block' : 'none';
  const [otp, setOtp] = useState(false);
  const otpDisplay = otp ? 'flex' : 'none';

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError(false);
    try {
      const response = await axios.post('http://localhost:3030/sendotp', { email });

      if (response.status === 200) {
        setOtp(true);
      }
    } catch (error) {
      setLoginError(true);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoginError(false);
    try {
      const response = await axios.post('http://localhost:3030/verifyotp', { email, otp, password });

      if (response.status === 200) {
        console.log('Password reset successful');
        // Redirect to login page or show a success message to the user
        <Link to="/login" />;
    }
    } catch (error) {
      setLoginError(true);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'rgb(0, 150, 24, 0.1)', width: '100vw', marginTop: '0px', flexDirection: 'column', gap: '80px' }}>
      <div>
        {/* <img src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png" alt="avatar" style={{ width: '100px', height: '100px' }} /> */}
        <h1 style={{ display }}> Error in login </h1>
      </div>

      <form onSubmit={otp ? handleOtpSubmit : handleLoginSubmit}>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-100px', gap: '16px' }}>
          <h1 style={{ color: '#1976d2' }}>{otp ? 'Enter OTP' : 'Enter email-id'}</h1>

          {!otp && (
            <>
              <TextField id="email" label="Enter Email" variant="outlined" type="email" style={{ width: '450px' }} value={email} onChange={(e) => setEmail(e.target.value)} />
              <Button variant="outlined" style={{ width: '450px' }} onClick={() => setOtp(true)}>
                Send OTP
              </Button>
            </>
          )}

          {otp && (
            <>
              <MuiOtpInput id="otp" value={tp} onChange={(value) => setTp(value)} style={{ width: '450px', display: otpDisplay }} />
              <TextField id="password" label="New Password" variant="outlined" type="password" style={{ width: '450px' }} value={password} onChange={(e) => setPassword(e.target.value)} />
              <Button type="submit" variant="outlined" style={{ width: '450px', display: otpDisplay }}>
                Reset Password
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default Forgotpass;
