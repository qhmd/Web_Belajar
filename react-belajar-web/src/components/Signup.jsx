import React, {useEffect, useState} from 'react';
import {Link, redirect} from "react-router-dom"

import axios from 'axios';
import { CheckBox } from '@mui/icons-material';

import { submitForm } from '../actions/userAction';

import toast, { Toaster } from 'react-hot-toast';

import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

import LoadingButton from './Layouts/loader/loader';

import './Layouts/style/form.css'

import Cookies from 'js-cookie';

import { useNavigate } from 'react-router-dom';


const Signup = () => {
    const navigate = useNavigate()
    // untuk nama
    const [isValidNama, setIsValidNama] = useState(true)
    const [name, setName] = useState('');
    const handleNameChange = (event) => {
        const newName = event.target.value;
        setName(newName);
        setIsValidNama(newName.length >= 4 && /^[a-zA-Z]+$/.test(newName));
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
    const [isValidPassword,setValidPassoword] = useState(true);
    
    const handlePasswordChange = (e) => {
        const newPass = e.target.value;
        setPassword(newPass);
        setValidPassoword(
        newPass !== "" && /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(newPass)
        )
    } 

    let isSignInDisabled = !(
        email &&
        password &&
        isValidEmail &&
        confirmPassword &&
        name &&
        isValidNama
      );


    const [loading, setLoading] = useState(false);
    
    const handleShowPasswordClick = () => {
        setShowPassword(!showPassword);
    };   



    const handleSingupSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error("Password tidak sama")
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("password", password);
        await submitForm(formData,setLoading);  

        navigate('/login');

    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Toaster/>
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
                                className="customInput"
                                required
                            />
                            {!isValidNama && name !== "" ? (
                                            <span style={{ color: 'red', fontSize:'0.9em', position : 'absolute', left : '0'}}>
                                                Minimal 4 Huruf
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
                            <label className="block mb-1">Password</label>
                            <input
                                type= {showPassword ? "text" : "password"}
                                value={password}
                                onChange={handlePasswordChange}
                                className="customInput"
                                required
                            />
                                {!isValidPassword && password !== "" ? (
                                    <span style={{ color: 'red', fontSize:'0.9em', position : 'absolute', left : '0'}}>
                                        Minimal 8 Karakter Berupa Huruf, Angka, Dan Simbol.
                                    </span>
                                ) : (
                                    "" )}
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

                        <div className="relative block mb-8">
                            <label>Confirm Password</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="customInput"
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
                        <LoadingButton isLoading={loading} disabled={isSignInDisabled}>
                            Buat Akun
                        </LoadingButton>
                        <div className='w-full mt-3'>
                            Sudah punya akun ? 
                            <Link to='/login' className='ml-1 text-blue-600'>
                                Login
                            </Link>
                        </div>
                    </form>
        </div>
    );
};

export default Signup;