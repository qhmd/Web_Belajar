import React, { useState } from 'react';
import { submitChangePassword } from '../actions/userAction';
import toast, { Toaster } from 'react-hot-toast';
import LoadingButton from './Layouts/loader/loader';
import { Link } from 'react-router-dom';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

const ChangePassword = () => {
    const [loading, setLoading] = useState(false);

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
    
    const handleShowPasswordClick = () => {
        setShowPassword(!showPassword);
    };   

    const handleChangePassword = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast.error('Kata sandi tidak cocok. Silakan coba lagi.');
            return;
        }

        setLoading(true);

        const passData = new FormData();
        passData.set("password", password);
        
        const response = await submitChangePassword(passData, setLoading);
        if (response.success) {
            toast.success('Kata sandi berhasil diubah.');
            setTimeout(() => {
                window.location.href = '/login';
            }, 500);
        }
        setLoading(false);
    };

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <Toaster />
            <form onSubmit={handleChangePassword} className='p-6 bg-gray-100 border-2 border-black-800 rounded-lg w-[25rem]'>
                <h2 className='text-center text-2xl font-bold mb-4'>Ganti Kata Sandi</h2>

                <div className="mb-4 bg-yellow-100 border border-yellow-400 rounded-md text-yellow-800 px-4 py-3 rounded flex items-center">
                    Minimal 8 Karakter, berupa simbol, huruf, dan juga angka.
                </div>

                {/* Input New Password */}
                <div className="relative mb-3">
                    <label className="block mb-1">Kata Sandi Baru</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={handlePasswordChange}
                                onFocus={(e) => e.target.style.outline = 'none'}
                                className="customInput"
                                required
                            />
                                {!isValidPassword && password !== "" ? (
                                    <span className='absolute text-red-500 text-sm '>
                                        Minimal 8 Karakter Berupa Huruf, Angka, Dan Simbol.
                                    </span>
                                ) : ( "" )}
                            <button 
                                type="button"
                                onClick={handleShowPasswordClick}
                                className='absolute right-3 top-[2.7rem] transform -translate-y-1/2'
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-6 w-5 text-gray-600 mt-2" />
                                    ) : (
                                        <EyeIcon className="h-6 w-5 text-gray-600 mt-2" />
                                    )
                                }
                            </button>
                </div>

                {/* Input Confirm Password */}
                <div className="relative mb-3">
                    <label className="block mb-1 mt-5">Konfirmasi Kata Sandi</label>
                    <input
                                type={showPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onFocus={(e) => e.target.style.outline = 'none'}
                                className="customInput"
                                required
                            />
                            <button 
                                type="button"
                                onClick={handleShowPasswordClick}
                                className='absolute right-3 top-[2.7rem] transform -translate-y-1/2'
                                >
                                    {showPassword ? (
                                        <EyeOffIcon className="h-6 w-5 text-gray-600 mt-2" />
                                    ) : (
                                        <EyeIcon className="h-6 w-5 text-gray-600 mt-2" />
                                    )
                                }
                            </button>
                </div>

                <div>
                    <LoadingButton isLoading={loading}>
                        Kirim
                    </LoadingButton>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
