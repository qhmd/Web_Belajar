import React, {useState} from 'react';
import {Link} from "react-router-dom"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { submitLogin } from '../actions/userAction';

import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import toast,{ Toaster } from 'react-hot-toast';
import LoadingButton from './Layouts/loader/loader';
import './layouts/style/form.css'


const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [isValidPassword,setValidPassoword] = useState(true);

  const [loading, setLoading] = useState(false);


  const handlePasswordChange = (e) => {
    const newPass = e.target.value;
    setPassword(newPass);
    setValidPassoword(
    newPass !== "" && /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newPass)
    )
  } 

  const handleShowPasswordClick = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(
    newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
    );
}

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const loginData = new FormData();
    loginData.set("email", email);
    loginData.set("password", password);
    const response = await submitLogin(loginData, setLoading);
    console.log(response);
    if(response) {
      window.location.href = '/home';
      setTimeout(() => {
    }, 100);
    }
    }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Toaster/>
          <form onSubmit={handleLoginSubmit}
                className="p-6 bg-gray-100 border-2 border-black-800 rounded-lg w-[25rem]"
                onFocus={(e) => e.target.style.outline = 'none'}      
          >
          <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
          <div>
              <div className="relative mb-7">
                  <label className="block mb-1">Email</label>
                  <input
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      className="customInput"
                      required
                  />
                      {!isValidEmail && email !== "" ? (
                          <span style={{ color: 'red', fontSize:'0.9em', position : 'absolute', left : '0'}}>
                              Masukkan Email yang benar.
                          </span>
                      ) : ""}
              </div>
          </div>
          <div className="relative mb-7">
              <div className='flex mb-1 justify-between'>
                  <label>Password</label>
                  <Link className='text-blue-600'to='/forgot-password'>Lupa Kata Sandi ?</Link>
              </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={handlePasswordChange}
              className="customInput"
              required
            />
            <button 
              type="button"
              onClick={handleShowPasswordClick}
              className='absolute right-3 top-[3.1rem] transform -translate-y-1/2'
              >
                  {showPassword ? (
                      <EyeOffIcon className="h-5 w-5 text-gray-600" />
                  ) : (
                      <EyeIcon className="h-5 w-5 text-gray-600" />
                  )
              }
              </button>
              {!isValidPassword && password!== ""? (
                  <span className='text-red-500 text-[0.9em] absolute'>
                      Minimal 8 Karakter Berupa Huruf, Angka, Dan Simbol
                  </span>
              ) : ""}
          </div>
          <LoadingButton isLoading={loading}>
                            Kirim
          </LoadingButton>
          <div className='w-full mt-3'>
              Tidak punya akun ? 
              <Link to='/signup' className='ml-1 text-blue-600'>
                  Buat Akun
              </Link>
          </div>
        </form>
    </div>
  );
};

export default Login;
