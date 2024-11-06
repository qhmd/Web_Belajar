import React, { useState } from 'react';
import { submitForgotPassword } from '../actions/userAction';
import toast, { Toaster } from 'react-hot-toast';
import LoadingButton from './Layouts/loader/loader';
import { useNavigate } from 'react-router-dom';
import { submitToken } from '../actions/userAction';

import {Link} from "react-router-dom"


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [token, setToken] = useState('')
    const [loading, setLoading] = useState(false);
    const [loadingPass, setLoadingPass] = useState(true);

    const navigate = useNavigate()

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        setIsValidEmail(
            email!== "" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)
        );
    };

    const handleForgetPassword = async (e) => {
        setLoadingPass(true);
        e.preventDefault();
        
        const resetData = new FormData();
        resetData.set("email", email);
        await submitForgotPassword(resetData, loadingPass); 
    };


    const handleSendToken = async (e) => {
        setLoading(true);
        e.preventDefault();

        const tokenData = new FormData();
        tokenData.set("token", token);

        const response = await submitToken(tokenData, setLoading);
        if (response.success) {
            navigate('/ganti-sandi');
        }
        console.log(response)
    };

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <Toaster/>
            <loaderForget/>
            <form onSubmit={handleSendToken} className='p-6 bg-gray-100 border-2 border-black-800 rounded-lg w-[25rem]'>
                <h2 className='text-center text-2xl font-bold mb-4'>Reset kata sandi</h2>
                <div className="mb-4 bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded flex items-center">
                    Masukkan email untuk reset katasandi.
                </div>
                <div>
                <div className="relative mb-7">
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        onFocus={(e) => e.target.style.outline = 'none'}
                        className="customInput"
                        required
                    />
                    {!isValidEmail && email !== "" ? (
                          <span style={{ color: 'red', fontSize:'0.9em', position : 'absolute', left : '0'}}>
                              Masukkan Email yang benar.
                          </span>
                      ) : ""}
                    <div className='mb-3 mt-1 mr-2 flex justify-end'>
                        <button className='text-blue-500' onClick={handleForgetPassword}>Kirim Token</button>
                    </div>
                    <label className="block mb-1">Token</label>
                    <input
                        type="text"
                        value={token}
                        onChange = {(e) => setToken(e.target.value)}
                        onFocus={(e) => e.target.style.outline = 'none'}
                        className="customInput"
                        required
                    />
                </div>
                </div>
                <div className="flex flex-col items-start space-y-4">
                    <LoadingButton isLoading={loading}>
                        Kirim
                    </LoadingButton>
                </div>
            </form>
        </div>
    );
};

export default ForgotPassword;
