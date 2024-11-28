import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FrontEndUser = () => {
    const [materi, setMateri] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/materifront") // URL API Laravel
            .then((response) => {
                setMateri(response.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-black via-[#0f172a] to-blue-800">
            {/* Background Pattern */}
            <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(0,112,243,0.6),rgba(0,0,0,0))] blur-2xl"></div>
            <div class="w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,rgba(0,212,255,0.6),rgba(0,0,0,0))] blur-lg"></div>
        </div>

            {/* Daftar Materi */}
            <div className="relative z-20 container mx-auto max-w-full px-4">
                <div className='flex items-center justify-center h-20'>
                    <h1 className="text-2xl font-bold text-center text-white">Daftar Materi Front-End</h1>
                </div>
                <hr className="border-slate-700" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
                    {materi.map((item) => (
                        <div
                        key={item.id}
                            className="max-w-sm border border-blue-500 rounded-lg transform transition-transform hover:scale-105"
                        >
                            <a href="#">
                                <img
                                    className="rounded-t-lg object-cover w-full"
                                    src={`http://localhost:8000/storage/${item.picture}`}
                                    alt={item.judul_materi}
                                />
                            </a>
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
                                        {item.judul_materi}
                                    </h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-100 text-base">
                                    {item.deskripsi}
                                </p>
                                <a
                                    href={`http://localhost:8000/storage/${item.link_materi}`}
                                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-black bg-blue-400 rounded-lg hover:bg-blue-300 focus:ring-4 focus:ring-blue-600 focus:outline-none transform transition-transform hover:scale-110"
                                >
                                    Baca Materi
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FrontEndUser;
