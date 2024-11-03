import axios from "axios";
import toast from 'react-hot-toast';
import Cookies from 'js-cookie'; // Import js-cookie jika Anda menggunakannya untuk CSRF token

export const submitForm = async (formData, setLoading) => {
    try {
        const csrfToken = Cookies.get('XSRF-TOKEN');

        if (csrfToken) {
            axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
        }

        const response = await axios.post("http://localhost:8000/register", formData, { withCredentials: true });

        toast.success(response.data.message);
    } catch (error) {
        if (error.response) {
            // Cek apakah ada errors di data
            const errorMessage = error.response.data.errors 
                ? Object.values(error.response.data.errors).flat().join(", ")
                : error.response.data.message || "Terjadi Kesalahan Saat Mendaftar";
            toast.error(errorMessage);
        } else {
            toast.error("Terjadi Kesalahan Jaringan");
        }
    } finally {
        setLoading(false);
    }
}
