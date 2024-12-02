import React, { useRef,useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import "flatpickr/dist/flatpickr.min.css"; // Import CSS Flatpickr
import flatpickr from "flatpickr";

const Pelatihan = () => {
    // const [validDeskripsi, isValidDeskripsi] = useState(true)
    const [materi, setMateri] = useState([]);

    const [isModelEditOpen, setIsModelEditOpen] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedPelatihan, setSelectedPelatihan] = useState({
        judul_pelatihan: '',
        deskripsi: '',
        tanggal_buka:'',
        tanggal_tutup:'',
        lama_pelatihan:'',
        picture: null,
        link_pelatihan: '',
    });

    const [formData, setFormData] = useState({
        judul_pelatihan: '',
        deskripsi: '',
        tanggal_buka:'',
        tanggal_tutup:'',
        lama_pelatihan:'',
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

    const startDateRef = useRef(null);
    const endDateRef = useRef(null);
    const editStartDateRef = useRef(null);
    const editEndDateRef = useRef(null);

    // Initialize date pickers
    useEffect(() => {
        // Date picker for add modal
        if (startDateRef.current && endDateRef.current) {
            flatpickr(startDateRef.current, {
                dateFormat: "d-m-Y",
                onChange: (selectedDates, dateStr) => {
                    setFormData(prev => ({ ...prev, tanggal_buka: dateStr }));
                }
            });

            flatpickr(endDateRef.current, {
                dateFormat: "d-m-Y",
                onChange: (selectedDates, dateStr) => {
                    setFormData(prev => ({ ...prev, tanggal_tutup: dateStr }));
                }
            });
        }

        // Date picker for edit modal
    console.log('Modal Edit Open:', isModelEditOpen);
    console.log('Selected Pelatihan:', selectedPelatihan);   

    if (editStartDateRef.current && editEndDateRef.current) { 
        console.log('Refs tersedia');
        
        const startDateInstance = flatpickr(editStartDateRef.current, {
            dateFormat: "d-m-Y",
            defaultDate: selectedPelatihan.tanggal_buka || null,
            onChange: (selectedDates, dateStr) => {
                console.log('Start Date Changed:', dateStr);
                setSelectedPelatihan(prev => ({ 
                    ...prev, 
                    tanggal_buka: dateStr 
                }));
            }
        });

        const endDateInstance = flatpickr(editEndDateRef.current, {
            dateFormat: "d-m-Y",
            defaultDate: selectedPelatihan.tanggal_tutup || null,
            onChange: (selectedDates, dateStr) => {
                console.log('End Date Changed:', dateStr);
                setSelectedPelatihan(prev => ({ 
                    ...prev, 
                    tanggal_tutup: dateStr 
                }));
            }
        });

        return () => {
            startDateInstance.destroy();
            endDateInstance.destroy();
        };
    }
    
    }, [isModalOpen, isModelEditOpen]);


    const getDayName = (tanggal) => {
        console.log("Input tanggal:", tanggal);
    
        // Pastikan format tanggal input sesuai ISO (yyyy-mm-dd)
        const [year, month, day] = tanggal.split('-'); // Ambil tahun, bulan, hari
    
        // Validasi angka untuk memastikan input benar
        if (!year || !month || !day || isNaN(year) || isNaN(month) || isNaN(day)) {
            return 'Tanggal tidak valid';
        }
    
        // Format ulang ke ISO jika diperlukan
        const formattedDate = `${year}-${month}-${day}`;
        console.log("Formatted ISO date:", formattedDate);
    
        const date = new Date(formattedDate);
        console.log("Date object:", date);
    
        // Validasi apakah objek date valid
        if (isNaN(date.getTime())) {
            return 'Tanggal tidak valid';
        }
    
        const hariArray = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
        const namaHari = hariArray[date.getDay()]; // Pastikan index valid
    
        // Format tanggal output sebagai dd/mm/yyyy
        const formattedOutputDate = `${day}/${month}/${year}`;
    
        // Kembalikan nama hari dan tanggal dalam format `Hari, dd/mm/yyyy`
        return `${namaHari}, ${formattedOutputDate}`;
    };
    
    
    
    // Contoh penggunaan:
    
    // Contoh penggunaan:
    // console.log(getDayName("02/12/2024")); // Output: "Senin, 02/12/2024"
    

    const handleOpenEditModal = (item) => {
        
        setIsModelEditOpen(true);
        setSelectedPelatihan(item)
    }
    
    const handleCloseEditModal = () => {
        setIsModelEditOpen(false);
        setSelectedPelatihan(null);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData((prev) => ({ ...prev, [name]: files[0] }));
    };

    const handleFileEditChange = (e) => {
        const { name, files } = e.target;
        setSelectedPelatihan((prev) => ({ ...prev, [name]: files[0] }));
    };

    

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        const tanggalBukaDenganHari = getDayName(selectedPelatihan.tanggal_buka);
        const tanggalTutupDenganHari = getDayName(selectedPelatihan.tanggal_tutup);
        
        const selectMateri = new FormData();
        selectMateri.append('judul_pelatihan', selectedPelatihan.judul_pelatihan);
        selectMateri.append('deskripsi', selectedPelatihan.deskripsi);
        selectMateri.append('tanggal_buka', tanggalBukaDenganHari);
        selectMateri.append('tanggal_tutup', tanggalTutupDenganHari);
        selectMateri.append('lama_pelatihan', selectedPelatihan.lama_pelatihan);
        selectMateri.append('link_pelatihan', selectedPelatihan.link_pelatihan);
        selectMateri.append('picture', selectedPelatihan.picture);
        for (let pair of selectMateri.entries()) {  
            console.log(pair[0], pair[1]);
        } 
        try {
            const csrfToken = Cookies.get('XSRF-TOKEN');
            if (csrfToken) {
                axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
            }

            await toast.promise(
                axios.post(`http://localhost:8000/pelatihan/update/${selectedPelatihan.id}`, selectMateri, {
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData.tanggal_buka)
        console.log(formData.tanggal_tutup)

        const tanggalBukaDenganHari = getDayName(formData.tanggal_buka);
        const tanggalTutupDenganHari = getDayName(formData.tanggal_tutup);
        console.log(tanggalTutupDenganHari)
        console.log(tanggalBukaDenganHari)
        
        const data = new FormData();
        data.append('judul_pelatihan', formData.judul_pelatihan);
        data.append('deskripsi', formData.deskripsi);
        data.append('tanggal_buka', tanggalBukaDenganHari);
        data.append('tanggal_tutup', tanggalTutupDenganHari );
        data.append('lama_pelatihan', formData.lama_pelatihan);
        data.append('link_pelatihan', formData.link_pelatihan);
        data.append('picture', formData.picture);
        data.forEach((value, key) => {
            console.log(`${key}: ${value}`);
        });
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

    const handleDelete = async (id) => {
        try {

            const csrfToken = Cookies.get('XSRF-TOKEN');
    
            if (csrfToken) {
                axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
            }
    
            
            await toast.promise(
                axios.delete(`http://localhost:8000/pelatihan/delete/${id}`, { withCredentials: true }),{
                    loading: "Sedang Menghapus Data",
                    success: "Data Berhasil Dihapus!",
                    error: "Terjadi Kesalahan",
                }
            )
        } catch (error) {
            if (error.response) {
                // Cek apakah ada errors di data
                const errorMessage = error.response.data.errors 
                    ? Object.values(error.response.data.errors).flat().join(", ")
                    : error.response.data.message;
                toast.error(errorMessage);
            } else {
                toast.error("Terjadi Kesalahan Jaringan");
            }
          };
        console.log(response);
    }

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
                        <br />
                        <p className='text-sm text-gray-600'>{'Tanggal Buka Pendaftaran : ' + item.tanggal_buka}</p>
                        <p className='text-sm text-gray-600'>{'Tanggal Tutup Pendaftaran : ' + item.tanggal_tutup}</p>
                        <p className='text-sm text-gray-600'>{'Lama Pelatihan :' + item.lama_pelatihan}</p>

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
                className="bg-green-500 text-white px-4 py-2 rounded mb-5"
                onClick={() => setIsModalOpen(true)}
            >
                Tambah Pelatihan
            </button>

            {isModalOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
                    onClick={() => setIsModalOpen(false)}
                    >
                    <div
                        className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-5"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-center justify-between pb-2 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Tambah Pelatihan
                        </h3>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                            >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        </div>
                        <form onSubmit={handleSubmit}>
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
                                    <label className="font-semibold">Waktu Pendaftaran</label>
                                    <div className="flex items-center space-x-4">
                                    <div className="relative w-full">
                                        <input
                                        type="date"
                                        name="tanggal_buka"
                                        value={formData.tanggal_buka}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                            ...prev,
                                            tanggal_buka: e.target.value,
                                            }))
                                        }
                                        placeholder="Tanggal Mulai"
                                        className="w-full border px-4 py-2 rounded"
                                        required
                                        />
                                    </div>
                                    <span className="text-gray-500">Sampai</span>
                                    <div className="relative w-full">
                                        <input
                                        type="date"
                                        name="tanggal_tutup"
                                        value={formData.tanggal_tutup}
                                        onChange={(e) =>
                                            setFormData((prev) => ({
                                            ...prev,
                                            tanggal_tutup: e.target.value,
                                            }))
                                        }
                                        placeholder="Tanggal Selesai"
                                        className="w-full border px-4 py-2 rounded"
                                        required
                                        />
                                    </div>
                                    </div>
                                </div>
                        <div>
                            <label className="block font-semibold">Lama Pelatihan</label>
                            <input
                            type="text"
                            name="lama_pelatihan"
                            value={formData.lama_pelatihan}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                            required
                            />
                        </div>
                        <div>
                            <label className="block font-semibold">Link Pelatihan</label>
                            <input
                            type="text"
                            name="link_pelatihan"
                            value={formData.link_pelatihan}
                            onChange={handleChange}
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
                        <div className="flex justify-end mt-4">
                            <button type="submit" className="bg-blue-500 text-white px-5 py-2 rounded">
                            Simpan
                            </button>
                        </div>
                        </form>
                    </div>
                </div>

            )}
            {isModelEditOpen && selectedPelatihan && (
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
                        <form onSubmit={handleEditSubmit} className="space-y-2">
                            <div>
                                <label className="block font-semibold">Judul Materi</label>
                                <input type="text" id='judul_pelatihan' name="judul_pelatihan" value={selectedPelatihan.judul_pelatihan} onChange={(e) => setSelectedPelatihan({...selectedPelatihan, judul_pelatihan : e.target.value})} className="w-full border px-3 py-2 rounded" required />
                            </div>
                            <div>
                                <label className="block font-semibold">Deskripsi</label>
                                <textarea name="deskripsi" value={selectedPelatihan.deskripsi} id='deskripsi' onChange={(e) => setSelectedPelatihan({...selectedPelatihan, deskripsi : e.target.value})} className="w-full border px-3 py-2 rounded" rows="2" required></textarea>
                            </div>
                            <div>
                                    <label className="font-semibold">Waktu Pendaftaran</label>
                                    <div className="flex items-center space-x-4">
                                    <div className="relative w-full">
                                        <input
                                        type="date"
                                        name="tanggal_buka"
                                        value={selectedPelatihan.tanggal_buka}
                                        onChange={(e) =>
                                            setSelectedPelatihan((prev) => ({
                                            ...prev,
                                            tanggal_buka: e.target.value,
                                            }))
                                        }
                                        placeholder="Tanggal Mulai"
                                        className="w-full border px-4 py-2 rounded"
                                        required
                                        />
                                    </div>
                                    <span className="text-gray-500">Sampai</span>
                                    <div className="relative w-full">
                                        <input
                                        type="date"
                                        name="tanggal_tutup"
                                        value={selectedPelatihan.tanggal_tutup}
                                        onChange={(e) =>
                                            setSelectedPelatihan((prev) => ({
                                            ...prev,
                                            tanggal_tutup: e.target.value,
                                            }))
                                        }
                                        placeholder="Tanggal Selesai"
                                        className="w-full border px-4 py-2 rounded"
                                        required
                                        />
                                    </div>
                                    </div>
                                </div>
                            <div>
                                <label className="block font-semibold">Lama Pelatihan</label>
                                <input
                                type="text"
                                name="lama_pelatihan"
                                id="lama_pelatihan"
                                value={selectedPelatihan.lama_pelatihan}
                                onChange={(e) => setSelectedPelatihan({...selectedPelatihan, lama_pelatihan: e.target.value})}
                                className="w-full border px-3 py-2 rounded"
                                required
                                />
                            </div>
                            <div>   
                                <label className="block font-semibold">Link Pelatihan</label>
                                <input
                                type="text"
                                name="link_pelatihan"
                                id="link_pelatihan"
                                value={selectedPelatihan.link_pelatihan}
                                onChange={(e) => setSelectedPelatihan({...selectedPelatihan, link_pelatihan: e.target.value})}
                                className="w-full border px-3 py-2 rounded"
                                required
                                />
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

export default Pelatihan;
