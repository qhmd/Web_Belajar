import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'; // 


export const editDataFront = async (formData,selectedMateri) => {
    try {
        const csrfToken = Cookies.get('XSRF-TOKEN');

        if (csrfToken) {
            axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
        }

        for (let pair of formData.entries()) {
            console.log(pair[0], pair[1]);
          }
          

        // const dataEdit = {
        //     judul_materi: selectedMateri.judul_materi,
        //     deskripsi: selectedMateri.deskripsi,
        //     link_materi: selectedMateri.link_materi,
        //     picture: selectedMateri.picture,  
        // };

        // console.log([...formData]);
        await toast.promise(
            axios.put(
                `http://localhost:8000/materifront/admin/update/${selectedMateri.id}`,
                selectedMateri, { withCredentials: true }),
            {
                loading: "Sedang Mengubah Data",
                success: "Data Berhasil Diubah!",
                error: "Terjadi Kesalahan",
            }
        );

        return response.data;
    } catch (error){
        if (error.response) {
            // Cek apakah ada errors di data
            const errorMessage = error.response.data.errors 
                ? Object.values(error.response.data.errors).flat().join(", ")
                : error.response.data.message;
            toast.error(errorMessage);
        } else {
            toast.error("Terjadi Kesalahan Jaringan");
        }
    }
} 



export const deleteDataFront = async (id) => {
    try {

        const csrfToken = Cookies.get('XSRF-TOKEN');

        if (csrfToken) {
            axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
        }

        
        await toast.promise(
            axios.delete(`http://localhost:8000/materifront/delete/${id}`, { withCredentials: true }),{
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
  };
