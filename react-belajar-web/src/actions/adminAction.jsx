import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'; // 


export const editData = async (selectedUser) => {
    try {
        const csrfToken = Cookies.get('XSRF-TOKEN');

        if (csrfToken) {
            axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
        }
        await toast.promise(
            axios.put(`http://localhost:8000/admin/users/update/${selectedUser.id}`, selectedUser, { withCredentials: true }),{
                loading: "Sedang Mengubah Data",
                success: "Data Berhasil Diubah!",
                error: "Terjadi Kesalahan",
            }
        )
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



export const deleteData = async (id) => {
    try {

        const csrfToken = Cookies.get('XSRF-TOKEN');

        if (csrfToken) {
            axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
        }

        
        await toast.promise(
            axios.delete(`http://localhost:8000/admin/users/delete/${id}`, { withCredentials: true }),{
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