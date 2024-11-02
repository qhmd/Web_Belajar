import React, {useState} from 'react';
import {Link} from "react-router-dom"
import axios from 'axios';

import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

const Login = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('URL_BACKEND_LARAVEL/login', { email, password });
      console.log(response.data);
      // Tambahkan logika untuk menyimpan token atau mengarahkan pengguna
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit} className="p-6 bg-gray-100 border-2 border-black-800 rounded-lg w-[25rem]">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
        <div>
            <div className="relative mb-7">
                <label className="block mb-1">Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="block w-full px-3 py-2 border rounded-lg border-2 border-black-800"
                    required
                />
                    {!isValidEmail && email !== "" ? (
                        <span style={{ color: 'red', fontSize:'0.9em', position : 'absolute', left : '0'}}>
                            Masukkan Email yang benar.
                        </span>
                    ) : ""}
            </div>
        </div>
        <div className="relative mb-4">
            <div className='flex mb-1 justify-between'>
                <label>Password</label>
                <Link className='text-blue-600'>Lupa Kata Sandi ?</Link>
            </div>
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg border-2 border-black-800"
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
        </div>
        <button type="submit" className="w-full py-2 mt-4 bg-yellow-500 text-white rounded">
          Login
        </button>
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
