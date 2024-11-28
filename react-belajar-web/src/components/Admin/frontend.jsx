import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { editDataFront } from '../../actions/adminActionFront';
import { deleteDataFront } from '../../actions/adminActionFront';

const MateriPage = () => {
    const [materi, setMateri] = useState([]);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalEditOpen, setIsModalEditOpen] = useState(false);

    const [selectedMateri, setSelectedMateri] = useState({
        judul_materi: '',
        deskripsi: '',
        link_materi: null,
        picture: null,
    });

    const [formDataSend, setFormDataSend] = useState({
        judul_materi: '',
        deskripsi: '',
        link_materi: null,
        picture: null,
    });

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/materifront")
            .then((response) => {
                setMateri(response.data);
            })
            .catch((error) => {
                console.error("Error fetching materi:", error);
            });
    }, []);

    const handleOpenEditModal = (item) => {
        setSelectedMateri(item);
        setIsModalEditOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsModalEditOpen(false);
        setSelectedMateri(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormDataSend({
            ...formDataSend,
            [name]: value,
        });
    };

    // Menangani perubahan file
    const handleFileEditChange = (e) => {
        const { name, files } = e.target;
        setSelectedMateri({
            ...selectedMateri,
            [name]: files[0],  // Menyimpan file pertama yang dipilih
        });
    };

    // Menangani perubahan file
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormDataSend({
            ...formDataSend,
            [name]: files[0],  // Menyimpan file pertama yang dipilih
        });
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedMateri);
        const formData = new FormData();
        formData.append('judul_materi', selectedMateri.judul_materi);
        formData.append('deskripsi', selectedMateri.deskripsi);
        formData.append('link_materi', selectedMateri.link_materi);
        formData.append('picture', selectedMateri.picture);
        console.log(selectedMateri)
        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
          }          
        try {
            const csrfToken = Cookies.get('XSRF-TOKEN');
            if (csrfToken) {
                axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
            }
            axios.defaults.withCredentials = true;
            await toast.promise(
                axios.put(`http://localhost:8000/materifront/update/${selectedMateri.id}`, selectedMateri ,{
                    withCredentials: true,
                    headers: { 'Content-Type':'multipart/form-data' },
                }),
                {
                    loading: 'Menyimpan...',
                    success: "Berhasil Mengedit Materi!",
                    error: "Gagal Mengedit Materi!",
                }
            );
            setIsModalEditOpen(false); // Tutup modal setelah berhasil
        } catch (error) {
            console.log(error.message);
            if (error.response) {
                const errorMessage = error.response.data.errors
                    ? Object.values(error.response.data.errors).flat().join(", ")
                    : error.response.data.message;
                toast.error(errorMessage);
            } else {
                toast.error("Terjadi Kesalahan Jaringan");
            }
        }
        // const response = await editDataFront(formData,selectedMateri);
        // console.log(response);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formDataSend);
        const data = new FormData();
        data.append('judul_materi', formDataSend.judul_materi);
        data.append('deskripsi', formDataSend.deskripsi);
        data.append('link_materi', formDataSend.link_materi);
        data.append('picture', formDataSend.picture);
        console.log(data)
        try {
            const csrfToken = Cookies.get('XSRF-TOKEN');
            if (csrfToken) {
                axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
            }

            await toast.promise(
                axios.post(`http://localhost:8000/materifront`, data, {
                    withCredentials: true,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }),
                {
                    loading: 'Menyimpan...',
                    success: "Berhasil Mengedit Materi!",
                    error: "Gagal Mengedit Materi!",
                }
            );
            setIsModalEditOpen(false); // Tutup modal setelah berhasil
        } catch (error) {
            console.log(error.message);
            if (error.response) {
                const errorMessage = error.response.data.errors
                    ? Object.values(error.response.data.errors).flat().join(", ")
                    : error.response.data.message;
                toast.error(errorMessage);
            } else {
                toast.error("Terjadi Kesalahan Jaringan");
            }
        }
        console.log(materi)
    };

    const handleDelete = async (id) => {
        const response = await deleteDataFront(id);
        console.log(response);
    }

    return (
        <div className="container mt-5 min-h-screen relative">
            <Toaster />
            <h1 className="text-2xl font-bold mb-5">Daftar Materi Front End</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mx-w-full">
                {materi.map((item) => (
                    <div key={item.id} className="p-4 border rounded shadow">
                        <img
                            src={`http://localhost:8000/storage/${item.picture}`}
                            alt={item.judul_materi}
                            className="w-full h-40 object-cover mb-3"
                        />
                        <h2 className="text-xl font-semibold">{item.judul_materi}</h2>
                        <p className="text-sm text-gray-600">{item.deskripsi}</p>

                        <button
                            className="bg-yellow-500 text-white p-2 mt-2 rounded mb-5"
                            onClick={() => handleOpenEditModal(item)}
                        >
                            Edit Materi
                        </button>
                        
                        <button
                            className="bg-red-500 text-white p-2 mt-2 mx-2 rounded mb-5"
                            onClick={() => handleDelete(item.id)}
                        >
                            Hapus Materi
                        </button>
                    </div>
                ))}
            </div>
            <button
                className="bg-green-500 text-white p-2 mt-2 mr-2 rounded mb-5"
                onClick={() => setIsModalOpen(true)}
            >
                Tambah Materi
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={() => setIsModalOpen(false)}>
                    <div className="relative bg-white rounded-lg shadow-lg w-full -pt-24 max-w-lg p-5 " onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between pb-6 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Tambah Materi</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block font-semibold">Judul Materi</label>
                                <input type="text" name="judul_materi" value={formDataSend.judul_materi} onChange={handleChange} className="w-full border px-3 py-2 rounded" required />
                            </div>
                            <div>
                                <label className="block font-semibold">Deskripsi</label>
                                <textarea name="deskripsi" value={formDataSend.deskripsi} onChange={handleChange} className="w-full border px-3 py-2 rounded" rows="4" required></textarea>
                            </div>
                            <div>
                                <label className="block font-semibold">Materi</label>
                                <input type="file" name="link_materi" onChange={handleFileChange} className="w-full border px-3 py-2 rounded" />
                            </div>
                            <div>
                                <label className="block font-semibold">Gambar</label>
                                <input type="file" name="picture" onChange={handleFileChange} className="w-full border px-3 py-2 rounded" />
                            </div>
                            <div className="flex justify-end mt-4">
                                <button type="submit" className="bg-blue-500 text-white px-5 py-2 rounded">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {isModalEditOpen && selectedMateri && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" onClick={handleCloseEditModal}>
                    <div className="relative bg-white rounded-lg shadow-lg w-full -pt-24 max-w-lg p-5" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between pb-6 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Edit Materi</h3>
                            <button onClick={handleCloseEditModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <form onSubmit={handleEditSubmit} className="space-y-4">
                            <div>
                                <label className="block font-semibold">Judul Materi</label>
                                <input type="text" id='judul_materi' name="judul_materi" value={selectedMateri.judul_materi} onChange={(e) => setSelectedMateri({...selectedMateri, judul_materi : e.target.value})} className="w-full border px-3 py-2 rounded" required />
                            </div>
                            <div>
                                <label className="block font-semibold">Deskripsi</label>
                                <textarea name="deskripsi" value={selectedMateri.deskripsi} id='deskripsi' onChange={(e) => setSelectedMateri({...selectedMateri, deskripsi : e.target.value})} className="w-full border px-3 py-2 rounded" rows="4" required></textarea>
                            </div>
                            <div>
                                <label className="block font-semibold">Materi</label>
                                <input type="file" name="link_materi" onChange={handleFileEditChange} className="w-full border px-3 py-2 rounded" />
                            </div>
                            <div>
                                <label className="block font-semibold">Gambar</label>
                                <input type="file" name="picture" onChange={handleFileEditChange} className="w-full border px-3 py-2 rounded" />
                            </div>
                            <div className="flex justify-end mt-4">
                                <button type="submit" className="bg-blue-500 text-white px-5 py-2 rounded">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MateriPage;
