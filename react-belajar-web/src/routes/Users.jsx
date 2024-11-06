import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../components/Login';
import Signup from '../components/Signup';
import ForgotPassword from '../components/resetPassword';
import TokenForPw from '../components/changePassword';


function Users() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path='/forgot-password'element={<ForgotPassword/>}/>
      <Route path='/ganti-sandi' element={<TokenForPw />}/>
    </Routes>
  );
}

export default Users;
