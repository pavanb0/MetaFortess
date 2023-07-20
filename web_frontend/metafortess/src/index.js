import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Home from './screens/Home';
import Signup from './screens/Signup';
import Login from './screens/login'; // Make sure the filename is "Login.js" with a capital "L".
import Forgotpass from './screens/forgotpass';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Gallary from './screens/Gallary';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallary" element={<Gallary />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotpass" element={<Forgotpass />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
