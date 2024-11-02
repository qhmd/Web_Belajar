import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from '../components/Login';
import Signup from '../components/Signup';

function Users() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default Users;
