import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';

const Pelatihan = () => {
    const [validDeskripsi, isValidDeskripsi] = useState(true)
    const [materi, setMateri] = useState([]);

    const [isModelEditOpen, setisModelEditOpen] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        judul_pelatihan: '',
        deskripsi: '',
        picture: null,
        link_pelatihan: '',
    });

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/pelatihan") // URL API Laravel
            .then((response) => {
                setMateri(response.data);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);
    
    const handleEdit = (id) => {
        setIsModelEditOpen(true);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        data.append('judul_pelatihan', formData.judul_pelatihan);
        data.append('deskripsi', formData.deskripsi);
        data.append('link_pelatihan', formData.link_pelatihan);
        data.append('picture', formData.picture);

        try {
            const csrfToken = Cookies.get('XSRF-TOKEN');
            if (csrfToken) {
                axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
            }

            await toast.promise(
                axios.post("http://localhost:8000/pelatihan", data, {
                    withCredentials: true,
                    headers: { 'Content-Type': 'multipart/form-data' },
                }),
                {
                    loading: 'Menyimpan...',
                    success: "Berhasil Membuat Di Pelatihan!",
                    error: "Gagal Membuat Pelatihan!",
                }
            );
            setIsModalOpen(false); // Tutup modal setelah berhasil
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
    };

    return (
        <div className="container mx-auto mt-5">
            <Toaster />
            <h1 className="text-2xl font-bold mb-5">Daftar Pelatihan</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {materi.map((item) => (
                    <div key={item.id} className="p-4 border rounded shadow">
                        <img
                            src={`http://localhost:8000/storage/${item.picture}`}
                            alt={item.judul_pelatihan}
                            className="w-full h-40 object-cover mb-3"
                        />
                        <h2 className="text-xl font-semibold">{item.judul_pelatihan}</h2>
                        <p className="text-sm text-gray-600">{item.deskripsi}</p>
                    </div>
                ))}
            </div>
            <button
                className="bg-green-500 text-white px-4 py-2 rounded mb-5"
                onClick={() => setIsModalOpen(true)}
            >
                Tambah Pelatihan
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-5 rounded shadow-lg w-full max-w-lg relative">
                        <button
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center"
                            onClick={() => setIsModalOpen(false)}
                        >
                            ×
                        </button>
                        <h2 className="text-2xl font-bold mb-4">Tambah Pelatihan</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block font-semibold">Pelatihan</label>
                                <input
                                    type="text"
                                    name="judul_pelatihan"
                                    value={formData.judul_pelatihan}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block font-semibold">Deskripsi</label>
                                <textarea
                                    name="deskripsi"
                                    value={formData.deskripsi}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label className="block font-semibold">Link Pelatihan</label>
                                <input
                                        type="text"
                                        name="link_pelatihan"
                                        value={formData.link_pelatihan}
                                        onChange={handleChange} // harus memanggil fungsi perubahan
                                        className="w-full border px-3 py-2 rounded"
                                        required
                                    />
                            </div>
                            <div>
                                <label className="block font-semibold">Picture (Gambar)</label>
                                <input
                                    type="file"
                                    name="picture"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="w-full border px-3 py-2 rounded"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Simpan
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Pelatihan;
