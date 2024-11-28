import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FullstackUser = () => {
    const [fullstack, setFullstack] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/fullstack") // URL API Laravel
            .then((response) => {
                setFullstack(response.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);
    console.log(fullstack)
    return (
        
        <div className="container mx-auto mt-28 max-w-full">
            <h1 className="text-2xl font-bold mb-5 text-center">Daftar fullstack Back-End</h1>
            <hr />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                {fullstack.map((item) => (                    
                    <div key={item.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                        <a href="#">
                            <img className="rounded-t-lg object-cover w-full" src={`http://localhost:8000/storage/${item.picture}`} alt="" />
                        </a>
                        <div className="p-5">
                            <a href='#'>
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.judul_fullstack}</h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.deskripsi}</p>
                            
                            <a href={item.link_fullstack} target="_blank" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Baca fullstack
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FullstackUser;
