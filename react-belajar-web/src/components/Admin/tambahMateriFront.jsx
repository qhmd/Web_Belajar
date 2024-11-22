import React, { useState } from 'react';
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast';
import Cookies from 'js-cookie'; // Import js-cookie jika Anda menggunakannya untuk CSRF token


const TambahMateriFront = () => {
    const [formData, setFormData] = useState({
        judul_materi: '',
        deskripsi: '',
        link_materi: null,
        picture: null,
    });

    const [message, setMessage] = useState('');

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
    
        // Membuat FormData untuk menyertakan file dan data lainnya
        const data = new FormData();
        data.append('judul_materi', formData.judul_materi);
        data.append('deskripsi', formData.deskripsi);
        data.append('link_materi', formData.link_materi);  // pastikan formData.link_materi adalah file
        data.append('picture', formData.picture);  // pastikan formData.picture adalah file
    
        try {
            // Ambil CSRF token dari Cookies jika ada
            const csrfToken = Cookies.get('XSRF-TOKEN');
            if (csrfToken) {
                axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
            }
    
            // Mengirimkan request POST ke server
            await toast.promise(
                axios.post("http://localhost:8000/materi", data, { 
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'multipart/form-data'  // Pastikan Content-Type multipart untuk upload file
                    }
                }),
                {
                    loading: 'Menyimpan...',
                    success: "Berhasil Membuat Materi!",
                    error: "Gagal Membuat Materi!",
                }
            );
        } catch (error) {
            console.log(error.message);
            if (error.response) {
                // Menangani error dari backend dan menampilkan pesan error yang jelas
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
            <h1 className="text-2xl font-bold mb-5">Tambah Materi</h1>
            {message && <p className="text-green-500">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold">Judul Materi</label>
                    <input
                        type="text"
                        name="judul_materi"
                        value={formData.judul_materi}
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
                    <label className="block font-semibold">Link Materi (PDF)</label>
                    <input
                        type="file"
                        name="link_materi"
                        accept=".pdf"
                        onChange={handleFileChange}
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
    );
};

export default TambahMateriFront;
