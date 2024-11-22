import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MateriPage = () => {
    const [materi, setMateri] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/materi") // URL API Laravel
            .then((response) => {
                setMateri(response.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);

    return (
        <div className="container mx-auto mt-5">
            <h1 className="text-2xl font-bold mb-5">Daftar Materi</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {materi.map((item) => (
                    <div key={item.id} className="p-4 border rounded shadow">
                        <img 
                            src={`http://localhost:8000/storage/${item.picture}`}

                            alt={item.judul_materi} 
                            className="w-full h-40 object-cover mb-3"
                        />
                        <h2 className="text-xl font-semibold">{item.judul_materi}</h2>
                        <p className="text-sm text-gray-600">{item.deskripsi}</p>
                        <a 
                            href={`http://localhost:8000/storage/${item.link_materi}`} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-blue-500 underline mt-2 block"
                        >
                            Download Materi
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MateriPage;
