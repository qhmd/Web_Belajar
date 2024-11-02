import React, {useState} from 'react';
import {Link} from "react-router-dom"

import axios from 'axios';
import { CheckBox } from '@mui/icons-material';

import toast, { Toaster } from 'react-hot-toast';

import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

import Loader from './Layouts/loader/loaderWeb';


const Signup = () => {
    // untuk nama
    const [isValidNama, setIsValidNama] = useState(true)
    const [name, setName] = useState('');
    const handleNameChange = (event) => {
        const newName = event.target.value;
        setName(newName);
        setIsValidNama(newName.length >= 4);
    }

    // Untuk Email
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
        setIsValidEmail(
        newEmail !== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
        );
    }

    const [showPassword, setShowPassword] = useState(false);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [loading, setLoading] = useState(false);
    
    const handleShowPasswordClick = () => {
        setShowPassword(!showPassword);
    };

    const handleSingupSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        if (password !== confirmPassword) {
            const notify = () => toast.error("Password tidak sama")
            notify();
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("password", password);

        await submitForm(formData);
    }

    <span className="loading loading-spinner loading-lg text-warning"></span>
    return (
        <div className="flex items-center justify-center min-h-screen">
            <Toaster/>
            {
                loading ? (
                    <Loader />
                ) : (
                    <form 
                        onSubmit={handleSingupSubmit} 
                        className="p-6 bg-gray-100 border-2 border-black-800 rounded-lg w-[25rem]"
                        onFocus={(e) => e.target.style.outline = 'none'}
                    >
                        <h2 className="text-center text-2xl font-bold mb-4">Buat Akun</h2>
                    <div>
                        <div className="relative mb-7">
                            <label className="block mb-1">Nama</label>
                            <input
                                type="text"
                                value={name}
                                onChange={handleNameChange}
                                className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm/6"
                                required
                            />
                            {!isValidNama && name !== "" ? (
                                            <span style={{ color: 'red', fontSize:'0.9em', position : 'absolute', left : '0'}}>
                                                Nama harus minimal 4 karaketer.
                                            </span>
                            ) : ""}
                        </div>
                    </div>
                        <div>
                            <div className="relative mb-7">
                                    <label className="block mb-1">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={handleEmailChange}
                                        className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm/6"
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
                            <label className="block mb-1">Password</label>
                            <input
                                type= {showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm/6"
                                required
                            />
                            <button 
                            type="button"
                            onClick={handleShowPasswordClick}
                            className='absolute right-3 top-[2.9rem] transform -translate-y-1/2'
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="h-5 w-5 text-gray-600" />
                                ) : (
                                    <EyeIcon className="h-5 w-5 text-gray-600" />
                                )
                            }
                            </button>
                        </div>

                        <div className="relative block mb-1">
                            <label>Confirm Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-yellow-600 sm:text-sm/6"
                                required
                            />
                            <button 
                                type="button"
                                onClick={handleShowPasswordClick}
                                className='absolute right-3 top-[2.7rem] transform -translate-y-1/2'
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
                        Buat Akun
                        </button>
                        <div className='w-full mt-3'>
                            Sudah punya akun ? 
                            <Link to='/login' className='ml-1 text-blue-600'>
                                Login
                            </Link>
                        </div>
                    </form>
                )
            }
        </div>
    );
};

export default Signup;