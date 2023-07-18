import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MuiOtpInput } from 'mui-one-time-password-input';
import axios from 'axios';
import { Link } from 'react-router-dom';



function ForgotPass() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1); // Step 1: Enter email, Step 2: Enter OTP and New Password
  const [error, setError] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3030/sendotp', { email });

      if (response.status === 200) {
        setStep(2); // Move to step 2: Enter OTP and New Password
      }
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:3030/verifyotp', { email, otp, password });

      if (response.status === 200) {
        setStep(1); // Reset to step 1: Enter email
        setEmail('');
        setOtp('');
        setPassword('');
        setError(''); // Clear any previous errors
        alert('Password reset successful. You can now log in with your new password.');
      }
    } catch (error) {
      setError('Failed to reset password. Please make sure the OTP is correct and try again.');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        height: '100vh',
        backgroundColor: 'rgb(0, 150, 24, 0.1)',
        // backgroundImage: 'linear-gradient(180deg, #581845, #900C3F, #C70039, #FF5733, #FFC300)'
        width: '100vw',
        marginTop: '0px',
        flexDirection: 'column',
        gap: '80px'
      }}
    >
      {step === 1 && (

        <form onSubmit={handleSendOtp}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            flexDirection: 'column',

          }}>
            <TextField
              id="email"
              label="Enter Email"
              variant="outlined"
              type="email"
              style={{ width: '450px' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button  variant="outlined" style={{ width: '450px' }} type="submit">
              Send OTP
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleResetPassword}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            flexDirection: 'column',
          }}>
            <MuiOtpInput
              id="otp"
              value={otp}
              onChange={(value) => setOtp(value)}
              style={{ width: '450px', margin: '10px 0' }}
              numInputs={6}
            />
            <TextField
              id="password"
              label="New Password"
              variant="outlined"
              type="password"
              style={{ width: '450px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button variant="outlined" style={{ width: '450px' }} type="submit">
              Reset Password
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </form>
      )}
    </div>
  );
}

export default ForgotPass;




























// function Forgotpass(){
// const [otp, setOtp] = useState(false);

//   const post = () =>{
//     axios.post('http://localhost:3030/sendotp')
//     .then(response => {
//       console.log(response)
//       if (response.status === 200) {
//         setOtp(true);
//       }
//     }
//     )
//     .catch(error => {
//       console.log(error)
//     }
//     )

//   }

//   return(
//     <div>
//      <Button variant="contained" color="primary" onClick={post}>  submit </Button>
//      {/* show hello if otp  */}
//       {otp && (
//         <div>
//           <h1>hello</h1>
//         </div>
//       )}
//      </div>
//   )
// }


// function Forgotpass() {
//   const [email, setEmail] = useState('');
//   const [tp, setTp] = useState('');
//   const [password, setPassword] = useState('');
//   const [loginError, setLoginError] = useState(false);
//   const display = loginError ? 'block' : 'none';
//   const [otp, setOtp] = useState(false);
//   const otpDisplay = otp ? 'flex' : 'none';

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     setLoginError(false);
//     try {
//       const response = await axios.post('http://localhost:3030/sendotp', { email });

//       if (response.status === 200) {
//         // setOtp(true);
//       }
//     } catch (error) {
//       setLoginError(true);
//     }
//   };

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault();
//     setLoginError(false);
//     try {
//       const response = await axios.post('http://localhost:3030/verifyotp', { email, otp, password });

//       if (response.status === 200) {
//         console.log('Password reset successful');
//         // Redirect to login page or show a success message to the user
//         <Link to="/login" />;
//     }
//     } catch (error) {
//       setLoginError(true);
//     }
//   };

//   return (
//     <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'rgb(0, 150, 24, 0.1)', width: '100vw', marginTop: '0px', flexDirection: 'column', gap: '80px' }}>
//       <div>
//         {/* <img src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png" alt="avatar" style={{ width: '100px', height: '100px' }} /> */}
//         <h1 style={{ display }}> Error in login </h1>
//       </div>

//       <form onSubmit={otp ? handleOtpSubmit : handleLoginSubmit}>
//         <div style={{ display: 'flex', flexDirection: 'column', marginTop: '-100px', gap: '16px' }}>
//           <h1 style={{ color: '#1976d2' }}>{otp ? 'Enter OTP' : 'Enter email-id'}</h1>

//           {!otp && (
//             <>
//               <TextField id="email" label="Enter Email" variant="outlined" type="email" style={{ width: '450px' }} value={email} onChange={(e) => setEmail(e.target.value)} />
//               <Button variant="outlined" style={{ width: '450px' }} onClick={() => setOtp(true)}>
//                 Send OTP
//               </Button>
//             </>
//           )}

//           {otp && (
//             <>
//               <MuiOtpInput id="otp" value={tp} onChange={(value) => setTp(value)} style={{ width: '450px', display: otpDisplay }} />
//               <TextField id="password" label="New Password" variant="outlined" type="password" style={{ width: '450px' }} value={password} onChange={(e) => setPassword(e.target.value)} />
//               <Button type="submit" variant="outlined" style={{ width: '450px', display: otpDisplay }}>
//                 Reset Password
//               </Button>
//             </>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// }

// export default Forgotpass;
