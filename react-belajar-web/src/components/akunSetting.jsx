import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'; // 

const EditDataUser = async (selectedUser) => {
    try {
      const csrfToken = Cookies.get('XSRF-TOKEN');

      if (csrfToken) {
          axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
      }
      console.log(selectedUser)
      const response = await toast.promise(
          axios.post(`http://localhost:8000/users/update/${selectedUser.id}`, selectedUser, { withCredentials: true }),{
              loading: "Sedang Mengubah Data",
              success: "Data Berhasil Diubah!",
              error: "Terjadi Kesalahan",
          }
      )

      return {response : success}
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

export default EditDataUser;